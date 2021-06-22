import mongoose, { Document, Schema, Types } from "mongoose";
import shortid from "shortid";

const UrlSchema: Schema = new Schema({
  _id: {
    type: String,
    default: shortid.generate,
  },
  url: String,
});

export type UrlModel = Document & {
  _id: string;
  url: string;
};

export default mongoose.model<UrlModel>("urls", UrlSchema, "urls");
