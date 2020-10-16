import { Request, Response } from 'express'
import Images from '../../db/img.schema'
import fs from 'fs'
import path from 'path'

export default async (req: Request, res: Response) => {
    try {
        const data = fs.readFileSync(req.file.path)
        fs.unlinkSync(req.file.path)

        const images = await Images.find()

        for (const img of images) {
            if (img.img.data.compare(data) === 0) {
                /* If some other IP uploads, we want to add them too */
                img.uploaders.push(req.clientIp as string)
                await img.save()
                return res.status(200).send(img._id);
            }
        }

        const img = new Images()

        img.img.contentType = req.file.mimetype
        img.img.data = data
        img.uploaders = req.clientIp ? [req.clientIp as string] : []

        await img.save()

        return res.status(200).send(img._id);
    } catch (ex) {
        console.error(ex)
        return res.status(500).send({
            error: ex
        })
    }
}