import path from "path";
import industries from "../models/industriesModel.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Section One

export const addSectionOne = async (req, res) => {
    try {
      const { heading, description } = req.body;
      // const image = req.file ? req.file.filename : null;
      const image = req.files['image'][0].filename;
      const imageIcons = req.files['imageIcons'].map(file => file.filename);
  
      const newSectionOne = {
        sectionOne: {
          heading,
          description,
          image,
          imageIcons
        },
      };
  
      const industry = new industries(newSectionOne);
      await industry.save();
  
      res
        .status(201)
        .json({ message: "Section One added successfully", data: industry });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  export const updateSectionOne = async (req, res) => {
    try {
      const { id } = req.params;
      const { heading, description} = req.body;
      const industry = await industries.findById(id);
  
      if (!industry) {
        return res.status(404).json({ message: "Section One not found" });
      }
  
      if (req.files && req.files['image'] && industry.sectionOne.image) {
        const oldImagePath = path.join("uploads", industry.sectionOne.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
        industry.sectionOne.image = req.files['image'][0].filename;
      }
  
      if (req.files && req.files['imageIcons'] && industry.sectionOne.imageIcons) {
        industry.sectionOne.imageIcons.forEach((iconPath) => {
          const oldIconPath = path.join("uploads", iconPath);
          if (fs.existsSync(oldIconPath)) {
            fs.unlinkSync(oldIconPath);
          }
        });
        industry.sectionOne.imageIcons = req.files['imageIcons'].map(file => file.filename);
    }
  
    industry.sectionOne.heading = heading || industry.sectionOne.heading;
    industry.sectionOne.description = description || industry.sectionOne.description;
     //  service.sectionOne.title = title || service.sectionOne.title;
      await industry.save();
  
      res
        .status(200)
        .json({ message: "Section One updated successfully", data: industry });
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
      const industry = await industries.findById(id, "sectionOne");
  
      if (!industry) {
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
  
      const industry = await industries.findById(id);
  
      if (!industry) {
        return res.status(404).json({ message: "Section One not found" });
      }
  
      const imagePath = path.join("uploads", industry.sectionOne.image);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    industry.sectionOne.imageIcons.forEach((iconPath) => {
      const iconFullPath = path.join("uploads", iconPath);
      if (fs.existsSync(iconFullPath)) {
        fs.unlinkSync(iconFullPath);
      }
    });
      await industry.findByIdAndDelete(id);
  
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