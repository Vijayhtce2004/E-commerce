import mongoose from "mongoose";

const dbConnet = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGOURI);
    console.log("Databse connected successfully");
  } catch (error) {
    console.log(error);
  }
};

export default dbConnet;
