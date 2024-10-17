import fs from "fs";
import path from "path";
import insights from "../models/insightsModel.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Section One

export const addSectionOne = async (req, res) => {
    try {
      const { heading } = req.body;
      const image = req.file ? req.file.filename : null;
  
      const newSectionOne = {
        sectionOne: {
          heading,
          image,
        },
      };
  
      const insight = new insights(newSectionOne);
      await insight.save();
  
      res
        .status(201)
        .json({ message: "Section One added successfully", data: insight });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  export const updateSectionOne = async (req, res) => {
    try {
      const { id } = req.params;
      const { heading } = req.body;
      const insight = await insights.findById(id);
  
      if (!insight) {
        return res.status(404).json({ message: "Section One not found" });
      }
  
      if (req.file && insight.sectionOne.image) {
        const oldImagePath = path.join("uploads", insight.sectionOne.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
        insight.sectionOne.image = req.file.filename;
      }
  
      insight.sectionOne.heading = heading || insight.sectionOne.heading;
    //   insight.sectionOne.description = description || insight.sectionOne.description;
    //   insight.sectionOne.title = title || insight.sectionOne.title;
      await insight.save();
  
      res
        .status(200)
        .json({ message: "Section One updated successfully", data: insight });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  export const listAllSectionOne = async (req, res) => {
    try {
      const insight = await insights.find({}, "sectionOne");
      res.status(200).json(insight);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  export const getSelectedSectionOne = async (req, res) => {
    try {
      const { id } = req.params;
      const insight = await insights.findById(id, "sectionOne");
  
      if (!insight) {
        return res.status(404).json({ message: "Section One not found" });
      }
  
      res.status(200).json(insight);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  export const deleteSectionOne = async (req, res) => {
    try {
      const { id } = req.params;
  
      const insight = await insights.findById(id);
  
      if (!insight) {
        return res.status(404).json({ message: "Section One not found" });
      }
  
      const imagePath = path.join("uploads", insight.sectionOne.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
  
      await insights.findByIdAndDelete(id);
  
      res.status(200).json({ message: "Section One deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// Section two

export const addSectionTwo = async (req, res) => {
    try {
      const { heading, contentHeading, title, buttonText } = req.body;
      // const icon = req.files.icon ? req.files.icon[0].filename : null;
      //const image = req.files.image ? req.files.image[0].filename : null;
      const image = req.file ? req.file.filename : null;
      const insight = await insights.findOne();
      if (!insight) {
        return res.status(404).json({ message: "Home document not found" });
      }
  
      insight.sectionTwo.heading = heading;
  
      insight.sectionTwo.content.push({
        image,
        heading: contentHeading,
        title,
        buttonText
      });
  
      await insight.save();
  
      return res.status(201).json({
        message: "Content added successfully",
        sectionTwo: insight.sectionTwo,
      });
    } catch (error) {
      console.error("Error adding section three content:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  
  export const updateSectionTwo = async (req, res) => {
    try {
      const { documentId, contentId } = req.params;
      const { heading, contentHeading, title, buttonText} = req.body;
      // const icon = req.files.icon ? req.files.icon[0].filename : null;
      //const image = req.files.image ? req.files.image[0].filename : null;
      const image = req.file ? req.file.filename : null;
  
      const insight = await insights.findById(documentId);
      if (!insight || !insight.sectionTwo) {
        return res.status(404).json({ message: "Section not found" });
      }
  
      if (heading) {
        insight.sectionTwo.heading = heading;
      }
  
      const contentIndex = insight.sectionTwo.content.findIndex(
        (item) => item._id.toString() === contentId
      );
  
      if (contentIndex === -1) {
        return res.status(404).json({ message: "Content not found" });
      }
  
      const contentToUpdate = insight.sectionTwo.content[contentIndex];
  
     
  
      if (image) {
        if (contentToUpdate.image) {
          const oldImagePath = path.join(
            __dirname,
            "../uploads",
            contentToUpdate.image
          );
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }
        }
        contentToUpdate.image = image;
      }
  
      contentToUpdate.heading = contentHeading || contentToUpdate.heading;
      contentToUpdate.title = title || contentToUpdate.title;
      contentToUpdate.buttonText = buttonText || contentToUpdate.buttonText;
  
      await insight.save();
  
      return res.status(200).json({
        message: "Content updated successfully",
        content: contentToUpdate,
        sectionTwoheading: insight.sectionTwo.heading,
      });
    } catch (error) {
      console.error("Error updating section Three content:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  
  export const listAllSectionTwo = async (req, res) => {
    try {
      const insight = await insights.find();
      if (!insight || !insight[0].sectionTwo) {
        return res
          .status(404)
          .json({ message: "No content found in section three" });
      }
  
      return res.status(200).json({ sectionTwo: insight[0].sectionTwo});
    } catch (error) {
      console.error("Error retrieving section two content:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  
  export const getSelectedSectionTwo = async (req, res) => {
    try {
      const { documentId, contentId } = req.params;
  
      const insight = await insights.findById(documentId);
      if (!insight || !insight.sectionTwo) {
        return res.status(404).json({ message: "Section not found" });
      }
  
      const contentToGet = insight.sectionTwo.content.find(
        (item) => item._id.toString() === contentId
      );
  
      if (!contentToGet) {
        return res.status(404).json({ message: "Content not found" });
      }
  
      return res.status(200).json({ content: contentToGet });
    } catch (error) {
      console.error("Error retrieving specific section three content:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  
  export const deleteSectionTwo = async (req, res) => {
    try {
      const { documentId, contentId } = req.params;
  
      const insight = await insights.findById(documentId);
      if (!insight || !insight.sectionTwo) {
        return res.status(404).json({ message: "Section not found" });
      }
  
      const contentIndex = home.sectionTwo.content.findIndex(
        (item) => item._id.toString() === contentId
      );
  
      if (contentIndex === -1) {
        return res.status(404).json({ message: "Content not found" });
      }
  
      const contentToDelete = service.sectionTwo.content[contentIndex];
  
      if (contentToDelete.image) {
        const imagePath = path.join(
          __dirname,
          "../uploads",
          contentToDelete.image
        );
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }
  
      insight.sectionTwo.content.splice(contentIndex, 1);
      await insight.save();
  
      return res.status(200).json({ message: "Content deleted successfully" });
    } catch (error) {
      console.error("Error deleting section five content:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };