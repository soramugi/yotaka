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
(現状Windows,Mac版のみ対応、将来的にはLinuxも対応予定)

インストール実行後、起動
ツールバーにアイコンが追加される

![menu.png](https://raw.githubusercontent.com/soramugi/yotaka/master/web_static/menu.png "menu")

「閲覧ディレクトリの変更」実行、配信したいファイルが置かれているディレクトリを選択
(配信可能拡張子は `M4A` `MP3` `MOV` `MP4` `M4V`)

「Podcast Feed のコピー」「Podcast Feed をQRコードで表示」を行いURLを取得

下記のポッドキャスト取得クライアントに貼り付けてコンテンツのダウンロードが行える

### Windows and MAC
- iTunes Desktop application

### iOS
- Podcast app by Apple
- Overcast
- Downcast
- Pocket Casts (paid app)

### Android
- Podcast Addict
- Podcast Republic
- BeyondPod
- DoggCatcher
- Pocket Casts (paid app)

で取得が可能

配信クライアントPCは固定IPにしておく事をお勧めします。

## Q&A

Q: Windowsでポッドキャストの取得ができません
A: ファイヤーウォールの設定を見直してください

- ネットワークアクセス(WiFi接続)を「プライベート」に設定
- Windowsの設定「アプリにWindowsファイアウォール経由の通信を許可する」でyotakaを探す、
- 一旦yotakaの設定を削除
- 「別のアプリの許可」でyotakaを「プライベート」ネットワークでアクセス出来るように設定を追加する。
- yotakaのファイルパスは以下
- C:\Users\<ユーザー名>\AppData\Local\Programs\yotaka
- 設定方法は以下のURLを参考
- https://www.buffalo.jp/support/faq/detail/792.html

## 今後の開発予定項目

- [ ] Android版での取得失敗原因調査
- [x] Windows環境の実行
- [ ] Linux環境での実行
- [ ] ファイルの再生時間をfeedに追加
- [ ] travisでの自動ビルドに対応
- [ ] IP直アクセスを回避できないか?

## 開発環境構築

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
