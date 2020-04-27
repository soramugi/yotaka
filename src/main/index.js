'use strict'

import { app, BrowserWindow, clipboard, dialog, nativeImage, Menu, Tray } from 'electron'
import Store from 'electron-store'
import log from 'electron-log'
import ip from 'ip'
import path from 'path'
import QRCode from 'qrcode'
import './auto-update'

let mediaPath = path.join(__dirname, 'static')
let menuIcon = path.join(__dirname, 'static', 'yotaka_menu_icon.png')

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV === 'development') {
  // 開発環境
  mediaPath = path.join(__dirname, '..', '..', 'media')
  menuIcon = path.join(__dirname, '../../static/yotaka_menu_icon.png')
  global.__static = path
    .join(__dirname, '..', '..', 'static')
    .replace(/\\/g, '\\\\')
} else {
  // パッケージビルド版
  global.__static = path
    .join(__dirname, 'static')
    .replace(/\\/g, '\\\\')
}

const store = new Store({
  media: {
    path: mediaPath
  }
})

if (!store.get('media.path')) {
  store.set('media.path', mediaPath)
}

// 数字符からポート番号の決定
// http://www2u.biglobe.ne.jp/~b-jack/kouza/s-1.html
// yotaka -> よたか -> 435
global.__port = '4350'

const networkIp = ip.address()
global.__url = 'http://' + networkIp + ':' + global.__port

// podcastのサーバーを立ち上げる
require('./server')

let tray = null

function createWindow () {
  const image = nativeImage.createFromPath(menuIcon)
  image.resize({width: 16, height: 16})
  tray = new Tray(image)

  const contextMenu = Menu.buildFromTemplate([
    { role: 'about' },
    { type: 'separator' },
    {
      label: '閲覧ディレクトリの変更',
      click () {
        dialog.showOpenDialog(
          { defaultPath: store.get('media.path'), properties: ['openDirectory'] },
          function (filePaths) {
            if (!(filePaths && filePaths.length)) {
              return
            }
            const file = filePaths.shift()
            store.set('media.path', file)
          }
        )
      }
    },
    {
      label: 'Podcast Feed のコピー',
      click () {
        clipboard.writeText(__url + '/rss.xml')
      }
    },
    {
      label: 'Podcast Feed を QRコードで表示',
      click () {
        QRCode.toDataURL(__url + '/rss.xml', (_, url) => {
          let childwin = new BrowserWindow()
          childwin.loadURL(url)
          childwin.on('closed', () => {
            childwin = null
          })
        })
      }
    },
    { type: 'separator' },
    { role: 'quit' }
  ])
  tray.setToolTip('yotaka')
  tray.setContextMenu(contextMenu)
}

if (process.platform === 'darwin') {
  app.dock.hide()
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (tray === null) {
    createWindow()
  }
})

process.on('uncaughtException', function (err) {
  log.error('electron:event:uncaughtException')
  log.error(err)
  log.error(err.stack)
  app.quit()
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
