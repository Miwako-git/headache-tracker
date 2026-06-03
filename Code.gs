// ============================================================
// 片頭痛トラッカー - Google Apps Script
// ============================================================

const SHEET_NAME = 'MigraineLog';

// 📱 Webアプリのエントリーポイント
function doGet(e) {
  const page = e && e.parameter && e.parameter.page;
  if(page === 'summary') {
    return HtmlService.createHtmlOutputFromFile('summary')
      .setTitle('🩺 頭痛サマリーレポート')
      .addMetaTag('viewport', 'width=device-width, initial-scale=1.0')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  }
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('🩺 頭痛トラッカー')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// 🔧 行データ配列を作る共通関数（saveRecord・updateRecord両方で使う）
function makeRowData(data) {
  const now = new Date();
  return [
    data.date,
    Utilities.formatDate(now, Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss'),
    data.time_of_day || '',
    data.duration_hours, data.headache_intensity, data.aura,
    data.photo_sensitivity, data.sound_sensitivity, data.nausea, data.vertigo, data.spasm,
    data.sleep_hours, data.sleep_quality, data.stress, data.stress_level,
    data.medication_taken, data.medication_type, data.alcohol_type,
    data.people_crowd, data.days_since_period,
    data.pressure_hpa, data.pressure_change_24h, data.temperature_c, data.humidity, data.weather_code,
    data.moon_age, data.moon_phase, data.memo
  ];
}

// 📋 シートヘッダー定義
const SHEET_HEADERS = [
  'date', 'created_at', 'time_of_day', 'duration_hours',
  'headache_intensity', 'aura',
  'photo_sensitivity', 'sound_sensitivity', 'nausea', 'vertigo', 'spasm',
  'sleep_hours', 'sleep_quality', 'stress', 'stress_level',
  'medication_taken', 'medication_type',
  'alcohol_type',
  'people_crowd', 'days_since_period',
  'pressure_hpa', 'pressure_change_24h', 'temperature_c', 'humidity', 'weather_code',
  'moon_age', 'moon_phase',
  'memo'
];

// 💾 頭痛記録を新規追加する関数
function saveRecord(data) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(SHEET_HEADERS);
      sheet.getRange(1, 1, 1, SHEET_HEADERS.length).setFontWeight('bold');
    }

    sheet.appendRow(makeRowData(data));
    return { success: true };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

// 🔍 指定した日付のデータがすでに存在するか確認する関数
function checkExistingRecord(dateStr) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME);
    if(!sheet) return { exists: false };

    const lastRow = sheet.getLastRow();
    if(lastRow < 2) return { exists: false };

    const dates = sheet.getRange(2, 1, lastRow - 1, 1).getValues();

    for(let i = 0; i < dates.length; i++) {
      const cellDate = dates[i][0];
      const cellDateStr = cellDate instanceof Date
        ? Utilities.formatDate(cellDate, 'Asia/Tokyo', 'yyyy-MM-dd')
        : String(cellDate).substring(0, 10);

      if(cellDateStr === dateStr) {
        const rowNum = i + 2;
        const rowData = sheet.getRange(rowNum, 1, 1, 28).getValues()[0];
        return {
          exists: true,
          rowIndex: rowNum,
          data: {
            date: cellDateStr,
            time_of_day: rowData[2],
            duration_hours: rowData[3],
            headache_intensity: String(rowData[4]),
            aura: rowData[5],
            photo_sensitivity: rowData[6],
            sound_sensitivity: rowData[7],
            nausea: rowData[8],
            vertigo: rowData[9],
            spasm: rowData[10],
            sleep_hours: rowData[11],
            sleep_quality: String(rowData[12]),
            stress: rowData[13],
            stress_level: rowData[14],
            medication_taken: rowData[15],
            medication_type: rowData[16],
            alcohol_type: rowData[17],
            people_crowd: rowData[18],
            days_since_period: rowData[19],
            pressure_hpa: rowData[20],
            pressure_change_24h: rowData[21],
            temperature_c: rowData[22],
            humidity: rowData[23],
            weather_code: rowData[24],
            moon_age: rowData[25],
            moon_phase: rowData[26],
            memo: rowData[27]
          }
        };
      }
    }
    return { exists: false };
  } catch(e) {
    return { exists: false, error: e.message };
  }
}

