import * as bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import { existsSync, mkdirSync } from 'fs'
import moment from 'moment-timezone'
import multer from 'multer'
import path from 'path'
import { mw as requestIpMw } from 'request-ip'
import getImageHandler from './app/controllers/img/getImageHandler'
import putImageHandler from './app/controllers/img/putImageHandler'
import getTxtHandler from './app/controllers/txt/getTxtHandler'
import putTxtHandler from './app/controllers/txt/putTxtHandler'
import getUrlHandler from './app/controllers/url/getUrlHandler'
import putUrlHandler from './app/controllers/url/putUrlHandler'

const app = express()

app.use(cors())
app.use(requestIpMw())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

const uploadPath = '/tmp/ImgUploads'
if (!existsSync(uploadPath)) {
    mkdirSync(uploadPath)
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath)
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${moment().toISOString()}`)
    }
})

const uploader = multer({ storage })
// Image Uploader
app.put("/api/img", uploader.single("image"), putImageHandler)
app.get("/i/:slug", getImageHandler)
// Pastebin
app.put("/api/paste", putTxtHandler)
app.get("/p/:slug", getTxtHandler)
// URL Shortener
app.put("/api/url", putUrlHandler)
app.get("/u/:slug", getUrlHandler)

export default app