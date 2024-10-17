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

const servicesRouter = express.Router();

// Section One

servicesRouter.post("/sectionOne/add", upload.single("image"), addSectionOne);
servicesRouter.put("/sectionOne/update/:id", upload.single("image"), updateSectionOne);
servicesRouter.get("/sectionOne/list", listAllSectionOne);
servicesRouter.get("/sectionOne/get/:id", getSelectedSectionOne);
servicesRouter.delete("/sectionOne/delete/:id", deleteSectionOne);

// Section Two

servicesRouter.post("/sectionTwo/add/:id", upload.single("image"), addSectionTwo);
servicesRouter.put("/sectionTwo/update/:id/:entryId", upload.single("image"), updateSectionTwo);
servicesRouter.get("/sectionTwo/list/:id", listAllSectionTwo);
servicesRouter.get("/sectionTwo/get/:id/:entryId", getSelectedSectionTwo);
servicesRouter.delete("/sectionTwo/delete/:id/:entryId", deleteSectionTwo);

// Section Three

servicesRouter.post(
    "/sectionThree/add",
    upload.single("image"),
    addSectionThree
  );
  servicesRouter.put(
    "/sectionThree/update/:documentId/:contentId",
    upload.single("image"),
    updateSectionThree
  );
  servicesRouter.get("/sectionThree", listAllSectionThree);
  servicesRouter.get("/sectionThree/:documentId/:contentId", getSelectedSectionThree);
  servicesRouter.delete(
    "/sectionThree/delete/:documentId/:contentId",
    deleteSectionThree
  );

export default servicesRouter;

// upload.fields([{ name: "image" }])