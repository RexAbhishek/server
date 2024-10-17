import express from 'express';
import upload from '../config/multer.js'; // Ensure this is your correct multer config path
import {
  addSectionOne,
  updateSectionOne,
  addSectionTwo,
  deleteSectionOne,
  deleteSectionTwo,
  getSelectedSectionOne,
  getSelectedSectionTwo,
  listAllSectionOne,
  listAllSectionTwo,
  updateSectionTwo
} from '../controllers/industriesController.js'; // Update with your controller path

const industriesRouter = express.Router();

// Multer configuration to handle multiple files
const multipleUpload = upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'imageIcons', maxCount: 5 },
]);

// Section One
industriesRouter.post('/sectionOne/add', multipleUpload, addSectionOne);
industriesRouter.put('/sectionOne/update/:id', multipleUpload, updateSectionOne);
industriesRouter.get("/sectionOne/list", listAllSectionOne);
industriesRouter.get("/sectionOne/get/:id", getSelectedSectionOne);
industriesRouter.delete("/sectionOne/delete/:id", deleteSectionOne);

// Section Two

industriesRouter.post("/sectionTwo/add/:id", upload.single("image"), addSectionTwo);
industriesRouter.put("/sectionTwo/update/:id/:entryId", upload.single("image"), updateSectionTwo);
industriesRouter.get("/sectionTwo/list/:id", listAllSectionTwo);
industriesRouter.get("/sectionTwo/get/:id/:entryId", getSelectedSectionTwo);
industriesRouter.delete("/sectionTwo/delete/:id/:entryId", deleteSectionTwo);

export default industriesRouter;
