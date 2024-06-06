import mongoose from "mongoose";
export const connectToDB = async () => {
  try {
    console.log(process.env.MONGODB_URI);
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
    return Promise.resolve();
  } catch (error) {
    console.error(error);

    return Promise.reject(new Error("Could not connect to MongoDB"));
  }
};
