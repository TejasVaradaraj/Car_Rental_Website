import mongoose from "mongoose";

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is missing");
  // Expect full URI in .env (with db name)
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 8000 })
  console.log('Database connected')
};

export default connectDB;