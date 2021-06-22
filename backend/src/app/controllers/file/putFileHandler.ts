import { Request, Response } from "express";
import fs from "fs";
import Files from "../../db/file.schema";

export default async (req: Request, res: Response) => {
  try {
    const data = fs.readFileSync(req.file.path);
    fs.unlinkSync(req.file.path);

    const files = await Files.find();

    for (const file of files) {
      if (file.img.data.compare(data) === 0) {
        /* If some other IP uploads, we want to add them too */
        file.uploaders.push(req.clientIp as string);
        await file.save();
        return res.status(200).send(file._id);
      }
    }

    const file = new Files();

    file.img.contentType = req.file.mimetype;
    file.img.name = req.file.originalname;
    file.img.data = data;
    file.uploaders = req.clientIp ? [req.clientIp as string] : [];

    await file.save();

    return res.status(200).send(file._id);
  } catch (ex) {
    return res.status(500).send({
      error: ex,
    });
  }
};
