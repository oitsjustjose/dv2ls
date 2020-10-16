import moment from 'moment'
import { Document, model, Schema } from 'mongoose'
import shortid from 'shortid'

const ImgSchema = new Schema({
    _id: {
        type: String,
        default: shortid.generate
    },
    createdAt: {
        type: Date,
        default: moment().toISOString()
    },
    uploaders: [String],
    img: {
        contentType: String,
        data: Buffer,
    }
})

export type ImgModel = Document & {
    _id: string,
    createdAt: Date,
    uploaders: string[],
    img: {
        contentType: string,
        data: Buffer
    }
}

export default model<ImgModel>("images", ImgSchema, "images")
