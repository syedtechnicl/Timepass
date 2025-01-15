import express from "express";
import { login, Logout, register } from "../controllers/user.js";

const router = express.Router();

// router.route("/").post(register).post(login);
// router.route("/").post(login); // valid

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(Logout);
export default router;
