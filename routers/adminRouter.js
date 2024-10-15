import express from "express";
import { login, logout, register } from "../controllers/adminController.js";

const adminRouter = express.Router();

adminRouter.post("/register", register);
adminRouter.post("/login", login);
adminRouter.post("/logout", logout);

export default adminRouter;
