import { registerUser } from "../controllers/usersController.js";
import { updateUser } from "../controllers/usersController.js";
import express from "express";

const router = express.Router();

router.route("/register").post(registerUser);

router.route("/update-user").patch(updateUser);
// router.route("/update-user/:id").patch(authorizeUser,checkRoles(['admin','user']), updateUser);


export default router;
