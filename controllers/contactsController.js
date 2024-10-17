import fs from "fs";
import path from "path";
import Contact from "../models/contactModel.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const addContact = async (req, res) => {
    try {
      const { heading, description, title, address, phone, email } = req.body;
      const image = req.file ? req.file.filename : null;
  
      if (!image) {
        return res.status(400).json({ message: "Image is required" });
      }
  
      const newContact = new Contact({
        heading,
        description,
        title,
        address,
        phone,
        email,
        image,
      });
  
      await newContact.save();
  
      return res.status(201).json({
        message: "Contact created successfully",
        contact: newContact,
      });
    } catch (error) {
      console.error("Error creating contact:", error);
  
      if (error.code === 11000) {
        // Handle duplicate email error
        return res.status(400).json({ message: "Email already exists" });
      }
  
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };

  export const listAllContacts = async (req, res) => {
    try {
      const contacts = await Contact.find();
      if (!contacts || contacts.length === 0) {
        return res.status(404).json({ message: "No contacts found" });
      }
  
      return res.status(200).json({ contacts });
    } catch (error) {
      console.error("Error retrieving contacts:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };

  export const getContactById = async (req, res) => {
    try {
      const { contactId } = req.params;
  
      const contact = await Contact.findById(contactId);
      if (!contact) {
        return res.status(404).json({ message: "Contact not found" });
      }
  
      return res.status(200).json({ contact });
    } catch (error) {
      console.error("Error retrieving contact:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };

  
  export const updateContact = async (req, res) => {
    try {
      const { contactId } = req.params;
      const { heading, description, title, address, phone, email } = req.body;
      const image = req.file ? req.file.filename : null;
  
      const contact = await Contact.findById(contactId);
      if (!contact) {
        return res.status(404).json({ message: "Contact not found" });
      }
  
      // Update fields
      contact.heading = heading || contact.heading;
      contact.description = description || contact.description;
      contact.title = title || contact.title;
      contact.address = address || contact.address;
      contact.phone = phone || contact.phone;
      contact.email = email || contact.email;
  
      if (image) {
        // Remove the old image if a new one is provided
        const oldImagePath = path.join(__dirname, "../uploads", contact.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);  // Wrap this in try-catch if needed
        }
        contact.image = image;
      }
  
      await contact.save();
  
      return res.status(200).json({
        message: "Contact updated successfully",
        contact,
      });
    } catch (error) {
      console.error("Error updating contact:", error);
  
      if (error.code === 11000) {
        // Handle duplicate email error
        return res.status(400).json({ message: "Email already exists" });
      }
  
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };

  export const deleteContact = async (req, res) => {
    try {
      const { contactId } = req.params;
  
      const contact = await Contact.findById(contactId);
      if (!contact) {
        return res.status(404).json({ message: "Contact not found" });
      }
  
      // Remove the associated image
      const imagePath = path.join(__dirname, "../uploads", contact.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);  // Wrap this in try-catch if needed
      }
  
      await contact.deleteOne();
  
      return res.status(200).json({ message: "Contact deleted successfully" });
    } catch (error) {
      console.error("Error deleting contact:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  
  

