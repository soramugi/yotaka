# yotaka

宅内ポッドキャスト配信のためのPCクライアント

![icon.png](https://raw.githubusercontent.com/soramugi/yotaka/master/static/feed_icon.png "incoアイコン")

## これはなに?

宅内ポッドキャスト配信向けのPCクライアントアプリ、yotakaです。

インターネット上に公開したくない音声ファイルや映像ファイルを
同一ネットワークのみにポッドキャストとして配信ができるクライアントアプリケーション。

- 録音したラジオコンテンツ
- 社内のみに限定配信する音声コンテンツ
- インターネット記事の読み上げ音声
- 動画ファイルをダウンロードして通信量の節約

などを目的としたポッドキャスト配信に使用できます。

## 使い方

[ここから最新版をダウンロード](https://github.com/soramugi/yotaka/releases)
(現状Mac版のみ、将来的にはWindowsやLinux対応予定)

インストール実行後、起動
ツールバーにアイコンが追加される

![menu.png](https://raw.githubusercontent.com/soramugi/yotaka/master/web_static/menu.png "menu")

「閲覧ディレクトリの変更」実行、配信したいファイルが置かれているディレクトリを選択
(配信可能拡張子は `M4A` `MP3` `MOV` `MP4` `M4V`)

「Podcast Feed のコピー」「Podcast Feed をQRコードで表示」を行いURLを取得

ポッドキャスト取得クライアントに貼り付けてコンテンツのダウンロードが行える

Mac、iPhoneであれば `Apple Podcast`
Androidであれば `Podcast Addict`

で取得が可能

## 開発環境

> An electron-vue project

#### Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron application for production
npm run build

# run unit & end-to-end tests
npm test


# lint all JS/Vue component files in `src/`
npm run lint

```

---

This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue)@[8fae476](https://github.com/SimulatedGREG/electron-vue/tree/8fae4763e9d225d3691b627e83b9e09b56f6c935) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).
