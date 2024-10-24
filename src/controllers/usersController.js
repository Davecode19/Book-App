import httpStatus from "http-status";
import { User } from "../models/users/users.js";
import bcrypt from "bcrypt";
import { registerSchema } from "../validation/usersValidation.js";

// Controller function for registering a user
const registerUser = async (req, res) => {
  const { error, value } = registerSchema.validate(req.body);
  if (error) {
    return res.status(httpStatus.BAD_REQUEST).json({
      status: "error",
      message: error.details[0].message, // An object of messages it has different error messages attached to it.
    });
  }
  const { fullname, gender, email, password, role, username, phone } = value;

  try {
    // To Check if a user with the provided email already exists
    let user = await User.findOne({ email: email });
    if (user) {
      return res.status(httpStatus.CONFLICT).json({
        status: "error",
        message: "User with email already exists",
      });
    }

    // Check if a user with the provided username already exists
    user = await User.findOne({ username: username });
    if (user) {
      return res.status(httpStatus.CONFLICT).json({
        status: "error",
        message: "User with username already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    user = new User({
      fullname,
      gender,
      email,
      password: hashedPassword,
      role,
      username,
      phone,
    });

    // Save the user to the database
    await user.save();

    // Return a success response
    res.status(httpStatus.CREATED).json({
      status: "success",
      message: "User registration successful",
      data: user,
    });
  } catch (err) {
    console.error(err);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: "An error occurred while registering the user",
    });
  }
};

// TO UPDATE USERS
const updateUser = async (req, res) => {
  const { email, password, gender, phone } = req.body;
  const { id } = req.params;

  try {
    // CHECK IF USER EXISTS USING ID
    const existingUser = await User.findById(id);

    if (!existingUser) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: "error",
        message: "User not found",
      });
    }

    // TO CHECK IF EMAIL ENTERED ALREADY EXISTS
    const emailExists = await User.findOne({ email });
    if (email) {
      return res.status(httpStatus.OK).json({
        status: "success",
        message: "Email already exists",
      });
    }

    // TO CHECK IF USERNAME ENTERED EXISTS
    const usernameExist = await User.findOne({ username });
    if (usernameExist) {
      return res.status(httpStatus.OK).json({
        status: "success",
        message: "Username already exists",
      });
    }

    //  TO PREPARE THE REQUEST BODY OBJECT
    const updateData = {};
    if (email) updateData.email = email;
    if (username) updateData.username = username;
    if (password) updateData.password = password;
    if (phone) updateData.phone = phone;
    if (gender) updateData.gender = gender;

    // TO CREATE AND RETURN updatedUser
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );

    res.status(httpStatus.OK).json({
      status: "success",
      message: "Users details updated successfully",
      updateData: updatedUser,
    });
  } catch (err) {
    console.error(err);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: "SERVER ERROR",
    });
  }
};

//  TO DELETE A USER
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: "error",
        message: "User not found",
      });
    }
    return res.status(httpStatus.NO_CONTENT).json({
      status: "success",
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: "Invalid",
    });
  }
};

export { registerUser, updateUser, deleteUser };
