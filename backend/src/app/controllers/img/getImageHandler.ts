import { Request, Response } from 'express'
import Images from '../../db/img.schema'

export default async (req: Request, res: Response) => {
    try {
        const img = await Images.findById(req.params.slug)

        if (img) {
            res.contentType(img.img.contentType)
            res.send(img.img.data)
        } else {
            res.status(404).end()
        }
    } catch (ex) {
        console.error(ex)
        return res.status(500).send({
            error: ex
        })
    }
}