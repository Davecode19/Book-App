import Joi from "joi";

export const registerAdminSchema = Joi.object({
  username: Joi.string().min(5).max(20).required(),
  email: Joi.string().required(),
  gender: Joi.string().valid("male", "female", "other").required(),
  password: Joi.string().required().min(10).max(40),
});

// import Joi from "joi";

// export const registerSchema = Joi.object({
//   gender: Joi.string().valid("male", "female").required(),
//   email: Joi.string().required(),
//   username: Joi.string().required().min(5).max(20),
//   role: Joi.string().valid("admin").required(),
//   password: Joi.string().required().min(10).max(40),
// });
