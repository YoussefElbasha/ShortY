import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import * as bodyParser from 'body-parser'
import getUrlShortener from './controllers/get-url-shortener'
import postUrl from './controllers/post-url'
import redirect from './controllers/redirect'

dotenv.config()
const app = express()
const port = process.env.PORT
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())


app.post('/', postUrl)
app.get('/', getUrlShortener)
app.get('/:shortUrl', redirect)

app.listen(port, () => {
  console.log(`Listening on port ${port}: http://localhost:${port}`)
})

