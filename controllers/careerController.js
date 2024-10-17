import fs from "fs";
import path from "path";
import Career from "../models/careerModel.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const addCareer = async (req, res) => {
    try {
      const { heading, description, title } = req.body;
      const image = req.file ? req.file.filename : null;  // Assuming you're handling file uploads
  
      if (!image) {
        return res.status(400).json({ message: "Image is required" });
      }
  
      const newCareer = new Career({
        heading,
        description,
        title,
        image,
      });
  
      await newCareer.save();
  
      return res.status(201).json({
        message: "Career entry created successfully",
        career: newCareer,
      });
    } catch (error) {
      console.error("Error creating career entry:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };

  export const listAllCareers = async (req, res) => {
    try {
      const careers = await Career.find();
      if (!careers || careers.length === 0) {
        return res.status(404).json({ message: "No career entries found" });
      }
  
      return res.status(200).json({ careers });
    } catch (error) {
      console.error("Error retrieving career entries:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };

  export const getCareerById = async (req, res) => {
    try {
      const { careerId } = req.params;
  
      const career = await Career.findById(careerId);
      if (!career) {
        return res.status(404).json({ message: "Career entry not found" });
      }
  
      return res.status(200).json({ career });
    } catch (error) {
      console.error("Error retrieving career entry:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };

  export const updateCareer = async (req, res) => {
    try {
      const { careerId } = req.params;
      const { heading, description, title } = req.body;
      const image = req.file ? req.file.filename : null;  // Assuming file uploads for images
  
      const career = await Career.findById(careerId);
      if (!career) {
        return res.status(404).json({ message: "Career entry not found" });
      }
  
      // Update fields
      career.heading = heading || career.heading;
      career.description = description || career.description;
      career.title = title || career.title;
  
      if (image) {
        // Remove the old image if a new one is provided
        const oldImagePath = path.join(__dirname, "../uploads", career.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);  // Consider wrapping this in a try-catch
        }
        career.image = image;
      }
  
      await career.save();
  
      return res.status(200).json({
        message: "Career entry updated successfully",
        career,
      });
    } catch (error) {
      console.error("Error updating career entry:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };

  export const deleteCareer = async (req, res) => {
    try {
      const { careerId } = req.params;
  
      const career = await Career.findById(careerId);
      if (!career) {
        return res.status(404).json({ message: "Career entry not found" });
      }
  
      // Remove the associated image
      const imagePath = path.join(__dirname, "../uploads", career.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);  // Consider wrapping this in a try-catch
      }
  
      await career.deleteOne();
  
      return res.status(200).json({ message: "Career entry deleted successfully" });
    } catch (error) {
      console.error("Error deleting career entry:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  
