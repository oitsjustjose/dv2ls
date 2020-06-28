import { Application } from 'express'
import Urls from './schema'

export default (app: Application) => {
    app.get('/:id', async (req, res) => {
        try {
            const urlObj = await Urls.findById(req.params.id);
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
        if (req.body.url) {
            const urlObj = new Urls()
            urlObj.url = req.body.url
            await urlObj.save()
            res.status(200).send(urlObj)
        } else {
            res.status(422).end()
        }
    })
}