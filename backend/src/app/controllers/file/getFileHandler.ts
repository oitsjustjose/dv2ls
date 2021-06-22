import { Request, Response } from "express";
import Files from "../../db/file.schema";

export default async (req: Request, res: Response) => {
  try {
    const file = await Files.findById(req.params.slug);

    if (file) {
      // If it's an image, render it instead of DLing it
      const isImage = file.img.contentType.startsWith("image/");

      res.setHeader(
        "Content-Disposition",
        `${isImage ? "" : "attachment;"} filename=${file.img.name}`
      );
      res.contentType(file.img.contentType);
      return res.send(file.img.data);
    } else {
      console.log("did not find file");
      res.status(404).end();
    }
  } catch (ex) {
    console.error(ex);
    return res.status(500).send({
      error: ex,
    });
  }
};
