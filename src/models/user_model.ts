import mongoose from "mongoose";
import { productSchema, IProductSchema } from "./products_model";

export interface IUserSchema {
  _id?: string;
  username: string;
  email?: string;
  image?: string;
  lastSeen: string;
  password?: string;
  officer: boolean;
  products: IProductSchema[];
  resetPasswordToken?: string;
  resetPasswordExpires?: number; // date in number
}

const userSchema = new mongoose.Schema<IUserSchema>({
  username: String,
  password: String,
  email: String,
  image: String,
  lastSeen: String,
  officer: Boolean,
  // would have used string id array. but since the objects are small.
  // this would do for now
  products: [productSchema],
  resetPasswordExpires: Number,
  resetPasswordToken: String,
});

export default mongoose.model("user", userSchema);
