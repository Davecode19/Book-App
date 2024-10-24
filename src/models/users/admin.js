import mongoose from "mongoose";

const adminReg = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true 
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      default: "male",
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // To know the time and date a user registers
);

export const Admin = mongoose.model("admin", adminReg); 


// import mongoose from "mongoose";

// const adminReg = new mongoose.Schema(
//   {
//     username: { 
//         type: String, 
//         required: true
//      },
//     email: { 
//         type: String, 
//         required: true, 
//         unique: true },
//     gender: {
//       type: String,
//       enum: ["male", "female", "other"],
//       default: "male",
//     },
//     password: { 
//         type: String, 
//         required: true 
//     },
//     role: {
//       type: String,
//       required:true,
//       lowercase:true,
//       default:"admin",
//     },
//   },
//   { timestamps: true }
// );

// export const Admin = mongoose.model('admin',adminReg);
