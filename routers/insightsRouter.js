import express from "express";
import upload from "../config/multer.js";

import {
    addSectionOne,
    addSectionTwo,
    deleteSectionOne,
  deleteSectionTwo,
  getSelectedSectionOne,
  getSelectedSectionTwo,
  listAllSectionOne,
  listAllSectionTwo,
  updateSectionOne,
  updateSectionTwo,
} from "../controllers/insightsController.js";

const insightsRouter = express.Router();

// Section One

insightsRouter.post("/sectionOne/add", upload.single("image"), addSectionOne);
insightsRouter.put("/sectionOne/update/:id", upload.single("image"), updateSectionOne);
insightsRouter.get("/sectionOne/list", listAllSectionOne);
insightsRouter.get("/sectionOne/get/:id", getSelectedSectionOne);
insightsRouter.delete("/sectionOne/delete/:id", deleteSectionOne);

// Section Two

insightsRouter.post(
    "/sectionTwo/add",
    upload.single("image"),
    addSectionTwo
  );
  insightsRouter.put(
    "/sectionTwo/update/:documentId/:contentId",
    upload.single("image"),
    updateSectionTwo
  );
  insightsRouter.get("/sectionTwo", listAllSectionTwo);
  insightsRouter.get("/sectionTwo/:documentId/:contentId", getSelectedSectionTwo);
  insightsRouter.delete(
    "/sectionTwo/delete/:documentId/:contentId",
    deleteSectionTwo
  );

export default insightsRouter;
