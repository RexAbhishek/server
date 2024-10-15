import express from "express";
import upload from "../config/multer.js";

import {
    addSectionOne,
    addSectionThree,
    addSectionTwo,
    deleteSectionOne,
  deleteSectionThree,
  deleteSectionTwo,
  getSelectedSectionOne,
  getSelectedSectionThree,
  getSelectedSectionTwo,
  listAllSectionOne,
  listAllSectionThree,
  listAllSectionTwo,
  updateSectionOne,
  updateSectionThree,
  updateSectionTwo,
} from "../controllers/servicesController.js";

const aboutRouter = express.Router();

// Section One

aboutRouter.post("/sectionOne/add", upload.single("image"), addSectionOne);
aboutRouter.put("/sectionOne/update/:id", upload.single("image"), updateSectionOne);
aboutRouter.get("/sectionOne/list", listAllSectionOne);
aboutRouter.get("/sectionOne/get/:id", getSelectedSectionOne);
aboutRouter.delete("/sectionOne/delete/:id", deleteSectionOne);

// Section Two

aboutRouter.post("/sectionTwo/add/:id", upload.single("image"), addSectionTwo);
aboutRouter.put("/sectionTwo/update/:id/:entryId", upload.single("image"), updateSectionTwo);
aboutRouter.get("/sectionTwo/list/:id", listAllSectionTwo);
aboutRouter.get("/sectionTwo/get/:id/:entryId", getSelectedSectionTwo);
aboutRouter.delete("/sectionTwo/delete/:id/:entryId", deleteSectionTwo);

// Section Three

homeRouter.post(
    "/sectionthree/add",
    upload.fields([{ name: "image" }]),
    addSectionThree
  );
  homeRouter.put(
    "/sectionthree/update/:documentId/:contentId",
    upload.fields([{ name: "image" }]),
    updateSectionThree
  );
  homeRouter.get("/sectionthree", listAllSectionThree);
  homeRouter.get("/sectionthree/:documentId/:contentId", getSelectedSectionThree);
  homeRouter.delete(
    "/sectionthree/delete/:documentId/:contentId",
    deleteSectionThree
  );