import { Request, Response } from "express";
import Pastes from "../../db/txt.schema";
import moment from "moment-timezone";

export default async (req: Request, res: Response) => {
  try {
    const paste = new Pastes();
    paste.paste = req.body.paste;
    paste.syntax = req.body.syntax;
    paste.expiresAt = moment(req.body.expiresAt).toDate();
    await paste.save();

    return res.status(200).send(paste._id);
  } catch (ex) {
    console.error(ex);
    return res.status(500).send({
      error: ex,
    });
  }
};
