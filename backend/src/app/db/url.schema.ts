import mongoose, { Document, Schema, Types } from "mongoose";
import shortid from "shortid";

const UrlSchema: Schema = new Schema({
  _id: {
    type: String,
    default: shortid.generate,
  },
  url: String,
  isSlugCustom: {
    type: Boolean,
    default: false,
  },
});

export type UrlModel = Document & {
  _id: string;
  url: string;
  isSlugCustom: boolean;
};

export default mongoose.model<UrlModel>("urls", UrlSchema, "urls");
