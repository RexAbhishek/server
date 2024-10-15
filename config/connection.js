import { connect } from "mongoose";

export const dbConnect = async () => {
  try {
    await connect(process.env.MONGO_URL);
  } catch (error) {
    console.error(`Error in connecting to MongoDB. Error: ${error.message}`);
  }
};
