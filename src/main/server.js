import express from 'express'
import Podcast from 'podcast'
import path from 'path'
import glob from 'glob'
import Store from 'electron-store'

const store = new Store()

const app = express()
app.use('/static', express.static(__static))
app.use('/media', express.static(store.get('media.path')))

app.get('/rss.xml', function (req, res) {
  res.set('Content-Type', 'text/xml; charset=utf-8')

  app.use('/media', express.static(store.get('media.path')))

  const imageUrl = __url + '/static/feed_icon.png'
  const feed = new Podcast({
    title: 'yotaka',
    description: '家庭内Podcast配信サーバー',
    site_url: 'https://github.com/soramugi/yotaka',
    image_url: imageUrl,
    docs: 'https://github.com/soramugi/yotaka',
    author: 'yotaka',
    // pubDate: 'May 20, 2012 04:00:00 GMT',
    itunesImage: imageUrl,
    itunesSummary: '',
    itunesAuthor: 'yotaka'
  })

  // TODO 並び順をファイルの作成日時順に
  glob(path.join(store.get('media.path'), '*.mp3'), function (err, files) {
    if (err) {
      console.error(err)
      res.send(feed.buildXml('  '))
      return
    }
    for (const file of files) {
      const title = path.basename(file, '.mp3')
      const url = __url + '/media/' + path.basename(file)
      // TODO iTunesに登録できても再生できない
      feed.addItem({
        title,
        url,
        description: title,
        date: 'May 20, 2012 04:00:00 GMT',
        enclosure: {
          url,
          file
        },
        itunesSubtitle: title,
        itunesDuration: '2:00:00'
      })
    }

    res.send(feed.buildXml('  '))
  })
})

// 数字符からポート番号の決定
// http://www2u.biglobe.ne.jp/~b-jack/kouza/s-1.html
// yotaka -> よたか -> 435
app.listen(4350, () => console.log('App listening on port 4350!'))
