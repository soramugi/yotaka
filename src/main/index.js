'use strict'

import { app, clipboard, dialog, Menu, Tray } from 'electron'
import Store from 'electron-store'

const store = new Store({
  media: {
    path: require('path').join(__dirname, 'media')
  }
})

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path')
    .join(__dirname, 'static')
    .replace(/\\/g, '\\\\')
} else {
  global.__static = require('path')
    .join(__dirname, '..', '..', 'static')
    .replace(/\\/g, '\\\\')
}

global.__media = store.get('media.path')

// podcastのサーバーを立ち上げる
require('./server')

let tray = null

function createWindow () {
  tray = new Tray(
    require('path').join(__dirname, '../../build/icons/yotaka_menu_icon.png')
  )
  const contextMenu = Menu.buildFromTemplate([
    { role: 'about' },
    { type: 'separator' },
    {
      label: '閲覧ディレクトリの変更',
      click () {
        dialog.showOpenDialog(
          { defaultPath: __media, properties: ['openDirectory'] },
          function (filePaths) {
            if (!(filePaths && filePaths.length)) {
              return
            }
            const file = filePaths.shift()
            store.set('media.path', file)
            global.__media = store.get('media.path')
          }
        )
      }
    },
    {
      label: 'Podcast Feed のコピー',
      click () {
        // TODO 自分のIPアドレスを取得
        clipboard.writeText('http://localhost:4350/rss.xml')
      }
    },
    { type: 'separator' },
    { role: 'quit' }
  ])
  tray.setToolTip('This is my application.')
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
