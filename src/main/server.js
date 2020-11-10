// import express from 'express'
// import Podcast from 'podcast'
// import path from 'path'
// import util from 'util'
// import Store from 'electron-store'
// import log from 'electron-log'
// import fs from 'fs'
// // import { getAudioDurationInSeconds } from 'get-audio-duration'

// const glob = util.promisify(require('glob'))

// const store = new Store()

// const app = express()
// app.use('/static', express.static(__static))
// app.use('/media', express.static(store.get('media.path')))

// app.get('/rss.xml', async function (req, res) {
//   try {
//     res.set('Content-Type', 'text/xml; charset=utf-8')

//     // 音声ファイルの取得パス作成、store.get('media.path')は可変なのでrss取得時に再設定
//     app.use('/media', express.static(store.get('media.path')))

//     const imageUrl = __url + '/static/feed_icon.png'
//     const feed = new Podcast({
//       title: 'yotaka',
//       description: '家庭内Podcast配信サーバー',
//       site_url: 'https://github.com/soramugi/yotaka',
//       image_url: imageUrl,
//       docs: 'https://github.com/soramugi/yotaka',
//       author: 'yotaka',
//       // pubDate: 'May 20, 2012 04:00:00 GMT',
//       itunesImage: imageUrl,
//       itunesSummary: '',
//       itunesAuthor: 'yotaka'
//     })

//     const files = await glob(path.join(store.get('media.path'), '*.*'))

//     const list = []
//     for (const file of files) {
//       const extname = path.extname(file)

//       // 対応音声ファイル: M4A, MP3, MOV, MP4, M4V
//       if (!extname.match(/\.m4a|\.mp3|\.mov|\.mp4|\.m4v/i)) {
//         continue
//       }
//       const title = path.basename(file, extname)
//       const stats = fs.statSync(file)
//       const date = stats.atime
//       const url = __url + '/media/' + path.basename(file)
//       // TODO パッケージ作成するとspawnエラーが出るので対応
//       // const duration = await getAudioDurationInSeconds(file)
//       const duration = ''
//       list.push({
//         file,
//         date,
//         title,
//         url,
//         duration
//       })
//     }
//     // 並び順をファイルの作成日時順(降順)に
//     list.sort((a, b) => b.date - a.date)

//     for (const data of list) {
//       const file = data.file
//       const date = data.date
//       const title = data.title
//       const url = data.url
//       const duration = data.duration
//       feed.addItem({
//         title,
//         url,
//         description: title,
//         date,
//         enclosure: {
//           url,
//           file
//         },
//         itunesSubtitle: title,
//         itunesDuration: duration
//       })
//     }

//     res.send(feed.buildXml('  '))
//   } catch (e) {
//     log.error('express')
//     log.error(e)
//     log.error(e.stack)
//     res.send(e)
//   }
// })

// app.listen(__port, () => console.log('App listening on port ' + __port + '!'))

const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()

// Import and Set Nuxt.js options
let config = require('./nuxt/nuxt.config.js').default
config.dev = !(process.env.NODE_ENV === 'production')

async function start () {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  // const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    console.log(nuxt.options)
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(__port)
  consola.ready({
    message: 'App listening on port ' + __port + '!',
    // `Server listening on http://${host}:${port}`
    badge: true
  })
}
start()
