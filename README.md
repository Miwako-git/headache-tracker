# 🩺 Headache Tracker

**[日本語版は下にあります/ Japanese version below]**

A Google Apps Script web app for recording and analyzing migraine attacks.

## 📋 Overview

Developed by a migraine sufferer to accurately communicate medical data to physicians.
Designed with reference to clinical migraine trial applications.
Built entirely through natural language dialogue with AI tools — a real-world example of no-code development.

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

---

# 🩺 頭痛トラッカー

**[English version above]**

片頭痛の記録・分析を目的としたGoogle Apps Script製Webアプリです。

## 📋 概要

片頭痛持ちの当事者が、自身の医療データを医師に正確に伝えるために開発しました。
偏頭痛の治験用アプリを参考に設計しており、医療グレードの記録項目を実装しています。
複数のAIツールと自然言語での対話のみで作成した、ノーコード開発の実例です。

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

