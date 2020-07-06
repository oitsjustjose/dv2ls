import mongoose, { Document, Schema, Types } from 'mongoose'
import shortid from 'shortid'

const UrlSchema: Schema = new Schema({
    shortid: {
        type: String,
        default: shortid.generate,
        unique: true
    },
    url: String
})

export type UrlModel = Document & {
    _id: Types.ObjectId,
    shortid: string,
    url: string
}

export default mongoose.model<UrlModel>('urls', UrlSchema, 'urls')