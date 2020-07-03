import { json as BodyParserJson, urlencoded as BodyParserUrlEncoded } from 'body-parser'
import { config as InitEnv } from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import path from 'path'
import routes from './app/routes'

InitEnv()

const app = express()

app.use(BodyParserJson())
app.use(BodyParserUrlEncoded({
    extended: true
}))

app.use(express.static(__dirname + '/public'))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './app/Views'))

/* Begin connection to MongoDB via Mongoose */

mongoose.connect(`mongodb://${process.env.MONGO_URL}/URLShortener`, {
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
