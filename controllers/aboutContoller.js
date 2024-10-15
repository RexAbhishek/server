import fs from "fs";
import path from "path";
import About from "../models/aboutModel.js";

// Section One

export const addSectionOne = async (req, res) => {
  try {
    const { heading, description } = req.body;
    const image = req.file ? req.file.filename : null;

    const newSectionOne = {
      sectionOne: {
        heading,
        description,
        image,
      },
    };

    const about = new About(newSectionOne);
    await about.save();

    res
      .status(201)
      .json({ message: "Section One added successfully", data: about });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateSectionOne = async (req, res) => {
  try {
    const { id } = req.params;
    const { heading, description } = req.body;
    const about = await About.findById(id);

    if (!about) {
      return res.status(404).json({ message: "Section One not found" });
    }

    if (req.file && about.sectionOne.image) {
      const oldImagePath = path.join("uploads", about.sectionOne.image);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
      about.sectionOne.image = req.file.filename;
    }

    about.sectionOne.heading = heading || about.sectionOne.heading;
    about.sectionOne.description = description || about.sectionOne.description;

    await about.save();

    res
      .status(200)
      .json({ message: "Section One updated successfully", data: about });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const listAllSectionOne = async (req, res) => {
  try {
    const aboutSections = await About.find({}, "sectionOne");
    res.status(200).json(aboutSections);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSelectedSectionOne = async (req, res) => {
  try {
    const { id } = req.params;
    const about = await About.findById(id, "sectionOne");

    if (!about) {
      return res.status(404).json({ message: "Section One not found" });
    }

    res.status(200).json(about);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteSectionOne = async (req, res) => {
  try {
    const { id } = req.params;

    const about = await About.findById(id);

    if (!about) {
      return res.status(404).json({ message: "Section One not found" });
    }

    const imagePath = path.join("uploads", about.sectionOne.image);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    await About.findByIdAndDelete(id);

    res.status(200).json({ message: "Section One deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Section Two

export const addSectionTwo = async (req, res) => {
  try {
    const { heading, description } = req.body;
    const image = req.file ? req.file.filename : null;

    const about = await About.findById(req.params.id);

    if (!about) {
      return res.status(404).json({ message: "About section not found" });
    }

    const newEntry = {
      heading,
      description,
      image,
    };

    about.sectionTwo.push(newEntry);
    await about.save();

    res.status(201).json({ message: "Section Two entry added", data: about });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateSectionTwo = async (req, res) => {
  try {
    const { id, entryId } = req.params;
    const { heading, description } = req.body;

    const about = await About.findById(id);
    if (!about) {
      return res.status(404).json({ message: "About section not found" });
    }

    const sectionTwoEntry = about.sectionTwo.id(entryId);
    if (!sectionTwoEntry) {
      return res
        .status(404)
        .json({ message: "Entry in Section Two not found" });
    }

    if (req.file) {
      const oldImagePath = path.join("uploads", sectionTwoEntry.image);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
      sectionTwoEntry.image = req.file.filename;
    }

    sectionTwoEntry.heading = heading || sectionTwoEntry.heading;
    sectionTwoEntry.description = description || sectionTwoEntry.description;

    await about.save();

    res.status(200).json({ message: "Section Two entry updated", data: about });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const listAllSectionTwo = async (req, res) => {
  try {
    const about = await About.findById(req.params.id);
    if (!about) {
      return res.status(404).json({ message: "About section not found" });
    }

    res.status(200).json({ data: about.sectionTwo });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSelectedSectionTwo = async (req, res) => {
  try {
    const { id, entryId } = req.params;

    const about = await About.findById(id);
    if (!about) {
      return res.status(404).json({ message: "About section not found" });
    }

    const sectionTwoEntry = about.sectionTwo.id(entryId);
    if (!sectionTwoEntry) {
      return res
        .status(404)
        .json({ message: "Entry in Section Two not found" });
    }

    res.status(200).json({ data: sectionTwoEntry });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteSectionTwo = async (req, res) => {
  try {
    const { id, entryId } = req.params;

    const about = await About.findById(id);
    if (!about) {
      return res.status(404).json({ message: "About section not found" });
    }

    const sectionTwoEntry = about.sectionTwo.id(entryId);
    if (!sectionTwoEntry) {
      return res
        .status(404)
        .json({ message: "Entry in Section Two not found" });
    }

    const imagePath = path.join("uploads", sectionTwoEntry.image);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    about.sectionTwo.pull({ _id: entryId });
    await about.save();

    res.status(200).json({ message: "Section Two entry deleted", data: about });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Section Three

export const addSectionThree = async (req, res) => {
  try {
    const { id } = req.params;
    const { heading, contentHeading, description } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!heading || !contentHeading || !description || !image) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const about = await About.findById(id);
    if (!about) {
      return res.status(404).json({ message: "About section not found." });
    }

    about.sectionThree.heading = heading;
    about.sectionThree.content.push({ contentHeading, description, image });
    await about.save();

    res
      .status(201)
      .json({ message: "Section Three updated successfully", data: about });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateSectionThree = async (req, res) => {
  try {
    const { id, entryId } = req.params;
    const { contentHeading, description } = req.body;
    const image = req.file ? req.file.filename : null;

    const about = await About.findById(id);
    if (!about) {
      return res.status(404).json({ message: "About section not found." });
    }

    const contentItem = about.sectionThree.content.id(entryId);
    if (!contentItem) {
      return res.status(404).json({ message: "Content item not found." });
    }

    if (contentHeading) contentItem.contentHeading = contentHeading;
    if (description) contentItem.description = description;
    if (image) {
      const oldImagePath = path.join("uploads", contentItem.image);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
      contentItem.image = image;
    }

    await about.save();

    res
      .status(200)
      .json({
        message: "Section Three item updated successfully",
        data: about,
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const listAllSectionThree = async (req, res) => {
  try {
    const { id } = req.params;
    const about = await About.findById(id);
    if (!about) {
      return res.status(404).json({ message: "About section not found." });
    }
    res
      .status(200)
      .json({
        message: "Section Three items retrieved successfully",
        data: about.sectionThree,
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSelectedSectionThree = async (req, res) => {
  try {
    const { id, entryId } = req.params;
    const about = await About.findById(id);
    if (!about) {
      return res.status(404).json({ message: "About section not found." });
    }

    const contentItem = about.sectionThree.content.id(entryId);
    if (!contentItem) {
      return res.status(404).json({ message: "Content item not found." });
    }

    res
      .status(200)
      .json({
        message: "Section Three item retrieved successfully",
        data: contentItem,
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteSectionThree = async (req, res) => {
  try {
    const { id, entryId } = req.params;
    const about = await About.findById(id);
    if (!about) {
      return res.status(404).json({ message: "About section not found." });
    }

    const contentIndex = about.sectionThree.content.findIndex(
      (item) => item._id.toString() === entryId
    );
    if (contentIndex === -1) {
      return res.status(404).json({ message: "Content item not found." });
    }

    const contentItem = about.sectionThree.content[contentIndex];
    const imagePath = path.join("uploads", contentItem.image);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    about.sectionThree.content.splice(contentIndex, 1);

    await about.save();

    res.status(200).json({
      message: "Section Three item deleted successfully",
      data: about,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};