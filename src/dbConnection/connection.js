// import mongoose from "mongoose";

// export const dbConnection = () => {
//     return mongoose.connect(process.env.MONGO_URL)
// }

import mongoose from "mongoose";
import { User } from "../models/users/users.js";

export const dbConnection = async () => {
  try {
    // Connect to the database
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Drop the unique index on the password field if it exists
    try {
      await User.collection.dropIndex("password_1");
      console.log("Dropped unique index on password field if it existed.");
    } catch (err) {
      if (err.code === 27) {
        console.log("Index not found, it may have already been removed.");
      } else {
        console.error("Error dropping index:", err);
      }
    }
  } catch (err) {
    console.error("Database connection error:", err);
  }
};
