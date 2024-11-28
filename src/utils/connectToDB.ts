import mongoose from "mongoose";
const connectToDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("MongoDB connected");
  } catch (error: unknown) {
    if (error instanceof Error)
      console.error("Database connection failed:", error.message);
    else console.error("unknown error:", error);
    process.exit(1);
  }
};

export default connectToDB;
