import mongoose from "mongoose";

export interface IMessageSchema {
  _id: string;
  message: string;
  from: string;
  fromName: string;
  to: string;
  toName: string;
  timestamp: string;
  received: boolean;
}

const messageSchema = new mongoose.Schema<IMessageSchema>({
  message: String,
  from: String, // user id
  fromName: String, // user name
  to: String, //user id
  toName: String, //user to id
  timestamp: String,
  received: Boolean
});

export default mongoose.model("message", messageSchema);
