// importing
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Pusher from "pusher";
import messageRouter from "./controller/message_controller";
import authRouter from "./controller/auth_controller";
import userRouter from "./controller/user_controller";
import { IMessageSchema } from "./models/message_model";
import dotenv from "dotenv";

if (process.env.DEV) {
  dotenv.config();
}

import config from "./config";

// app config
const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher(config.pusherConfig());

// middleware
app.use(express.json());
app.use(cors());
app.use(function (_, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// DB config
mongoose.connect(config.mongodbURL(), {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once("open", () => {
  console.log("MongoDB Connected");
  const msgCollection = db.collection("messages");
  const changeStream = msgCollection.watch();
  changeStream.on("change", (change) => {
    if (change.operationType == "insert") {
      const messageDetails: IMessageSchema = change.fullDocument;
      pusher.trigger(
        messageDetails.to + "__" + messageDetails.from,
        "inserted",
        messageDetails
      );
    } else {
      console.log(change.operationType, "not supported");
    }
  });
});

// ?????

// api routes
app.get("/", (_, res) => {
  res.status(200).send("server is running fine");
});

app.use("/messages", messageRouter);
app.use("/users", userRouter);
app.use("/auth", authRouter);

// listen
app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
