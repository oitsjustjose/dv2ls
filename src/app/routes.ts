import { Application } from 'express'
import shortid from 'shortid'
import Urls from './schema'

export default (app: Application) => {
    app.get('/', async (req, res) => {
        res.render('home.ejs')
    })

    app.get('/:shortid', async (req, res) => {
        try {
            const urlObj = await Urls.findOne({
                shortid: req.params.shortid
            })

            if (urlObj) {
                res.redirect(urlObj.url)
            } else {
                res.status(404).end()
            }
        } catch (ex) {
            console.error(ex)
            res.status(500).send({
                error: ex
            })
        }
    })

    app.put('/', async (req, res) => {
        if (req.body.url) {
            const tmp = await Urls.findOne({
                url: String(req.body.url)
            })

            if (tmp) {
                res.json(tmp)
            } else {
                const newUrl = new Urls()
                newUrl.url = String(req.body.url)
                await newUrl.save()
                res.json(newUrl)
            }
        } else {
            res.status(422).end()
        }
    })
}