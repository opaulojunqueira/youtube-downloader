const ytdl = require('ytdl-core')
const express = require('express')
const app = express()

app.get('/', async function (req, res) {
    let { url } = req.query

    if (url === undefined) {
        res.send('Inicie o download usando<br><br>http://localhost:3003/?url=<b>videoURL</b>')

    } else if (url !== undefined) {

        let sim = false
        if (url.startsWith('https://www.youtube.com/watch?v=')) sim = true
        if (sim === false) {
            return res.send(`Vídeo não encontrado, por favor ultilize uma url do youtube.`)

        } else {

            let getVideoID = ytdl.getURLVideoID(url),
                getInfo = await ytdl.getInfo(getVideoID)

            res.header("Content-Disposition", `attachmentt; filename="${getInfo.videoDetails.title}.mp4"`)
            return ytdl(url).pipe(res)
        }
    }
})

app.listen(3003)