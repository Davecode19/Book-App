import { getUsers } from "../controllers/adminController.js";
import { adminReg } from "../controllers/adminController.js";
import { getAdmin } from "../controllers/adminController.js";
import { getUser } from "../controllers/adminController.js";
import { deleteUser } from "../controllers/usersController.js";

import express from "express";

const router = express.Router();

router.route("/register").post(adminReg);

router.route("/get-users").get(getUsers);

router.route("/get-user").get(getUser);

router.route("/list-admin").get(getAdmin);

router.route('/delete-user').delete(deleteUser);

export default router;
