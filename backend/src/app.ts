import * as bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { existsSync, mkdirSync } from "fs";
import moment from "moment-timezone";
import multer from "multer";
import { mw as requestIpMw } from "request-ip";
import getFileHandler from "./app/controllers/file/getFileHandler";
import putFileHandler from "./app/controllers/file/putFileHandler";
import getTxtHandler from "./app/controllers/txt/getTxtHandler";
import putTxtHandler from "./app/controllers/txt/putTxtHandler";
import getUrlHandler from "./app/controllers/url/getUrlHandler";
import putUrlHandler from "./app/controllers/url/putUrlHandler";

const app = express();

app.use(cors());
app.use(requestIpMw());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const uploadPath = "/tmp/FileUploads";
if (!existsSync(uploadPath)) {
  mkdirSync(uploadPath);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${moment().toISOString()}`);
  },
});

const uploader = multer({
  storage,
  //   limits: { fileSize: 17825792 },
}).single("file");
// Image Uploader
app.put("/api/file", uploader, putFileHandler);
app.get("/f/:slug", getFileHandler);
// Pastebin
app.put("/api/paste", putTxtHandler);
app.get("/p/:slug", getTxtHandler);
// URL Shortener -- LAST for a reason.
app.put("/api/url", putUrlHandler);
app.get("/:slug", getUrlHandler);

export default app;
