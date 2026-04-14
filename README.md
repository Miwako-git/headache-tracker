# 📊 Migraine Tracker

[日本語](#japanese) | English

A smartphone-friendly tool for recording and analyzing migraine data with multiple contributing factors.  
Built with Google Apps Script + Open-Meteo API + Google Sheets.

## ✨ Features

- 🌡 **Multi-factor tracking** — Barometric pressure, lunar phase, sleep, and more
- ⚡ **Auto data fetch** — Pressure & lunar data retrieved automatically via API
- 🧙 **7-step Wizard UI** — Minimizes input effort on mobile
- 🔄 **Edit mode** — Update past records anytime
- ✅ **Duplicate check** — Prevents accidental double entries

## 🛠 Tech Stack

- Google Apps Script
- Open-Meteo API (barometric pressure)
- Google Sheets

## 🚀 Setup

1. Open Google Sheets → Extensions → Apps Script
2. Paste the code and save
3. Reload the spreadsheet and start recording

## 💡 Background

Existing headache apps typically track only one factor (e.g. barometric pressure).  
This tool was designed from a quality engineering perspective — inspired by design of experiments (DoE) — to capture and analyze **multiple contributing factors simultaneously**.

## 📝 Notes

- Developed through AI collaboration (vibe coding)
- Heavily commented code — useful as a learning reference

---

<a id="japanese"></a>

# 📊 偏頭痛トラッカー

偏頭痛の複合要因（気圧・月齢・睡眠など）を同時記録・分析できるスマホ向けツールです。  
Google Apps Script + Open-Meteo API + Google スプレッドシート で動作します。

## ✨ 機能

- 🌡 **複合要因記録** — 気圧・月齢・睡眠・生理周期など複数要因を同時収集
- ⚡ **データ自動取得** — 気圧・月齢データをAPIで自動取得
- 🧙 **7ステップWizard UI** — スマホでの入力負荷を最小化
- 🔄 **修正モード** — 過去のデータをいつでも更新可能
- ✅ **重複チェック** — 二重入力を自動で防止

## 🛠 使用技術

- Google Apps Script
- Open-Meteo API（気圧データ）
- Google スプレッドシート

## 🚀 セットアップ

1. Google スプレッドシートを開く → 拡張機能 → Apps Script
2. コードを貼り付けて保存
3. スプレッドシートを再読み込みして記録開始

## 💡 開発の背景

既存の頭痛アプリは気圧など単一要因しか追跡できません。  
偏頭痛には複数の要因が絡むと考え、富士ゼロックス時代の**実験計画法・要因効果分析**の経験を活かして自作しました。  
治験ボランティアの経験から生まれた当事者視点の設計が特徴です。

## 📝 開発メモ

- AIとの協働（バイブコーディング）で開発
- コード内にコメントをたっぷり入れてあるので、学習用としても参考になります
