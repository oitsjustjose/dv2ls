import mongoose, { Document, Schema, Types } from 'mongoose'

const UrlSchema: Schema = new Schema({
    url: String
})

export type UrlModel = Document & {
    _id: Types.ObjectId,
    url: string
}

export default mongoose.model<UrlModel>('urls', UrlSchema, 'urls')