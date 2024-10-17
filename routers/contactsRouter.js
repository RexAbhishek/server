import express from "express";
import upload from "../config/multer.js";

import {
  addContact,
  listAllContacts,
  getContactById,
  updateContact,
  deleteContact
} from "../controllers/contactsController.js";

const contactRouter = express.Router();


contactRouter.post("/add", upload.single("image"), addContact);
contactRouter.put("/update/:contactId", upload.single("image"), updateContact);
contactRouter.get("/list", listAllContacts);
contactRouter.get("/get/:contactId", getContactById);
contactRouter.delete("/delete/:contactId", deleteContact);

export default contactRouter;
