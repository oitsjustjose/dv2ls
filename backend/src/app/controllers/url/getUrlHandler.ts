import { Request, Response } from "express";
import URLs from "../../db/url.schema";

export default async (req: Request, res: Response) => {
  try {
    const obj = await URLs.findById(req.params.slug);
    if (obj) {
      res.status(200).send(obj.url);
    } else {
      res.status(404).send();
    }
  } catch (ex) {
    return res.status(500).send({ error: ex });
  }
};
