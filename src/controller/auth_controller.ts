import cors from 'cors'
import express from "express";
import jwt from "jsonwebtoken";

import config from "../config";
import { forgotPassword } from "../services/auth_service";
import {
  createNewUser,
  getUserByToken,
  getUserByUsername,
  updateUser,
} from "../services/user_service";

const authRouter = express.Router();

authRouter.use(cors())

authRouter.post("/register", async (req, res) => {
  const { username, password, email, image } = req.body;
  try {
    const user = await getUserByUsername(username);
    if (user != null) {
      throw new Error("User already present");
    } else {
      const newUser = await createNewUser(username, password, email, image);
      if (newUser) {
        const token = jwt.sign({ username }, config.jwtSecret(), {
          expiresIn: "7d",
        });
        res.json({
          token,
          _id: newUser._id,
          username: newUser.username,
          lastSeen: newUser.lastSeen,
        });
      } else {
        throw new Error("Error creating new user");
      }
    }
  } catch (err) {
    res.status(403).json({ err: err.message });
  }
});

authRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await getUserByUsername(username, false);
    if (password == user.password) {
      const token = jwt.sign({ username }, config.jwtSecret(), {
        expiresIn: "7d",
      });
      res.json({
        token,
        _id: user._id,
        username: user.username,
        lastSeen: user.lastSeen,
        email: user.email,
        image: user.image,
        officer: user.officer,
      });
    } else {
      throw new Error("Password doesn't match");
    }
  } catch (err) {
    res.status(401).json({ err: err.message });
  }
});

authRouter.post("/refresh_token", (req, res) => {
  res.json('{"hello": "world"}');
});

authRouter.post("/forgot_password", async (req, res) => {
  const { username, password } = req.body;
  try {
    const info = await forgotPassword(username, password);
    res.status(200).json(info);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
});

authRouter.get("/reset/:token", async (req, res) => {
  const { token } = req.params;
  try {
    const user = await getUserByToken(token);
    if (user) {
      res.redirect(config.redirectURL);
    } else {
      res.send(
        `<p>Something is wrong. Try again <a href=${config.redirectURL}>Click on this Link</a></p>`
      );
    }
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
});

export default authRouter;
