import Home from "../models/homeModel.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Section one

export const addSectionOne = async (req, res) => {
  try {
    const { heading, description, buttonText } = req.body;
    const image = req.files ? req.files[0].filename : null;

    const newSection = {
      heading,
      description,
      image,
      buttonText,
    };

    const home = await Home.findOne();
    if (!home) {
      const newHome = new Home({ sectionOne: [newSection] });
      await newHome.save();
    } else {
      home.sectionOne.push(newSection);
      await home.save();
    }

    res.status(201).json({ message: "Section added successfully", newSection });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const updateSectionOne = async (req, res) => {
  try {
    const { id } = req.params;
    const { heading, description, buttonText } = req.body;
    const newImage = req.files ? req.files[0].filename : null;

    const home = await Home.findOne({ "sectionOne._id": id });

    if (!home) {
      return res.status(404).json({ message: "Section not found" });
    }

    const sectionIndex = home.sectionOne.findIndex(
      (item) => item._id.toString() === id
    );

    if (sectionIndex === -1) {
      return res.status(404).json({ message: "Section not found" });
    }

    const previousImage = home.sectionOne[sectionIndex].image;
    if (newImage && previousImage) {
      const imagePath = path.join("uploads", previousImage);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    home.sectionOne[sectionIndex].heading =
      heading || home.sectionOne[sectionIndex].heading;
    home.sectionOne[sectionIndex].description =
      description || home.sectionOne[sectionIndex].description;
    home.sectionOne[sectionIndex].buttonText =
      buttonText || home.sectionOne[sectionIndex].buttonText;
    home.sectionOne[sectionIndex].image =
      newImage || home.sectionOne[sectionIndex].image;

    await home.save();

    const updatedSection = home.sectionOne[sectionIndex];

    res.status(200).json({
      message: "Section updated successfully",
      updatedSection,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const deleteSectionOne = async (req, res) => {
  try {
    const { id } = req.params;

    const home = await Home.findOne();
    const section = home.sectionOne.find((item) => item._id == id);

    if (!section) {
      return res.status(404).json({ message: "Section not found" });
    }

    const imagePath = path.join("uploads", section.image);
    if (section.image && fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    home.sectionOne = home.sectionOne.filter((item) => item._id != id);
    await home.save();

    res.status(200).json({ message: "Section deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const listAllSectionsOne = async (req, res) => {
  try {
    const home = await Home.findOne();
    res.status(200).json(home.sectionOne);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getSelectedSectionOne = async (req, res) => {
  try {
    const { id } = req.params;

    const home = await Home.findOne();
    const section = home.sectionOne.find((item) => item._id == id);

    if (!section) {
      return res.status(404).json({ message: "Section not found" });
    }

    res.status(200).json(section);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Section two

export const addSectionTwo = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    console.log("Uploaded Files:", req.files);

    const { headingOne, headingTwo, description, buttonText } = req.body;
    const image = req.files ? req.files[0].filename : null;

    const newSection = {
      headingOne,
      headingTwo,
      description,
      image,
      buttonText,
    };

    const home = await Home.findOne();

    if (!home) {
      // Create new Home document with sectionTwo
      const newHome = new Home({ sectionTwo: newSection });
      await newHome.save();
    } else {
      // Update existing Home document
      home.sectionTwo = newSection; // Set the new sectionTwo object
      await home.save();
    }

    res.status(201).json({ message: "Section added successfully", newSection });
  } catch (error) {
    console.error("Error in addSectionTwo:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const updateSectionTwo = async (req, res) => {
  try {
    const { headingOne, headingTwo, description, buttonText } = req.body;
    const newImage = req.files ? req.files[0].filename : null;

    const home = await Home.findOne();

    if (!home) {
      return res.status(404).json({ message: "Home document not found" });
    }

    if (newImage && home.sectionTwo.image) {
      const previousImagePath = path.join("uploads", home.sectionTwo.image);
      if (fs.existsSync(previousImagePath)) {
        fs.unlinkSync(previousImagePath);
      }
    }

    home.sectionTwo = {
      headingOne: headingOne || home.sectionTwo.headingOne,
      headingTwo: headingTwo || home.sectionTwo.headingTwo,
      description: description || home.sectionTwo.description,
      image: newImage || home.sectionTwo.image,
      buttonText: buttonText || home.sectionTwo.buttonText,
    };

    await home.save();

    res.status(200).json({
      message: "Section updated successfully",
      sectionTwo: home.sectionTwo,
    });
  } catch (error) {
    console.error("Error in updateSectionTwo:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const deleteSectionTwo = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the Home document
    const home = await Home.findOne();

    // Check if the home document exists
    if (!home) {
      return res.status(404).json({ message: "Home document not found" });
    }

    // Check if sectionTwo exists
    if (!home.sectionTwo) {
      return res.status(404).json({ message: "Section not found" });
    }

    // Compare the ID with sectionTwo's _id (since sectionTwo is not an array)
    if (home.sectionTwo._id && home.sectionTwo._id.toString() !== id) {
      return res.status(404).json({ message: "Section not found" });
    }

    // Get the image path and delete the image if it exists
    const imagePath = path.join("uploads", home.sectionTwo.image);
    if (home.sectionTwo.image && fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    // Set sectionTwo to null or an empty object to indicate it's deleted
    home.sectionTwo = null; // or you can set it to {}
    await home.save();

    res.status(200).json({ message: "Section deleted successfully" });
  } catch (error) {
    console.error("Error in deleteSectionTwo:", error); // Log the error
    res.status(500).json({ message: "Server error", error });
  }
};

export const listAllSectionsTwo = async (req, res) => {
  try {
    const home = await Home.findOne();
    res.status(200).json(home.sectionTwo);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Section Three

export const addSectionThree = async (req, res) => {
  try {
    const { heading, contentHeading, info, buttonText } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!heading || !info || !contentHeading || !image) {
      return res.status(400).json({
        message: "Main heading, content heading, image, and info are required",
      });
    }

    let parsedInfo;
    try {
      parsedInfo = Array.isArray(JSON.parse(info))
        ? JSON.parse(info).map((text) => ({ text }))
        : [{ text: JSON.parse(info) }];
    } catch (error) {
      parsedInfo = Array.isArray(info)
        ? info.map((text) => ({ text }))
        : [{ text: info }];
    }

    const home = await Home.findOne();
    if (!home) {
      const newHome = new Home({
        sectionThree: {
          heading,
          content: [
            {
              image,
              heading: contentHeading,
              info: parsedInfo,
              buttonText,
            },
          ],
        },
      });
      await newHome.save();
      return res.status(201).json({
        message: "Section added successfully",
        newContent: newHome.sectionThree.content,
      });
    } else {
      if (!home.sectionThree) {
        home.sectionThree = {
          heading,
          content: [
            {
              image,
              heading: contentHeading,
              info: parsedInfo,
              buttonText,
            },
          ],
        };
      } else {
        const contentIndex = home.sectionThree.content.findIndex(
          (item) => item.heading === contentHeading
        );

        if (contentIndex !== -1) {
          home.sectionThree.content[contentIndex].info.push(...parsedInfo);

          if (image) home.sectionThree.content[contentIndex].image = image;
          if (buttonText)
            home.sectionThree.content[contentIndex].buttonText = buttonText;
        } else {
          home.sectionThree.content.push({
            image,
            heading: contentHeading,
            info: parsedInfo,
            buttonText,
          });
        }
      }

      await home.save();
      return res.status(201).json({
        message: "Section updated successfully",
        sectionThree: home.sectionThree,
      });
    }
  } catch (error) {
    console.error("Error adding section three:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateSectionThree = async (req, res) => {
  try {
    const { heading, contentHeading, info, buttonText } = req.body;
    const image = req.file ? req.file.filename : null;
    const { documentId, contentId } = req.params;

    if (!heading || !info || !contentHeading) {
      return res.status(400).json({
        message: "Main heading, content heading, and info are required",
      });
    }

    let parsedInfo;
    try {
      parsedInfo = Array.isArray(JSON.parse(info))
        ? JSON.parse(info).map((text) => ({ text }))
        : [{ text: JSON.parse(info) }];
    } catch (error) {
      parsedInfo = Array.isArray(info)
        ? info.map((text) => ({ text }))
        : [{ text: info }];
    }

    const home = await Home.findById(documentId);
    if (!home || !home.sectionThree) {
      return res.status(404).json({ message: "Section not found" });
    }

    const contentIndex = home.sectionThree.content.findIndex(
      (item) => item._id.toString() === contentId
    );

    if (contentIndex === -1) {
      return res.status(404).json({ message: "Content not found" });
    }

    const contentToUpdate = home.sectionThree.content[contentIndex];

    if (image && contentToUpdate.image) {
      const oldImagePath = path.join(
        __dirname,
        "../uploads",
        contentToUpdate.image
      );
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
      contentToUpdate.image = image;
    }

    contentToUpdate.info = parsedInfo;
    contentToUpdate.heading = contentHeading;
    if (buttonText) contentToUpdate.buttonText = buttonText;

    home.sectionThree.heading = heading;

    await home.save();

    return res.status(200).json({
      message: "Section updated successfully",
      sectionThree: home.sectionThree,
    });
  } catch (error) {
    console.error("Error updating section three:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteSectionThree = async (req, res) => {
  try {
    const { documentId, contentId } = req.params;

    const home = await Home.findById(documentId);
    if (!home) {
      return res.status(404).json({ message: "Document not found" });
    }

    const contentIndex = home.sectionThree.content.findIndex(
      (item) => item._id.toString() === contentId
    );

    if (contentIndex === -1) {
      return res.status(404).json({ message: "Content not found" });
    }

    const imageToRemove = home.sectionThree.content[contentIndex].image;
    if (imageToRemove) {
      const imagePath = path.join(__dirname, "..", "uploads", imageToRemove);
      fs.unlink(imagePath, (err) => {
        if (err) console.error("Error removing image:", err);
      });
    }

    home.sectionThree.content.splice(contentIndex, 1);

    await home.save();

    res.status(200).json({
      message: "Content deleted successfully",
      sectionThree: home.sectionThree,
    });
  } catch (error) {
    console.error("Error deleting content from section three:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getAllSectionsThree = async (req, res) => {
  try {
    const home = await Home.findOne();
    if (!home || !home.sectionThree) {
      return res.status(404).json({ message: "No sections found" });
    }

    res.status(200).json({
      heading: home.sectionThree.heading,
      content: home.sectionThree.content,
    });
  } catch (error) {
    console.error("Error in getAllSectionsThree:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const getSectionThreeById = async (req, res) => {
  try {
    const { documentId, contentId } = req.params;

    const home = await Home.findById(documentId);
    if (!home || !home.sectionThree) {
      return res.status(404).json({ message: "Section not found" });
    }

    const content = home.sectionThree.content.find(
      (item) => item._id.toString() === contentId
    );

    if (!content) {
      return res.status(404).json({ message: "Content not found" });
    }

    return res.status(200).json({
      message: "Content retrieved successfully",
      content,
    });
  } catch (error) {
    console.error("Error retrieving section three content:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Section Four

export const addSectionFour = async (req, res) => {
  try {
    const { heading, contentHeading, description, contentDescription } =
      req.body;
    const image = req.file ? req.file.filename : null;

    if (
      !heading ||
      !contentHeading ||
      !description ||
      !contentDescription ||
      !image
    ) {
      return res.status(400).json({
        message:
          "Main heading, content heading, main description, content description, and image are required",
      });
    }

    const home = await Home.findOne();
    if (!home) {
      return res.status(404).json({ message: "Home document not found" });
    }

    if (!home.sectionFour.heading) {
      home.sectionFour.heading = heading;
    }
    if (!home.sectionFour.description) {
      home.sectionFour.description = description;
    }

    const newContent = {
      heading: contentHeading,
      description: contentDescription,
      image,
    };

    home.sectionFour.content.push(newContent);

    await home.save();

    return res.status(201).json({
      message: "Content added successfully",
      content: newContent,
    });
  } catch (error) {
    console.error("Error adding section four content:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateSectionFour = async (req, res) => {
  try {
    const { documentId, contentId } = req.params;
    const { heading, description, contentHeading, contentDescription } =
      req.body;
    const image = req.file ? req.file.filename : null;

    const home = await Home.findById(documentId);
    if (!home || !home.sectionFour) {
      return res.status(404).json({ message: "Section not found" });
    }

    if (heading) {
      home.sectionFour.heading = heading;
    }
    if (description) {
      home.sectionFour.description = description;
    }

    const contentIndex = home.sectionFour.content.findIndex(
      (item) => item._id.toString() === contentId
    );

    if (contentIndex === -1) {
      return res.status(404).json({ message: "Content not found" });
    }

    const contentToUpdate = home.sectionFour.content[contentIndex];
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
    contentToUpdate.description =
      contentDescription || contentToUpdate.description;

    await home.save();

    return res.status(200).json({
      message: "Content updated successfully",
      content: contentToUpdate,
      sectionFour: {
        heading: home.sectionFour.heading,
        description: home.sectionFour.description,
      },
    });
  } catch (error) {
    console.error("Error updating section four content:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const listAllSectionFour = async (req, res) => {
  try {
    const home = await Home.findOne();
    if (!home || !home.sectionFour) {
      return res.status(404).json({ message: "Section not found" });
    }

    return res.status(200).json({
      message: "Content retrieved successfully",
      content: home.sectionFour.content,
    });
  } catch (error) {
    console.error("Error retrieving section four content:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getSectionFourById = async (req, res) => {
  try {
    const { documentId, contentId } = req.params;

    const home = await Home.findById(documentId);
    if (!home || !home.sectionFour) {
      return res.status(404).json({ message: "Section not found" });
    }

    const content = home.sectionFour.content.find(
      (item) => item._id.toString() === contentId
    );

    if (!content) {
      return res.status(404).json({ message: "Content not found" });
    }

    return res.status(200).json({
      message: "Content retrieved successfully",
      content,
    });
  } catch (error) {
    console.error("Error retrieving section four content:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteSectionFour = async (req, res) => {
  try {
    const { documentId, contentId } = req.params;

    const home = await Home.findById(documentId);
    if (!home || !home.sectionFour) {
      return res.status(404).json({ message: "Section not found" });
    }

    const contentIndex = home.sectionFour.content.findIndex(
      (item) => item._id.toString() === contentId
    );

    if (contentIndex === -1) {
      return res.status(404).json({ message: "Content not found" });
    }

    if (home.sectionFour.content[contentIndex].image) {
      const imagePath = path.join(
        __dirname,
        "../uploads",
        home.sectionFour.content[contentIndex].image
      );
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    home.sectionFour.content.splice(contentIndex, 1);
    await home.save();

    return res.status(200).json({
      message: "Content deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting section four content:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Section Five

export const addSectionFive = async (req, res) => {
  try {
    const { heading, contentHeading, description } = req.body;
    const icon = req.files.icon ? req.files.icon[0].filename : null;
    const image = req.files.image ? req.files.image[0].filename : null;

    const home = await Home.findOne();
    if (!home) {
      return res.status(404).json({ message: "Home document not found" });
    }

    home.sectionFive.heading = heading;

    home.sectionFive.content.push({
      icon,
      image,
      heading: contentHeading,
      description,
    });

    await home.save();

    return res.status(201).json({
      message: "Content added successfully",
      sectionFive: home.sectionFive,
    });
  } catch (error) {
    console.error("Error adding section five content:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateSectionFive = async (req, res) => {
  try {
    const { documentId, contentId } = req.params;
    const { heading, contentHeading, description } = req.body;
    const icon = req.files.icon ? req.files.icon[0].filename : null;
    const image = req.files.image ? req.files.image[0].filename : null;

    const home = await Home.findById(documentId);
    if (!home || !home.sectionFive) {
      return res.status(404).json({ message: "Section not found" });
    }

    if (heading) {
      home.sectionFive.heading = heading;
    }

    const contentIndex = home.sectionFive.content.findIndex(
      (item) => item._id.toString() === contentId
    );

    if (contentIndex === -1) {
      return res.status(404).json({ message: "Content not found" });
    }

    const contentToUpdate = home.sectionFive.content[contentIndex];

    if (icon) {
      if (contentToUpdate.icon) {
        const oldIconPath = path.join(
          __dirname,
          "../uploads",
          contentToUpdate.icon
        );
        if (fs.existsSync(oldIconPath)) {
          fs.unlinkSync(oldIconPath);
        }
      }
      contentToUpdate.icon = icon;
    }

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
    contentToUpdate.description = description || contentToUpdate.description;

    await home.save();

    return res.status(200).json({
      message: "Content updated successfully",
      content: contentToUpdate,
      sectionFiveheading: home.sectionFive.heading,
    });
  } catch (error) {
    console.error("Error updating section five content:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const listAllSectionFive = async (req, res) => {
  try {
    const homes = await Home.find();
    if (!homes || !homes[0].sectionFive) {
      return res
        .status(404)
        .json({ message: "No content found in section five" });
    }

    return res.status(200).json({ sectionFive: homes[0].sectionFive });
  } catch (error) {
    console.error("Error retrieving section five content:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getSelectedSectionFive = async (req, res) => {
  try {
    const { documentId, contentId } = req.params;

    const home = await Home.findById(documentId);
    if (!home || !home.sectionFive) {
      return res.status(404).json({ message: "Section not found" });
    }

    const contentToGet = home.sectionFive.content.find(
      (item) => item._id.toString() === contentId
    );

    if (!contentToGet) {
      return res.status(404).json({ message: "Content not found" });
    }

    return res.status(200).json({ content: contentToGet });
  } catch (error) {
    console.error("Error retrieving specific section five content:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteSectionFive = async (req, res) => {
  try {
    const { documentId, contentId } = req.params;

    const home = await Home.findById(documentId);
    if (!home || !home.sectionFive) {
      return res.status(404).json({ message: "Section not found" });
    }

    const contentIndex = home.sectionFive.content.findIndex(
      (item) => item._id.toString() === contentId
    );

    if (contentIndex === -1) {
      return res.status(404).json({ message: "Content not found" });
    }

    const contentToDelete = home.sectionFive.content[contentIndex];

    if (contentToDelete.icon) {
      const iconPath = path.join(__dirname, "../uploads", contentToDelete.icon);
      if (fs.existsSync(iconPath)) {
        fs.unlinkSync(iconPath);
      }
    }

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

    home.sectionFive.content.splice(contentIndex, 1);
    await home.save();

    return res.status(200).json({ message: "Content deleted successfully" });
  } catch (error) {
    console.error("Error deleting section five content:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Section Six

export const addSectionSix = async (req, res) => {
  try {
    const { heading, contentHeading, description, info } = req.body;
    const icon = req.files.icon ? req.files.icon[0].filename : null;

    const home = await Home.findOne();
    if (!home) {
      return res.status(404).json({ message: "Home document not found" });
    }

    home.sectionSix.content.push({
      icon,
      heading: contentHeading,
      info: info ? JSON.parse(info).map((item) => ({ text: item })) : [],
    });

    home.sectionSix.heading = heading;
    home.sectionSix.description = description;

    await home.save();

    return res.status(201).json({
      message: "Content added successfully",
      sectionSix: home.sectionSix,
    });
  } catch (error) {
    console.error("Error adding section six content:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateSectionSix = async (req, res) => {
  try {
    const { documentId, contentId } = req.params;
    const { heading, contentHeading, description, info } = req.body;
    const icon = req.files.icon ? req.files.icon[0].filename : null;

    const home = await Home.findById(documentId);
    if (!home || !home.sectionFive) {
      return res.status(404).json({ message: "Section not found" });
    }

    if (heading) {
      home.sectionSix.heading = heading;
    }

    const contentIndex = home.sectionSix.content.findIndex(
      (item) => item._id.toString() === contentId
    );
    if (contentIndex === -1) {
      return res.status(404).json({ message: "Content not found" });
    }

    const contentToUpdate = home.sectionSix.content[contentIndex];

    if (icon) {
      if (contentToUpdate.icon) {
        const oldIconPath = path.join(
          __dirname,
          "../uploads",
          contentToUpdate.icon
        );
        if (fs.existsSync(oldIconPath)) {
          fs.unlinkSync(oldIconPath); 
        }
      }
      contentToUpdate.icon = icon; 
    }

    contentToUpdate.heading = contentHeading || contentToUpdate.heading;
    contentToUpdate.description = description || contentToUpdate.description;

    if (info) {
      contentToUpdate.info = JSON.parse(info).map((item) => ({ text: item }));
    }

    await home.save();

    return res.status(200).json({
      message: "Content updated successfully",
      content: contentToUpdate,
    });
  } catch (error) {
    console.error("Error updating section six content:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const listAllSectionSix = async (req, res) => {
  try {
    const home = await Home.findOne({});
    if (!home || !home.sectionSix) {
      return res.status(404).json({ message: "Section six not found" });
    }

    return res.status(200).json({ sectionSix: home.sectionSix });
  } catch (error) {
    console.error("Error listing all section six content:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getSelectedSectionSix = async (req, res) => {
  try {
    const { documentId, contentId } = req.params;

    const home = await Home.findById(documentId);
    if (!home || !home.sectionSix) {
      return res.status(404).json({ message: "Section six not found" });
    }

    const contentItem = home.sectionSix.content.id(contentId);
    if (!contentItem) {
      return res.status(404).json({ message: "Content not found" });
    }

    return res.status(200).json({ content: contentItem });
  } catch (error) {
    console.error("Error getting selected content:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteSectionSix = async (req, res) => {
  try {
    const { documentId, contentId } = req.params;

    const home = await Home.findById(documentId);
    if (!home || !home.sectionSix) {
      return res.status(404).json({ message: "Section six not found" });
    }

    const contentItem = home.sectionSix.content.id(contentId);
    if (!contentItem) {
      return res.status(404).json({ message: "Content not found" });
    }

    if (contentItem.icon) {
      const iconPath = path.join(__dirname, "../uploads", contentItem.icon);
      if (fs.existsSync(iconPath)) {
        fs.unlinkSync(iconPath);
      }
    }

    home.sectionSix.content.pull(contentId);

    await home.save();

    return res.status(200).json({
      message: "Content deleted successfully",
      sectionSix: home.sectionSix,
    });
  } catch (error) {
    console.error("Error deleting section six content:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Section Seven

export const addSectionSeven = async (req, res) => {
  try {
    const { heading, contentHeading, description } = req.body;

    const icon = req.file ? req.file.filename : null;

    const home = await Home.findOne();
    if (!home) {
      return res.status(404).json({ message: "Home document not found" });
    }

    home.sectionSeven.content.push({
      icon,
      heading: contentHeading,
      description,
    });

    home.sectionSeven.heading = heading;

    await home.save();

    return res.status(201).json({
      message: "Content added successfully",
      sectionSeven: home.sectionSeven,
    });
  } catch (error) {
    console.error("Error adding section seven content:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateSectionSeven = async (req, res) => {
  try {
    const { documentId, contentId } = req.params;
    const { heading, contentHeading, description } = req.body;

    const icon = req.file ? req.file.filename : null;

    const home = await Home.findById(documentId);
    if (!home || !home.sectionSeven) {
      return res.status(404).json({ message: "Section seven not found" });
    }

    if (heading) {
      home.sectionSeven.heading = heading;
    }

    const contentIndex = home.sectionSeven.content.findIndex(
      (item) => item._id.toString() === contentId
    );

    if (contentIndex === -1) {
      return res.status(404).json({ message: "Content not found" });
    }

    const contentToUpdate = home.sectionSeven.content[contentIndex];

    if (icon) {
      const oldIconPath = path.join(
        __dirname,
        "../uploads",
        contentToUpdate.icon
      );
      if (contentToUpdate.icon && fs.existsSync(oldIconPath)) {
        fs.unlinkSync(oldIconPath);
      }
      contentToUpdate.icon = icon;
    }

    contentToUpdate.heading = contentHeading || contentToUpdate.heading;
    contentToUpdate.description = description || contentToUpdate.description;

    await home.save();

    return res.status(200).json({
      message: "Content updated successfully",
      content: contentToUpdate,
    });
  } catch (error) {
    console.error("Error updating section seven content:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const listAllSectionSeven = async (req, res) => {
  try {
    const home = await Home.findOne();
    if (!home || !home.sectionSeven) {
      return res.status(404).json({ message: "Section seven not found" });
    }

    return res.status(200).json({
      sectionSeven: home.sectionSeven,
    });
  } catch (error) {
    console.error("Error fetching section seven content:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getSelectedSectionSeven = async (req, res) => {
  try {
    const { documentId, contentId } = req.params;

    const home = await Home.findById(documentId);
    if (!home || !home.sectionSeven) {
      return res.status(404).json({ message: "Section seven not found" });
    }

    const contentItem = home.sectionSeven.content.id(contentId);
    if (!contentItem) {
      return res.status(404).json({ message: "Content not found" });
    }

    return res.status(200).json({
      content: contentItem,
    });
  } catch (error) {
    console.error("Error fetching selected content:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteSectionSeven = async (req, res) => {
  try {
    const { documentId, contentId } = req.params;

    const home = await Home.findById(documentId);
    if (!home || !home.sectionSeven) {
      return res.status(404).json({ message: "Section seven not found" });
    }

    const contentItem = home.sectionSeven.content.id(contentId);
    if (!contentItem) {
      return res.status(404).json({ message: "Content not found" });
    }

    if (contentItem.icon) {
      const iconPath = path.join(__dirname, "../uploads", contentItem.icon);
      if (fs.existsSync(iconPath)) {
        fs.unlinkSync(iconPath);
      }
    }

    home.sectionSeven.content.pull(contentId);

    await home.save();

    return res.status(200).json({
      message: "Content deleted successfully",
      sectionSeven: home.sectionSeven,
    });
  } catch (error) {
    console.error("Error deleting section seven content:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Section Eight

export const addSectionEight = async (req, res) => {
  try {
    const { heading, contentHeading, intro } = req.body;
    const image = req.file ? req.file.filename : null;

    const home = await Home.findOne();
    if (!home) {
      return res.status(404).json({ message: "Home document not found" });
    }

    home.sectionEight.content.push({
      image,
      heading: contentHeading,
      intro,
    });

    if (heading) {
      home.sectionEight.heading = heading;
    }

    await home.save();

    return res.status(201).json({
      message: "Content added successfully",
      sectionEight: home.sectionEight,
    });
  } catch (error) {
    console.error("Error adding section eight content:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateSectionEight = async (req, res) => {
  try {
    const { documentId, contentId } = req.params;
    const { heading, contentHeading, intro } = req.body;
    const image = req.file ? req.file.filename : null;

    const home = await Home.findById(documentId);
    if (!home || !home.sectionEight) {
      return res.status(404).json({ message: "Section eight not found" });
    }

    if (heading) {
      home.sectionEight.heading = heading;
    }

    const contentIndex = home.sectionEight.content.findIndex(
      (item) => item._id.toString() === contentId
    );

    if (contentIndex === -1) {
      return res.status(404).json({ message: "Content not found" });
    }

    const contentToUpdate = home.sectionEight.content[contentIndex];

    if (image) {
      const oldImagePath = path.join(
        __dirname,
        "../uploads",
        contentToUpdate.image
      );
      if (contentToUpdate.image && fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
      contentToUpdate.image = image;
    }

    contentToUpdate.heading = contentHeading || contentToUpdate.heading;
    contentToUpdate.intro = intro || contentToUpdate.intro;

    await home.save();

    return res.status(200).json({
      message: "Content updated successfully",
      content: contentToUpdate,
    });
  } catch (error) {
    console.error("Error updating section eight content:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const listAllSectionEight = async (req, res) => {
  try {
    const home = await Home.findOne();
    if (!home || !home.sectionEight) {
      return res.status(404).json({ message: "Section eight not found" });
    }

    return res.status(200).json({
      message: "Section eight content retrieved successfully",
      sectionEight: home.sectionEight,
    });
  } catch (error) {
    console.error("Error listing section eight content:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getSelectedSectionEight = async (req, res) => {
  try {
    const { documentId, contentId } = req.params;

    const home = await Home.findById(documentId);
    if (!home || !home.sectionEight) {
      return res.status(404).json({ message: "Section eight not found" });
    }

    const contentItem = home.sectionEight.content.id(contentId);
    if (!contentItem) {
      return res.status(404).json({ message: "Content not found" });
    }

    return res.status(200).json({
      message: "Content retrieved successfully",
      content: contentItem,
    });
  } catch (error) {
    console.error("Error retrieving section eight content:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteSectionEight = async (req, res) => {
  try {
    const { documentId, contentId } = req.params;

    const home = await Home.findById(documentId);
    if (!home || !home.sectionEight) {
      return res.status(404).json({ message: "Section eight not found" });
    }

    const contentItem = home.sectionEight.content.id(contentId);
    if (!contentItem) {
      return res.status(404).json({ message: "Content not found" });
    }

    if (contentItem.image) {
      const imagePath = path.join(__dirname, "../uploads", contentItem.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    home.sectionEight.content.pull({ _id: contentId });

    await home.save();

    return res.status(200).json({
      message: "Content deleted successfully",
      sectionEight: home.sectionEight,
    });
  } catch (error) {
    console.error("Error deleting section eight content:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Section Nine

export const addSectionNine = async (req, res) => {
  try {
    const { heading, intro, name, designation } = req.body;
    const image = req.file ? req.file.filename : null;

    const home = await Home.findOne();
    if (!home) {
      return res.status(404).json({ message: "Home document not found" });
    }

    home.sectionNine.content.push({
      image,
      intro,
      name,
      designation,
    });

    if (heading) {
      home.sectionNine.heading = heading;
    }

    await home.save();

    return res.status(201).json({
      message: "Content added successfully",
      sectionNine: home.sectionNine,
    });
  } catch (error) {
    console.error("Error adding section nine content:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateSectionNine = async (req, res) => {
  try {
    const { documentId, contentId } = req.params;
    const { heading, intro, name, designation } = req.body;

    const image = req.file ? req.file.filename : null;

    const home = await Home.findById(documentId);
    if (!home || !home.sectionNine) {
      return res.status(404).json({ message: "Section nine not found" });
    }

    if (heading) {
      home.sectionNine.heading = heading;
    }

    const contentIndex = home.sectionNine.content.findIndex(
      (item) => item._id.toString() === contentId
    );

    if (contentIndex === -1) {
      return res.status(404).json({ message: "Content not found" });
    }

    const contentToUpdate = home.sectionNine.content[contentIndex];

    if (image) {
      const oldImagePath = path.join(
        __dirname,
        "../uploads",
        contentToUpdate.image
      );
      if (contentToUpdate.image && fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
      contentToUpdate.image = image;
    }

    contentToUpdate.intro = intro || contentToUpdate.intro;
    contentToUpdate.name = name || contentToUpdate.name;
    contentToUpdate.designation = designation || contentToUpdate.designation;

    await home.save();

    return res.status(200).json({
      message: "Content updated successfully",
      content: contentToUpdate,
    });
  } catch (error) {
    console.error("Error updating section nine content:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const listAllSectionNine = async (req, res) => {
  try {
    const home = await Home.findOne();
    if (!home || !home.sectionNine) {
      return res.status(404).json({ message: "Section nine not found" });
    }

    return res.status(200).json({
      sectionNine: home.sectionNine,
    });
  } catch (error) {
    console.error("Error listing section nine contents:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getSelectedSectionNine = async (req, res) => {
  try {
    const { documentId, contentId } = req.params;

    const home = await Home.findById(documentId);
    if (!home || !home.sectionNine) {
      return res.status(404).json({ message: "Section nine not found" });
    }

    const contentItem = home.sectionNine.content.id(contentId);
    if (!contentItem) {
      return res.status(404).json({ message: "Content not found" });
    }

    return res.status(200).json({
      content: contentItem,
    });
  } catch (error) {
    console.error("Error getting selected section nine content:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteSectionNine = async (req, res) => {
  try {
    const { documentId, contentId } = req.params;

    const home = await Home.findById(documentId);
    if (!home || !home.sectionNine) {
      return res.status(404).json({ message: "Section nine not found" });
    }

    const contentIndex = home.sectionNine.content.findIndex(
      (item) => item._id.toString() === contentId
    );
    if (contentIndex === -1) {
      return res.status(404).json({ message: "Content not found" });
    }

    const contentItem = home.sectionNine.content[contentIndex];

    if (contentItem.image) {
      const imagePath = path.join(__dirname, "../uploads", contentItem.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    home.sectionNine.content.splice(contentIndex, 1);
    await home.save();

    return res.status(200).json({
      message: "Content deleted successfully",
      sectionNine: home.sectionNine,
    });
  } catch (error) {
    console.error("Error deleting section nine content:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Section Ten

export const addSectionTen = async (req, res) => {
  try {
    const { heading } = req.body;
    const newLogoImage = req.file ? req.file.filename : null;

    const home = await Home.findOne({}); 
    if (!home) {
      return res.status(404).json({ message: "Home document not found" });
    }

    if (heading) {
      home.sectionTen.heading = heading;
    }

    if (newLogoImage) {
      home.sectionTen.logos.push({ logoImage: newLogoImage });
    }

    await home.save();

    return res.status(201).json({
      message: "Logo added successfully",
      sectionTen: home.sectionTen,
    });
  } catch (error) {
    console.error("Error adding logo to section ten:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateSectionTen = async (req, res) => {
  try {
    const { documentId, contentId } = req.params;
    const { heading } = req.body;
    const newLogoImage = req.file ? req.file.filename : null;

    const home = await Home.findById(documentId);
    if (!home || !home.sectionTen) {
      return res.status(404).json({ message: "Section ten not found" });
    }

    if (newLogoImage) {
      const logoItem = home.sectionTen.logos.id(contentId);
      if (!logoItem) {
        return res.status(404).json({ message: "Logo not found" });
      }

      if (logoItem.logoImage) {
        const oldLogoPath = path.join(
          __dirname,
          "../uploads",
          logoItem.logoImage
        );
        if (fs.existsSync(oldLogoPath)) {
          fs.unlinkSync(oldLogoPath);
        }
      }

      logoItem.logoImage = newLogoImage;
    }

    if (heading) {
      home.sectionTen.heading = heading;
    }

    await home.save();

    return res.status(200).json({
      message: "Logo updated successfully",
      sectionTen: home.sectionTen,
    });
  } catch (error) {
    console.error("Error updating section ten logo:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const listAllSectionTen = async (req, res) => {
  try {
    const home = await Home.findOne({});
    if (!home || !home.sectionTen) {
      return res.status(404).json({ message: "Section ten not found" });
    }

    return res.status(200).json({
      sectionTen: home.sectionTen,
    });
  } catch (error) {
    console.error("Error listing section ten:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getSelectedSectionTen = async (req, res) => {
  try {
    const { documentId, contentId } = req.params;

    const home = await Home.findById(documentId);
    if (!home || !home.sectionTen) {
      return res.status(404).json({ message: "Section ten not found" });
    }

    const logoItem = home.sectionTen.logos.id(contentId);
    if (!logoItem) {
      return res.status(404).json({ message: "Logo not found" });
    }

    return res.status(200).json({
      logo: logoItem,
    });
  } catch (error) {
    console.error("Error getting selected logo from section ten:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteSectionTen = async (req, res) => {
  try {
    const { documentId, contentId } = req.params;

    const home = await Home.findById(documentId);
    if (!home || !home.sectionTen) {
      return res.status(404).json({ message: "Section ten not found" });
    }

    const logoItemIndex = home.sectionTen.logos.findIndex(
      (logo) => logo._id.toString() === contentId
    );
    if (logoItemIndex === -1) {
      return res.status(404).json({ message: "Logo not found" });
    }

    const logoItem = home.sectionTen.logos[logoItemIndex];

    if (logoItem.logoImage) {
      const logoPath = path.join(__dirname, "../uploads", logoItem.logoImage);
      if (fs.existsSync(logoPath)) {
        fs.unlinkSync(logoPath);
      }
    }

    home.sectionTen.logos.splice(logoItemIndex, 1);

    await home.save();

    return res.status(200).json({
      message: "Logo deleted successfully",
      sectionTen: home.sectionTen,
    });
  } catch (error) {
    console.error("Error deleting logo from section ten:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
