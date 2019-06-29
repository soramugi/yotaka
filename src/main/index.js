'use strict'

import { app, clipboard, dialog, nativeImage, Menu, Tray } from 'electron'
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
  // global.__static = require('path')
  //   .join(__dirname, '..', '..', 'static')
  //   .replace(/\\/g, '\\\\')
}

global.__url = 'http://127.0.0.1:4350'

// podcastのサーバーを立ち上げる
require('./server')

let tray = null

function createWindow () {
  const image = nativeImage.createFromPath(require('path').join(__dirname, '../../build/icons/yotaka_menu_icon.png'))
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
