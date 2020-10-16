import { Request, Response } from 'express'
import URLs from '../../db/url.schema'

export default async (req: Request, res: Response) => {
    try {
        const url = await URLs.findById(req.params.slug)

        if (url) {
            res.redirect(url.url);
        } else {
            res.status(404).send()
        }
    } catch (ex) {
        console.error(ex)
        return res.status(500).send({
            error: ex
        })
    }
}