import { Request, Response } from 'express'
import URLs from '../../db/url.schema'

const isUrlValid = (url: string) => {
    return url.startsWith("http") || url.startsWith("www")
}

export default async (req: Request, res: Response) => {
    try {
        if (!isUrlValid(req.body.url)) {
            return res.status(422).send("INVALID URL")
        }

        const url = new URLs()
        url.url = req.body.url
        await url.save()

        return res.status(200).send(url._id)
    } catch (ex) {
        console.error(ex)
        return res.status(500).send({
            error: ex
        })
    }
}