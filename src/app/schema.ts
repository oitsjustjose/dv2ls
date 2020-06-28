import mongoose, { Document, Schema, Types } from 'mongoose'

const UrlSchema: Schema = new Schema({
    shortid: String,
    url: String
})

export type UrlModel = Document & {
    _id: Types.ObjectId,
    shortid: string,
    url: string
}

export default mongoose.model<UrlModel>('urls', UrlSchema, 'urls')