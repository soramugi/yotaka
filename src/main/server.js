import express from 'express'
import Podcast from 'podcast'
import path from 'path'
import glob from 'glob'

const app = express()
app.use('/static', express.static(__static))
app.use('/media', express.static(__media))

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

const xml = feed.buildXml()

app.get('/rss.xml', function (req, res) {
  res.set('Content-Type', 'text/xml; charset=utf-8')

  glob(path.join(__media, '*.mp3'), function (err, files) {
    if (err) {
      console.error(err)
      return
    }
    for (const file of files) {
      console.log(file)
      feed.addItem({
        title: 'item title',
        url: 'http://example.com/article4?this&that',
        date: 'May 27, 2012',
        lat: 33.417974,
        long: -111.933231
        // enclosure: { url: '...', file: 'path-to-file' }, // optional enclosure
      })
    }

    res.send(xml)
  })
})

// 数字符からポート番号の決定
// http://www2u.biglobe.ne.jp/~b-jack/kouza/s-1.html
// yotaka -> よたか -> 435
app.listen(4350, () => console.log('App listening on port 4350!'))