// ✏️ 既存の記録を上書き修正する関数
function updateRecord(rowIndex, data) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME);
    if(!sheet) return { success: false, error: 'シートが見つかりません' };

    const row = makeRowData(data);
    sheet.getRange(rowIndex, 1, 1, row.length).setValues([row]);
    return { success: true };
  } catch(e) {
    return { success: false, error: e.message };
  }
}

// 📅 指定日の気象データと月齢を取得する関数（過去データ対応）
// targetHour: 取得したい時刻（0〜23）。時間帯ボタンで選択した値を渡す
function getPastWeatherAndMoon(dateStr, lat, lon, targetHour) {
  try {
    const hour = (targetHour !== undefined && targetHour !== null) ? targetHour : 12;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relative_humidity_2m,surface_pressure,weather_code&timezone=Asia%2FTokyo&start_date=${dateStr}&end_date=${dateStr}`;
    const res = UrlFetchApp.fetch(url);
    const data = JSON.parse(res.getContentText()).hourly;

    const pressure = Math.round(data.surface_pressure[hour] * 10) / 10;
    const temp = Math.round(data.temperature_2m[hour] * 10) / 10;
    const humidity = data.relative_humidity_2m[hour];
    const weatherCode = data.weather_code[hour];

    // 24時間前（前日の同時刻）との気圧変化を計算
    const prevDayDate = new Date(dateStr);
    prevDayDate.setDate(prevDayDate.getDate() - 1);
    const prevDateStr = Utilities.formatDate(prevDayDate, 'Asia/Tokyo', 'yyyy-MM-dd');
    const prevUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=surface_pressure&timezone=Asia%2FTokyo&start_date=${prevDateStr}&end_date=${prevDateStr}`;
    const prevRes = UrlFetchApp.fetch(prevUrl);
    const prevData = JSON.parse(prevRes.getContentText()).hourly;
    const prevPressure = prevData.surface_pressure[hour] || pressure;
    const pressureChange = Math.round((pressure - prevPressure) * 10) / 10;

    const moonAge = calcMoonAge(new Date(dateStr));
    const moonPhase = getMoonPhase(moonAge);

    return {
      success: true,
      temperature_c: temp,
      humidity: humidity,
      pressure_hpa: pressure,
      pressure_change_24h: pressureChange,
      weather_code: getWeatherEn(weatherCode),
      moon_age: Math.round(moonAge * 10) / 10,
      moon_phase: moonPhase
    };
  } catch(e) {
    const moonAge = calcMoonAge(new Date(dateStr));
    return {
      success: true,
      moon_age: Math.round(moonAge * 10) / 10,
      moon_phase: getMoonPhase(moonAge),
      error: e.message
    };
  }
}

// 🌤️ 気象データと月齢を取得する関数（現在時刻・Open-Meteo無料API）
function getWeatherAndMoon(lat, lon) {
  try {
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,surface_pressure,weather_code&timezone=Asia%2FTokyo`;
    const weatherRes = UrlFetchApp.fetch(weatherUrl);
    const weather = JSON.parse(weatherRes.getContentText()).current;

    const yesterday = new Date(Date.now() - 86400000);
    const yDate = Utilities.formatDate(yesterday, 'Asia/Tokyo', 'yyyy-MM-dd');
    const yHour = yesterday.getHours();
    const pastUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=surface_pressure&timezone=Asia%2FTokyo&start_date=${yDate}&end_date=${yDate}`;
    const pastRes = UrlFetchApp.fetch(pastUrl);
    const pastData = JSON.parse(pastRes.getContentText());
    const pastPressure = pastData.hourly.surface_pressure[yHour] || weather.surface_pressure;
    const pressureChange = Math.round((weather.surface_pressure - pastPressure) * 10) / 10;

    const moonAge = calcMoonAge(new Date());
    const moonPhase = getMoonPhase(moonAge);

    return {
      success: true,
      temperature_c: Math.round(weather.temperature_2m * 10) / 10,
      humidity: weather.relative_humidity_2m,
      pressure_hpa: Math.round(weather.surface_pressure * 10) / 10,
      pressure_change_24h: pressureChange,
      weather_code: getWeatherEn(weather.weather_code),
      moon_age: Math.round(moonAge * 10) / 10,
      moon_phase: moonPhase
    };
  } catch(e) {
    const moonAge = calcMoonAge(new Date());
    return {
      success: true,
      moon_age: Math.round(moonAge * 10) / 10,
      moon_phase: getMoonPhase(moonAge),
      error: e.message
    };
  }
}

