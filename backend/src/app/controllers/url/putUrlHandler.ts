import { Request, Response } from "express";
import shortid from "shortid";
import URLs from "../../db/url.schema";

const isUrlValid = (url: string) => {
  return url.startsWith("http") || url.startsWith("www");
};

export default async (req: Request, res: Response) => {
  try {
    if (!isUrlValid(req.body.url)) {
      return res.status(422).send({ error: "URL Provided is Invalid" });
    }

    // Validate that there isn't a conflict
    if (req.body.slug) {
      const conflict = await URLs.findById(req.body.slug);
      if (!!conflict) {
        return res
          .status(409)
          .send({ error: `Slug '${req.body.slug}' is already registered.` });
      }
    } else {
      // Only return existing matches if the slug isn't custom
      // Custom ones can continue to conflict :)
      const existing = await URLs.findOne({
        url: req.body.url,
        isSlugCustom: false,
      });
      if (existing) {
        return res.status(200).send(existing._id);
      }
    }

    const url = new URLs();
    url.url = req.body.url;
    url.isSlugCustom = !!req.body.slug;
    url._id = req.body.slug || shortid.generate();
    await url.save();

    return res.status(200).send(url._id);
  } catch (ex) {
    console.error(ex);
    return res.status(500).send({
      error: ex,
    });
  }
};
