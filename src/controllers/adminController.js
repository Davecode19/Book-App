import httpStatus from "http-status";
import { User } from "../models/users/users.js";
import { Admin } from "../models/users/admin.js";
import bcrypt from "bcrypt";
import { registerAdminSchema } from "../validation/adminValidation.js";

const adminReg = async (req, res) => {
  const { error, value } = registerAdminSchema.validate(req.body);
  if (error) {
    return res.status(httpStatus.BAD_REQUEST).json({
      status: "error",
      message: error.details[0].message, // An object of messages it has different error messages attached to it.
    });
  }
  const { username, email, gender, password } = value;

  try {
    let admin = await Admin.findOne({ email: email });
    if (admin) {
      return res.status(httpStatus.CONFLICT).json({
        status: httpStatus.CONFLICT,
        message: "admin with email already exixts",
      });
    }

    admin = await Admin.findOne({ username: username });
    if (admin) {
      return res.status(httpStatus.CONFLICT).json({
        status: httpStatus.CONFLICT,
        message: "admin with username already exixts",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    admin = new Admin({
      username,
      email,
      gender,
      password: hashedPassword,
    });
    await admin.save();

    // RESPONSE WHEN AN ADMIN REGISTERS
    return res.status(httpStatus.CREATED).json({
      status: httpStatus.CREATED,
      message: "Admin registered successfully",
      data: admin,
    });
    /////////////////////////
  } catch (error) {
    console.error(error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: "Registeration unsuccessful",
    });
  }
};

// TO GET ADMIN
const getAdmin = async (req, res) => {
  try {
    let admin = await Admin.find({});
    if (admin.length === 0 || !admin) {
      return res.status(httpStatus.OK).json({
        status: httpStatus.NOT_FOUND,
        message: "Admin not found",
      });
    }

    res.status(httpStatus.OK).json({
      status: "success",
      message: "Admin retrieved successfully",
      data: admin,
    });
  } catch (error) {
    console.error(error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: "not found",
    });
  }
};

// TO GET ALL REGISTERED USERS
const getUsers = async (req, res) => {
  try {
    let user = await User.find({});

    if (user.length === 0 || !user) {
      return res.status(httpStatus.OK).json({
        status: httpStatus.NOT_FOUND,
        message: "User not found",
      });
    }
    res.status(httpStatus.OK).json({
      status: "success",
      message: "registered users retrieved successfully",
      data: user,
    });
  } catch (error) {
    console.error(error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: "not found",
    });
  }
};

// GET A SINGLE USER FROM REGISTERED USERS
const getUser = async (req, res) => {
  const { type, id, email, username } = req.query;
  let user;

  try {
    switch (type) {
      case id:
        if (!id) {
          return res.status(httpStatus.BAD_REQUEST).json({
            status: "error",
            message: "Invalid id",
          });
        }

        user = await User.findById(id);
        if (!user) {
          return res.status(httpStatus.OK).json({
            status: "error",
            message: "User not found",
          });
        }

        return res.status(httpStatus.FOUND).json({
          status: "Success",
          message: "User data retrieved succesfully",
          // data: user
        });

      case email:
        if (!email) {
          return res.status(httpStatus.BAD_REQUEST).json({
            status: "error",
            message: "Invalid email",
          });
        }

        user = await User.findOne(email);
        if (!email) {
          return res.status(httpStatus.NOT_FOUND).json({
            status: "error",
            message: "Email not found",
          });
        }

        return res.status(httpStatus.OK).json({
          status: "Successsful",
          message: "User with email retrieved sucessfully",
          // data: user
        });

      case username:
        if (!username) {
          return res.status(httpStatus.BAD_REQUEST).json({
            status: "error",
            message: "Invalid username",
          });
        }

        user = await User.findOne(username);
        if (!username) {
          return res.status(httpStatus.NOT_FOUND).json({
            status: "error",
            message: "Username not found",
          });
        }

        return res.status(httpStatus.OK).json({
          status: "Successful",
          message: "Username retrieved successfully",
          // data: user
        });
    }
  } catch (err) {
    console.error(err);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: "Server Error",
    });
  }
};

export { getUsers, adminReg, getAdmin, getUser };