// 🩸 最後に記録した生理開始日をスプシから取得する関数
// 【バグ修正】new Date(val) が Invalid Date になる問題を解消。
// 【強化】「最終行」ではなく「日付が最大（=最新）の行」を返す。
//   後から古い日付を追記しても、常に一番新しい生理日を返せるようにするため。
function getLastPeriodDate() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('PeriodLog');
    if(!sheet) return '';
    const lastRow = sheet.getLastRow();
    if(lastRow < 2) return '';

    // 全履歴のdate列を取得し、日付が最大（最新）のものを探す
    const values = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
    let latest = null;
    for(let i = 0; i < values.length; i++) {
      const v = values[i][0];
      if(!v) continue;
      // Date型ならそのまま、文字列なら先頭10文字をDate化（タイムゾーンずれ防止のため日本時間0時で解釈）
      const d = v instanceof Date ? v : new Date(String(v).substring(0, 10) + 'T00:00:00+09:00');
      if(isNaN(d.getTime())) continue;
      if(latest === null || d > latest) latest = d;
    }
    if(latest === null) return '';
    return Utilities.formatDate(latest, 'Asia/Tokyo', 'yyyy-MM-dd');
  } catch(e) {
    return '';
  }
}

// 🩸 生理開始日をPeriodLogシートに保存する関数
// 保存後、その生理日以降のMigraineLogのdays_since_periodを自動再計算する
// 【バグ修正】文字列ではなくDateオブジェクトで保存し、読み込み時の型ブレを防ぐ。
function savePeriodDate(dateStr) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    // PeriodLogに保存
    let periodSheet = ss.getSheetByName('PeriodLog');
    if(!periodSheet) {
      periodSheet = ss.insertSheet('PeriodLog');
      periodSheet.appendRow(['date', 'recorded_at']);
      periodSheet.getRange(1,1,1,2).setFontWeight('bold');
    }
    // 日本時間の0時としてDateオブジェクトで保存（文字列保存だと読み込み時にブレるため）
    const periodDate = new Date(dateStr + 'T00:00:00+09:00');
    periodSheet.appendRow([periodDate, Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss')]);

    // MigraineLogの再計算
    recalcDaysSincePeriod(dateStr, ss);

    return { success: true };
  } catch(e) {
    return { success: false, error: e.message };
  }
}

// 🔄 指定した生理開始日以降のMigraineLogのdays_since_periodを再計算する関数
// PeriodLog全履歴を参照して、各記録日に最も近い（かつ記録日以前の）生理開始日を使う
function recalcDaysSincePeriod(newPeriodDateStr, ss) {
  try {
    const migraineSheet = ss.getSheetByName(SHEET_NAME);
    if(!migraineSheet) return;
    const lastRow = migraineSheet.getLastRow();
    if(lastRow < 2) return;

    // PeriodLog全履歴を取得
    const periodSheet = ss.getSheetByName('PeriodLog');
    if(!periodSheet) return;
    const periodLastRow = periodSheet.getLastRow();
    if(periodLastRow < 2) return;
    const periodDates = periodSheet.getRange(2, 1, periodLastRow - 1, 1).getValues()
      .map(r => {
        const d = r[0] instanceof Date ? r[0] : new Date(r[0]);
        return d;
      })
      .filter(d => !isNaN(d.getTime()))
      .sort((a, b) => a - b); // 昇順ソート

    // 新しい生理日以降の記録のみ対象（それより前は影響なし）
    const newPeriodDate = new Date(newPeriodDateStr);
    const allData = migraineSheet.getRange(2, 1, lastRow - 1, 28).getValues();

    const updates = [];
    for(let i = 0; i < allData.length; i++) {
      const row = allData[i];
      if(!row[0]) continue;

      // 記録日
      const recordDate = row[0] instanceof Date ? row[0] : new Date(row[0]);
      if(isNaN(recordDate.getTime())) continue;

      // 新しい生理日以降の記録のみ再計算
      if(recordDate < newPeriodDate) continue;

      // 記録日以前で最も近い生理開始日を探す
      let closestPeriod = null;
      for(let j = periodDates.length - 1; j >= 0; j--) {
        if(periodDates[j] <= recordDate) {
          closestPeriod = periodDates[j];
          break;
        }
      }
      if(!closestPeriod) continue;

      // days_since_period再計算
      const diffDays = Math.floor((recordDate - closestPeriod) / (1000*60*60*24)) + 1;

      // T列（20列目 = インデックス19）がdays_since_period
      updates.push({ rowNum: i + 2, days: diffDays });
    }

    // 一括更新
    updates.forEach(u => {
      migraineSheet.getRange(u.rowNum, 20).setValue(u.days);
    });

    return { updated: updates.length };
  } catch(e) {
    return { error: e.message };
  }
}

