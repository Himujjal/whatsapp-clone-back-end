import mongoose from "mongoose";

export interface IProductSchema {
  _id: string;
  name: string;
}

export const productSchema = new mongoose.Schema<IProductSchema>({
  name: String,
});

export default mongoose.model("product", productSchema);
