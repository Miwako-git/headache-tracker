このツールは、長年片頭痛に悩んできた開発者が、自身の経験と専門的な解析手法を組み合わせて構築している、個人用のアプリです。
**[English version below / 英語版は下にあります]**

## 📋 概要

片頭痛持ちの当事者が、自身の頭痛記録データを医師に正確に伝えるために開発しました。
偏頭痛の治験用アプリを参考に設計しており、医療グレードの記録項目を実装しています。
データの蓄積後、多変量解析によって発症リスクをスコアリングし、予測アラートを出せるように開発を進めています。
複数のAIツールと自然言語での対話のみで作成した、ノーコード開発の実例です。

## 💻 開発スタイル
AIとの共創: 主に Claude との対話を通じて、ノーコードで一歩ずつ構築しています。

## ✨ 主な機能

- **7ステップWizard形式**で発作時でも簡単に記録できる
- **気圧・24h気圧変化**をOpen-Meteo APIで自動取得
- **月齢・月相**を自動計算
- **生理周期**との相関記録
- **過去日付入力**対応（時間帯別気圧取得）
- **重複チェック**・修正モード
- **医者向けサマリー**をPDF出力（期間選択可能）
- 気圧急変時の**警戒アラート**表示

## 🛠️ 使用技術

- Google Apps Script（GAS）
- Google スプレッドシート
- Open-Meteo API（気象データ）
- HTML / CSS / JavaScript

## 📊 記録項目

頭痛強度・継続時間・前兆・光過敏・音過敏・吐き気・めまい・痙攣・睡眠時間・睡眠の質・ストレス・服薬・飲酒・人混み・気圧・気温・湿度・天気・月齢・生理周期・メモ

## ⚙️ 設計のこだわり
実体験の反映: 40年の闘病記録と、治験ボランティアで得た知見をベースにしています。

物理量測定と要因解析: 10年間の画質評価業務で培った「物理量測定」と「多変量要因」の考え方を応用。気圧・月齢・体調などの複雑な因子を多角的に分析します。

今後の展望（データが溜まり次第着手）: データの蓄積後、多変量解析によって発症リスクをスコアリングし、予測アラートを出せるように開発を進めています。

## 🚀 セットアップ方法

1. `Code.gs` と `index.html` をGoogle Apps Scriptにコピー
2. スプレッドシートを新規作成し、スクリプトと紐付ける
3. ウェブアプリとしてデプロイ
4. 表示されたURLにアクセス

## 📱 動作環境

- iOS Safari対応（iPhone最適化済み）
- PC・スマートフォン両対応

## 🔒 プライバシー

データはすべて自身のGoogleスプレッドシートに保存されます。
外部サーバーへの個人データ送信はありません。

## 🎧 Beyond Gravity — 偏頭痛のためのアンビエントサウンド
偏頭痛に悩んでいる方へ。私のYouTubeチャンネル Beyond Gravity では、音響効果に基づいたアンビエント、ヒーリングミュージックを配信しています。
6000Hz以上をカットした低周波設計で、感覚過敏の方にも優しい音響空間です。
174Hzヒーリングトーン、ブラウンノイズ、宇宙映像でも楽しんでもらえるよう作っています。
🔗 [Beyond Gravity (YouTube)](https://www.youtube.com/@Beyond-DeepGravity)

## ☕ デジタル托鉢（開発支援）
このアプリが診察の役に立ったら、次のAI解析エンジン開発への支援をお願いします。
**Coming soon**：データ100件到達後にAI多変量解析エンジンを実装予定
[ ☕ Buy Me a Coffee ](https://buymeacoffee.com/) | [ 💖 GitHub Sponsors ](https://github.com/sponsors)

# 🩺 Headache Tracker
**[Japanese version above]**

A Google Apps Script web app for recording and analyzing migraine attacks.
40-Year Migraine Survivor’s Analytical Tool: Personal Headache Tracker

## 📋 Overview

Developed by a migraine sufferer to accurately communicate medical data to physicians.
Designed with reference to clinical migraine trial applications.
Once enough data is accumulated, I plan to implement a scoring system and predictive alerts for migraine attacks using multivariate analysis.
Built entirely through natural language dialogue with AI tools — a real-world example of no-code development.

## 💻 Development Style
AI Collaboration: Built step-by-step through dialogue with AI (primarily Claude) in a no-code development environment.

## ✨ Key Features

- **7-step Wizard** for easy logging even during an attack
- **Barometric pressure & 24h pressure change** via Open-Meteo API
- **Moon age & phase** auto-calculation
- **Menstrual cycle** correlation tracking
- **Past date entry** with time-of-day specific pressure data
- **Duplicate check** & edit mode
- **Doctor-ready summary** with PDF export (selectable date range)
- **Pressure alert** for rapid atmospheric changes

## 🛠️ Tech Stack

- Google Apps Script (GAS)
- Google Spreadsheet
- Open-Meteo API
- HTML / CSS / JavaScript

## 📊 Data Fields

Headache intensity, duration, aura, photosensitivity, phonosensitivity, nausea, dizziness, spasms, sleep hours, sleep quality, stress, medication, alcohol, crowd exposure, pressure, temperature, humidity, weather, moon age, menstrual cycle, memo

## ⚙️ Engineering-Grade Design
Survivor’s Insight: Built based on 40 years of migraine data and clinical trial volunteer experience.

Analytical Approach: Applied the logic of "Physical Quantity Measurement" and "Multivariate Analysis" gained from 10 years of experience in printer image quality evaluation.

Future Roadmap (Pending Data Collection): Once enough data is accumulated, I plan to implement a scoring system and predictive alerts for migraine attacks using multivariate analysis.

## 🚀 Setup

1. Copy `Code.gs` and `index.html` into Google Apps Script
2. Create a new Google Spreadsheet and link it to the script
3. Deploy as a Web App
4. Access the generated URL

## 📱 Compatibility

- iOS Safari optimized
- Works on both PC and smartphone

## 🔒 Privacy

All data is stored in your own Google Spreadsheet.
No personal data is sent to external servers.

## 🎧 Beyond Gravity — Ambient Sound for Migraine Relief
If you suffer from migraines, check out my YouTube channel Beyond Gravity.
I offer brown noise and dark ambient tracks with frequencies filtered above 6000Hz — specifically designed for sensory-sensitive listeners.
174Hz healing tones, brown noise blends, and deep space visuals to help you rest when it hurts.
Logic for the data. Sound for the soul.

🔗 [Beyond Gravity (YouTube)](https://www.youtube.com/@Beyond-DeepGravity)

## ☕ Support This Project
 
*Digital Takuhatsu — placing my work into the world.*
If this tracker helps your medical consultation, or if you believe in the mission of turning chronic pain into data, consider supporting the development.
 
**Coming soon**: AI-driven multivariate analysis engine (after 100 entries)
 
[ ☕ Buy Me a Coffee ](https://buymeacoffee.com/) | [ 💖 GitHub Sponsors ](https://github.com/sponsors)
# 🩺 頭痛トラッカー


 
