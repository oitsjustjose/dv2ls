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
            });

            if (urlObj) {
                res.redirect(urlObj.url)
            } else {
                res.status(404).end()
            }
        } catch (ex) {
            console.error(ex);
            res.status(500).send({
                error: ex
            })
        }
    })

    app.post('/add', async (req, res) => {
        if (req.query.url) {
            /* Save DB room, try to find one first: */
            const tmp = await Urls.findOne({
                url: String(req.query.url)
            })

            if (tmp) {
                res.status(200).send(tmp)
            } else {
                const urlObj = new Urls()
                urlObj.shortid = shortid.generate()
                urlObj.url = String(req.query.url)
                await urlObj.save()
                res.status(200).send(urlObj)
            }
        } else {
            res.status(422).end()
        }
    })
}