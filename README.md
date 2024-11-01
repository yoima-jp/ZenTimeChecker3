# ZEN Study(旧N予備校)の残り時間わかるやーつ3.0

## 概要
この拡張機能は、ZEN Studyの必修授業の残り時間やテストの個数などを表示します。

## 新機能
### 問題数の表示
残りのテストの問題数を表示できるようになりました。

### Nプラス教材を含める
今回のバージョンからNプラス教材を含めるかどうかを選択できるようになりました。

### 表示項目のカスタマイズ
動画時間や動画数など必要なものだけを表示できるようになりました。初期状態は何も表示されないよう設定されているので初回はご自身での設定をお願い致します。

## インストール方法
1. リリースページから最新のバージョンをダウンロードします。
2. ダウンロードしたファイルを解凍します。
3. Chromeの拡張機能ページ（`chrome://extensions/`）を開きます。
4. 「デベロッパーモード」を有効にします。
5. 「パッケージ化されていない拡張機能を読み込む」をクリックし、解凍したフォルダを選択します。

## 使用方法
1. 拡張機能をインストール後、ZEN Studyのサイトにアクセスします。
2. 拡張機能のアイコンをクリックして設定画面を開きます。
3. 表示したい項目（動画時間、動画数、テスト数、問題数）を選択します。
4. 必要に応じてNプラス教材を含める設定を行います。

## 設定
- **動画時間**: 動画の合計時間を表示します。
- **動画数**: 視聴していない動画の数を表示します。
- **テスト数**: 未完了のテストの数を表示します。
- **問題数**: 未完了のテストの問題数を表示します。
- **Nプラス教材を含める**: Nプラス教材を含めるかどうかを設定します。

## 開発者向け情報
以下のファイルがプロジェクトに含まれています:

- `background.js`: 拡張機能のインストール時にウェルカムページを表示するためのスクリプトです。
- `content.js`: N予備校のページ上で動作するスクリプトです。
- `manifest.json`: 拡張機能の設定ファイルです。
- `popup.css`: 設定画面のスタイルシートです。
- `popup.html`: 設定画面のHTMLファイルです。
- `popup.js`: 設定画面のスクリプトです。
- `README.md`: プロジェクトの説明と使用方法が記載されたファイルです。
- `welcome/welcome.html`: 拡張機能のインストール後に表示されるウェルカムページのHTMLファイルです。
- `welcome/welcome.js`: ウェルカムページのスクリプトです。

この情報を参考に、プロジェクトの開発やカスタマイズを行うことができます。