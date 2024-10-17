import express from "express";
import upload from "../config/multer.js";

import {
  addCareer,
  listAllCareers,
  getCareerById,
  updateCareer,
  deleteCareer
} from "../controllers/careerController.js";

const careerRouter = express.Router();

careerRouter.post("/add", upload.single("image"), addCareer);
careerRouter.put("/update/:careerId", upload.single("image"), updateCareer);
careerRouter.get("/list", listAllCareers);
careerRouter.get("/get/:careerId", getCareerById);
careerRouter.delete("/delete/:careerId", deleteCareer);

export default careerRouter;
