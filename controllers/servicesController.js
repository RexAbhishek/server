import fs from "fs";
import path from "path";
import services from "../models/servicesModel.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Section One

export const addSectionOne = async (req, res) => {
    try {
      const { heading, description, title } = req.body;
      const image = req.file ? req.file.filename : null;
  
      const newSectionOne = {
        sectionOne: {
          heading,
          description,
          title,
          image,
        },
      };
  
      const service = new services(newSectionOne);
      await service.save();
  
      res
        .status(201)
        .json({ message: "Section One added successfully", data: service });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  export const updateSectionOne = async (req, res) => {
    try {
      const { id } = req.params;
      const { heading, description, title } = req.body;
      const service = await services.findById(id);
  
      if (!service) {
        return res.status(404).json({ message: "Section One not found" });
      }
  
      if (req.file && service.sectionOne.image) {
        const oldImagePath = path.join("uploads", service.sectionOne.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
        service.sectionOne.image = req.file.filename;
      }
  
      service.sectionOne.heading = heading || service.sectionOne.heading;
      service.sectionOne.description = description || service.sectionOne.description;
      service.sectionOne.title = title || service.sectionOne.title;
      await service.save();
  
      res
        .status(200)
        .json({ message: "Section One updated successfully", data: service });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  export const listAllSectionOne = async (req, res) => {
    try {
      const service = await services.find({}, "sectionOne");
      res.status(200).json(service);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  export const getSelectedSectionOne = async (req, res) => {
    try {
      const { id } = req.params;
      const service = await services.findById(id, "sectionOne");
  
      if (!service) {
        return res.status(404).json({ message: "Section One not found" });
      }
  
      res.status(200).json(service);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  export const deleteSectionOne = async (req, res) => {
    try {
      const { id } = req.params;
  
      const service = await services.findById(id);
  
      if (!service) {
        return res.status(404).json({ message: "Section One not found" });
      }
  
      const imagePath = path.join("uploads", service.sectionOne.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
  
      await services.findByIdAndDelete(id);
  
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

    const service = await services.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ message: "About section not found" });
    }

    const newEntry = {
      heading,
      description,
      image,
    };

    service.sectionTwo.push(newEntry);
    await service.save();

    res.status(201).json({ message: "Section Two entry added", data: service });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateSectionTwo = async (req, res) => {
  try {
    const { id, entryId } = req.params;
    const { heading, description } = req.body;

    const service = await services.findById(id);
    if (!service) {
      return res.status(404).json({ message: "About section not found" });
    }

    const sectionTwoEntry = service.sectionTwo.id(entryId);
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

    await service.save();

    res.status(200).json({ message: "Section Two entry updated", data: service });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const listAllSectionTwo = async (req, res) => {
  try {
    const service = await services.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: "About section not found" });
    }

    res.status(200).json({ data: service.sectionTwo });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSelectedSectionTwo = async (req, res) => {
  try {
    const { id, entryId } = req.params;

    const service = await services.findById(id);
    if (!service) {
      return res.status(404).json({ message: "About section not found" });
    }

    const sectionTwoEntry = service.sectionTwo.id(entryId);
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

    const service = await services.findById(id);
    if (!service) {
      return res.status(404).json({ message: "About section not found" });
    }

    const sectionTwoEntry = service.sectionTwo.id(entryId);
    if (!sectionTwoEntry) {
      return res
        .status(404)
        .json({ message: "Entry in Section Two not found" });
    }

    const imagePath = path.join("uploads", sectionTwoEntry.image);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    service.sectionTwo.pull({ _id: entryId });
    await service.save();

    res.status(200).json({ message: "Section Two entry deleted", data: service });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 

// Section three

export const addSectionThree = async (req, res) => {
  try {
    const { heading, contentHeading, info, buttonText } = req.body;
    // const icon = req.files.icon ? req.files.icon[0].filename : null;
    //const image = req.files.image ? req.files.image[0].filename : null;
    const image = req.file ? req.file.filename : null;
    const service = await services.findOne();
    if (!service) {
      return res.status(404).json({ message: "Home document not found" });
    }

    service.sectionThree.heading = heading;

    service.sectionThree.content.push({
      image,
      heading: contentHeading,
      info,
      buttonText
    });

    await service.save();

    return res.status(201).json({
      message: "Content added successfully",
      sectionThree: service.sectionThree,
    });
  } catch (error) {
    console.error("Error adding section three content:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateSectionThree = async (req, res) => {
  try {
    const { documentId, contentId } = req.params;
    const { heading, contentHeading, info, buttonText} = req.body;
    // const icon = req.files.icon ? req.files.icon[0].filename : null;
    //const image = req.files.image ? req.files.image[0].filename : null;
    const image = req.file ? req.file.filename : null;

    const service = await services.findById(documentId);
    if (!service || !service.sectionThree) {
      return res.status(404).json({ message: "Section not found" });
    }

    if (heading) {
      service.sectionThree.heading = heading;
    }

    const contentIndex = home.sectionThree.content.findIndex(
      (item) => item._id.toString() === contentId
    );

    if (contentIndex === -1) {
      return res.status(404).json({ message: "Content not found" });
    }

    const contentToUpdate = service.sectionThree.content[contentIndex];

   

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
    contentToUpdate.info = info || contentToUpdate.info;
    contentToUpdate.buttonText = buttonText || contentToUpdate.buttonText;

    await service.save();

    return res.status(200).json({
      message: "Content updated successfully",
      content: contentToUpdate,
      sectionThreeheading: service.sectionThree.heading,
    });
  } catch (error) {
    console.error("Error updating section Three content:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const listAllSectionThree = async (req, res) => {
  try {
    const service = await services.find();
    if (!service || !service[0].sectionThree) {
      return res
        .status(404)
        .json({ message: "No content found in section three" });
    }

    return res.status(200).json({ sectionThree: service[0].sectionThree});
  } catch (error) {
    console.error("Error retrieving section five content:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getSelectedSectionThree = async (req, res) => {
  try {
    const { documentId, contentId } = req.params;

    const service = await services.findById(documentId);
    if (!service || !service.sectionThree) {
      return res.status(404).json({ message: "Section not found" });
    }

    const contentToGet = service.sectionThree.content.find(
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

export const deleteSectionThree = async (req, res) => {
  try {
    const { documentId, contentId } = req.params;

    const service = await services.findById(documentId);
    if (!service || !service.sectionThree) {
      return res.status(404).json({ message: "Section not found" });
    }

    const contentIndex = home.sectionFive.content.findIndex(
      (item) => item._id.toString() === contentId
    );

    if (contentIndex === -1) {
      return res.status(404).json({ message: "Content not found" });
    }

    const contentToDelete = service.sectionThree.content[contentIndex];

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

    service.sectionThree.content.splice(contentIndex, 1);
    await service.save();

    return res.status(200).json({ message: "Content deleted successfully" });
  } catch (error) {
    console.error("Error deleting section five content:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};