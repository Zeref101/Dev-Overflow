import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectionToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) {
    return console.log("MISSING MONGODB_URL");
  }

  if (isConnected) {
    console.log("MONGODB is already connected");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "DevFlow",
    });
    isConnected = true;
    console.log("mongodb is connect");
  } catch (error) {
    console.log(error);
  }
};
