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
} from "../controllers/aboutContoller.js";

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

aboutRouter.post("/sectionThree/add/:id", upload.single("image"), addSectionThree);
aboutRouter.put("/sectionThree/update/:id/:entryId", upload.single("image"), updateSectionThree);
aboutRouter.get("/sectionThree/list/:id", listAllSectionThree);
aboutRouter.get("/sectionThree/get/:id/:entryId", getSelectedSectionThree);
aboutRouter.delete("/sectionThree/delete/:id/:entryId", deleteSectionThree);

export default aboutRouter;
