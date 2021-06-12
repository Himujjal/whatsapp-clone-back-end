import cors from 'cors'
import express from "express";
import { ICustomRequest, verifyToken } from "../middlewares/jwt_middleware";
import {
  createMessage,
  getMessageById,
  getMessagesToFrom,
  updateMessage,
  updateMessagesReceivedByIds,
} from "../services/message_service";
import { getUserByUsername } from "../services/user_service";

const messageRouter = express.Router();

messageRouter.use(cors())
messageRouter.use(verifyToken);

messageRouter.get("/", (req, res) => {
  res.json({ test: "complete" });
});

interface ICreateMessageReq extends ICustomRequest {
  body: {
    to: string;
    toName: string;
    message: string;
    timestamp: string;
    officer: boolean;
  };
}

// new message
messageRouter.post("/create", async (req: ICreateMessageReq, res) => {
  const { message, to, toName, timestamp, officer } = req.body;
  try {
    const user = await getUserByUsername(req.username!, officer);
    const from = user._id!;
    const fromName = user.username;
    const mess = {
      message,
      to,
      toName,
      from,
      fromName,
      timestamp,
    };
    const newMessage = await createMessage(mess);
    res.status(200).json(newMessage);
  } catch (err) {
    res.status(402).json({ err: err.message });
  }
});

// update messages as seen
messageRouter.post("/update_messages", async (req, res) => {
  try {
    const { ids } = req.body;
    updateMessagesReceivedByIds(ids).then((_) => {
      res.status(200).json({ ids });
    });
  } catch (err) {
    res.status(404).json({ err: err.message });
  }
});

// update a message as seen
messageRouter.get("/update_message/:id", async (req, res) => {
  try {
    const message = await updateMessage(req.params.id);
    res.status(200).json(message);
  } catch (err) {
    res.status(404).json({ err: err.message });
  }
});

// get message by id
messageRouter.get("/get/:id", async (req, res) => {
  try {
    const message = await getMessageById(req.params.id);
    res.json(message);
  } catch (err) {
    res.status(405).json({ err: err.message });
  }
});

// get all messages from-to
messageRouter.get("/get_from_to/:from/:to", async (req, res) => {
  const { from, to } = req.params;
  try {
    const messages = await getMessagesToFrom(to, from);
    res.json(messages);
  } catch (err) {
    res.status(405).json({ err: err.message });
  }
});

export default messageRouter;
