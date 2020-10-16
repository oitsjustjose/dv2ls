import { Request, Response } from 'express'
import Pastes from '../../db/txt.schema'
import moment from 'moment-timezone'

export default async (req: Request, res: Response) => {
    try {
        const paste = await Pastes.findById(req.params.slug)

        if (paste) {
            // Check for an expired link
            if (moment().isAfter(moment(paste.expiresAt))) {
                await Pastes.findByIdAndDelete(paste._id)
                return res.status(404).send("PASTE_EXPIRED")
            }

            if (req.query && paste.syntax === null) {
                paste.syntax = Object.keys(req.query)[0]
                await paste.save()
            }

            return res.json({
                paste: paste.paste,
                syntax: paste.syntax
            })
        } else {
            return res.status(404).end()
        }
    } catch (ex) {
        console.error(ex)
        return res.status(500).send({
            error: ex
        })
    }
}