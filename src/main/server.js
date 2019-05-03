import express from 'express'
import Podcast from 'podcast'
import fs from 'fs'
import path from 'path'
import glob from 'glob'

const app = express()
app.use('/static', express.static(__static))

const feed = new Podcast({
  title: 'yotaka',
  description: '家庭内Podcast配信サーバー',
  site_url: 'https://github.com/soramugi/yotaka',
  image_url: 'static/feed_icon.png',
  docs: 'https://github.com/soramugi/yotaka',
  author: 'yotaka',
  // pubDate: 'May 20, 2012 04:00:00 GMT',
  ttl: '60'
})

app.get('/rss.xml', function (req, res) {
  res.set('Content-Type', 'text/xml; charset=utf-8')

  app.use('/media', express.static(__media))

  glob(path.join(__media, '*.mp3'), async function (err, files) {
    if (err) {
      console.error(err)
      res.send(feed.buildXml())
      return
    }
    for (const file of files) {
      await file2addFeedItem(file)
    }

    res.send(feed.buildXml())
  })
})

async function file2addFeedItem (file) {
  const title = path.basename(file, '.mp3')
  const filename = path.basename(file)
  return new Promise(function (resolve) {
    fs.stat(file, function (_, stats) {
      // stats.size
      feed.addItem({
        title: title,
        url: '/media/' + filename,
        date: stats.ctime
      })
      resolve()
    })
  })
}

// 数字符からポート番号の決定
// http://www2u.biglobe.ne.jp/~b-jack/kouza/s-1.html
// yotaka -> よたか -> 435
app.listen(4350, () => console.log('App listening on port 4350!'))
