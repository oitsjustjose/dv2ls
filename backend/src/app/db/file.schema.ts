import moment from "moment";
import { Document, model, Schema } from "mongoose";
import shortid from "shortid";

const FileSchema = new Schema({
  _id: {
    type: String,
    default: shortid.generate,
  },
  createdAt: {
    type: Date,
    default: moment().toISOString(),
  },
  uploaders: [String],
  img: {
    contentType: String,
    data: Buffer,
    name: String,
  },
});

export type FileModel = Document & {
  _id: string;
  createdAt: Date;
  uploaders: string[];
  img: {
    contentType: string;
    data: Buffer;
    name: string;
  };
};

// Left this as images to retain old data
export default model<FileModel>("images", FileSchema, "images");
