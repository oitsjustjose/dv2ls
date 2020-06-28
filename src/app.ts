import { json as BodyParserJson, urlencoded as BodyParserUrlEncoded } from 'body-parser'
import express from 'express'
import mongoose from 'mongoose'
import path from 'path'

import routes from './routes'

const app = express()

app.use(BodyParserJson())
app.use(BodyParserUrlEncoded({
    extended: true
}))

app.use(express.static(__dirname + '/public'))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './app/Views'))

/* Begin connection to MongoDB via Mongoose */

mongoose.connect('mongodb://172.16.1.10/oitsjustjo.se', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((db) => {
    process.stdout.write('Successfully connected to DB\n')
}).catch((ex) => {
    process.stdout.write(`Failed to connect to db:\n\t${ex}\n`)
})

/* Initialize routes and endpoints */
routes(app)

/* Init server and server port */

const port = process.env.PORT || 6969
process.env.PORT = String(port)

// TODO: logging

app.listen(port, () => {
    process.stdout.write(`Listening on port ${port}\n`)
})
