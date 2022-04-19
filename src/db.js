import { connect } from "mongoose";
import { MongoDB } from "./config";

export const connectDB = async () => {
  try {
    await connect(MongoDB);
    console.log("MongoDB connected...");
  } catch (error) {
    console.error(error);
  }
};