// 🌕 月齢を計算する関数
function calcMoonAge(date) {
  const knownNewMoon = new Date('2000-01-06T18:14:00Z');
  const lunarCycle = 29.53058867;
  const diff = (date - knownNewMoon) / (1000 * 60 * 60 * 24);
  return ((diff % lunarCycle) + lunarCycle) % lunarCycle;
}

// 🌙 月齢から月相名を返す関数
function getMoonPhase(age) {
  if (age < 1.85) return '新月';
  if (age < 7.38) return '三日月';
  if (age < 9.22) return '上弦';
  if (age < 14.77) return '十三夜';
  if (age < 16.61) return '満月';
  if (age < 22.15) return '十六夜';
  if (age < 23.99) return '下弦';
  if (age < 29.53) return '二十六夜';
  return '新月';
}

// ☀️ 天気コードを英語に変換する関数（スプシ保存用・解析しやすい形式）
function getWeatherEn(code) {
  if (code === 0) return 'sunny';
  if (code <= 3) return 'cloudy';
  if (code <= 67) return 'rain';
  if (code <= 77) return 'snow';
  if (code <= 99) return 'thunder';
  return 'unknown';
}


// 🔗 サマリーページのURLを返す関数
function getSummaryUrl() {
  return ScriptApp.getService().getUrl() + '?page=summary';
}

// 📊 直近〜全期間のデータを全件返す関数（summary.html側でフィルタリング）
function getSummaryData() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME);
    if(!sheet) return { success: false, error: 'データがありません' };

    const lastRow = sheet.getLastRow();
    if(lastRow < 2) return { success: false, error: 'データがありません' };

    const allData = sheet.getRange(2, 1, lastRow - 1, 28).getValues();

    const records = allData
      .filter(r => r[0] !== '')
      .map(r => ({
        date:                r[0] instanceof Date ? Utilities.formatDate(r[0], 'Asia/Tokyo', 'yyyy-MM-dd') : String(r[0]).substring(0,10),
        time_of_day:         r[2],
        duration_hours:      r[3],
        headache_intensity:  Number(r[4]),
        aura:                r[5],
        photo_sensitivity:   Number(r[6]),
        sound_sensitivity:   Number(r[7]),
        nausea:              Number(r[8]),
        vertigo:             Number(r[9]),
        spasm:               r[10],
        sleep_hours:         r[11],
        sleep_quality:       Number(r[12]),
        stress:              r[13],
        stress_level:        Number(r[14]),
        medication_taken:    r[15],
        medication_type:     r[16],
        alcohol_type:        r[17],
        people_crowd:        r[18],
        days_since_period:   r[19],
        pressure_hpa:        r[20],
        pressure_change_24h: r[21],
        temperature_c:       r[22],
        humidity:            r[23],
        weather_code:        r[24],
        moon_age:            r[25],
        moon_phase:          r[26],
        memo:                r[27]
      }));

    // GAS側で日付昇順ソート（Safari対策）
    records.sort(function(a, b) {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });

    return { success: true, records: records };
  } catch(e) {
    return { success: false, error: e.message };
  }
}
