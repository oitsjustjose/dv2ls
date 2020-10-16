import { Request, Response } from 'express'
import URLs from '../../db/url.schema'

export default async (req: Request, res: Response) => {
    try {
        const url = new URLs()
        url.url = req.body.url
        await url.save()

        return res.status(200).send(url._id);
    } catch (ex) {
        console.error(ex)
        return res.status(500).send({
            error: ex
        })
    }
}