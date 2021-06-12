import jwt from "jsonwebtoken";
import config from "../config";
import { Request, Response, NextFunction } from "express";
import { IUserSchema } from "../models/user_model";

export interface ICustomRequest extends Request {
  token?: string;
  username?: string;
}

export function verifyToken(
  req: ICustomRequest,
  res: Response,
  next: NextFunction
) {
  const bearerHeader =
    req.headers["authorization"] || req.headers["Authorization"];
  if (bearerHeader != null) {
    if (typeof bearerHeader == "string") {
      const token = bearerHeader.split(" ")[1];
      jwt.verify(token, config.jwtSecret(), (err, authData) => {
        if (err) {
          res.status(401).json({ err: "Error authentication" });
        } else {
          req.token = token;
          req.username = (authData as IUserSchema).username;
          next();
        }
      });
    } else {
      res.status(401).json({ err: "Error authentication" });
    }
  } else {
    res.status(401).json({ err: "Error authentication" });
  }
}
