import mongoose from 'mongoose';

export const connectDB = async (url: string) => {
  return  await mongoose.connect(url)
}
