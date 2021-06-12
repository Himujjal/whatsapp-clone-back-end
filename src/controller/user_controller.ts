import cors from 'cors'
import express from "express";
import { ICustomRequest, verifyToken } from "../middlewares/jwt_middleware";
import { getAllUsers, updateUser } from "../services/user_service";

const userRouter = express.Router();

userRouter.use(cors())
userRouter.use(verifyToken);

userRouter.get("/get_all", async (req: ICustomRequest, res) => {
  try {
    const username = req.username!;
    const users = await getAllUsers(username);
    res.status(200).json(users);
  } catch (err) {
    res.status(402).json({ err: err.message });
  }
});

userRouter.post("/update", async (req: ICustomRequest, res) => {
  try {
    const { _id, username, image, lastSeen, email } = req.body;
    const updatedUser = await updateUser({
      id: _id,
      username,
      image,
      email,
      lastSeen,
    });
    res.status(200).json(updatedUser)
  } catch (err) {
    res.status(402).json({ err: err.message });
  }
});

export default userRouter;
