import express from "express";
import upload from "../config/multer.js";
import {
  addSectionEight,
  addSectionFive,
  addSectionFour,
  addSectionNine,
  addSectionOne,
  addSectionSeven,
  addSectionSix,
  addSectionTen,
  addSectionThree,
  addSectionTwo,
  deleteSectionEight,
  deleteSectionFive,
  deleteSectionFour,
  deleteSectionNine,
  deleteSectionOne,
  deleteSectionSeven,
  deleteSectionSix,
  deleteSectionTen,
  deleteSectionThree,
  deleteSectionTwo,
  getAllSectionsThree,
  getSectionFourById,
  getSectionThreeById,
  getSelectedSectionEight,
  getSelectedSectionFive,
  getSelectedSectionNine,
  getSelectedSectionOne,
  getSelectedSectionSeven,
  getSelectedSectionSix,
  getSelectedSectionTen,
  listAllSectionEight,
  listAllSectionFive,
  listAllSectionFour,
  listAllSectionNine,
  listAllSectionSeven,
  listAllSectionSix,
  listAllSectionsOne,
  listAllSectionsTwo,
  listAllSectionTen,
  updateSectionEight,
  updateSectionFive,
  updateSectionFour,
  updateSectionNine,
  updateSectionOne,
  updateSectionSeven,
  updateSectionSix,
  updateSectionTen,
  updateSectionThree,
  updateSectionTwo,
} from "../controllers/homeController.js";

const homeRouter = express.Router();

// Section One

homeRouter.post("/section-one/add", upload.any(), addSectionOne);
homeRouter.put("/section-one/update/:id", upload.any(), updateSectionOne);
homeRouter.get("/section-one/list-all", listAllSectionsOne);
homeRouter.get("/section-one/:id", getSelectedSectionOne);
homeRouter.delete("/section-one/delete/:id", deleteSectionOne);

// Section Two

homeRouter.post("/section-two/add", upload.any(), addSectionTwo);
homeRouter.put("/section-two/update/:id", upload.any(), updateSectionTwo);
homeRouter.get("/section-two/list-all", listAllSectionsTwo);
homeRouter.delete("/section-two/delete/:id", deleteSectionTwo);

// Section Three

homeRouter.post("/section-three/add", upload.single("image"), addSectionThree);
homeRouter.put(
  "/section-three/update/:documentId/:contentId",
  upload.single("image"),
  updateSectionThree
);
homeRouter.delete(
  "/section-three/delete/:documentId/:contentId",
  deleteSectionThree
);
homeRouter.get("/section-three/list-all", getAllSectionsThree);
homeRouter.get("/section-three/:documentId/:contentId", getSectionThreeById);

// Section Four

homeRouter.post("/section-four/add", upload.single("image"), addSectionFour);
homeRouter.put(
  "/section-four/update/:documentId/:contentId",
  upload.single("image"),
  updateSectionFour
);
homeRouter.get("/section-four/list-all", listAllSectionFour);
// homeRouter.get("/section-four/:documentId", listAllSectionFour);
homeRouter.get("/section-four/:documentId/:contentId", getSectionFourById);
homeRouter.delete(
  "/section-four/delete/:documentId/:contentId",
  deleteSectionFour
);

// Section Five

homeRouter.post(
  "/section-five/add",
  upload.fields([{ name: "icon" }, { name: "image" }]),
  addSectionFive
);
homeRouter.put(
  "/section-five/update/:documentId/:contentId",
  upload.fields([{ name: "icon" }, { name: "image" }]),
  updateSectionFive
);
homeRouter.get("/section-five", listAllSectionFive);
homeRouter.get("/section-five/:documentId/:contentId", getSelectedSectionFive);
homeRouter.delete(
  "/section-five/delete/:documentId/:contentId",
  deleteSectionFive
);

// Section Six

homeRouter.post(
  "/section-six/add",
  upload.fields([{ name: "icon" }]),
  addSectionSix
);
homeRouter.put(
  "/section-six/update/:documentId/:contentId",
  upload.fields([{ name: "icon" }]),
  updateSectionSix
);
homeRouter.get("/section-six/list-all", listAllSectionSix);
homeRouter.get("/section-six/:documentId/:contentId", getSelectedSectionSix);
homeRouter.delete(
  "/section-six/delete/:documentId/:contentId",
  deleteSectionSix
);

// Section Seven

homeRouter.post("/section-seven/add", upload.single("icon"), addSectionSeven);
homeRouter.put(
  "/section-seven/update/:documentId/:contentId",
  upload.single("icon"),
  updateSectionSeven
);
homeRouter.get("/section-seven/list-all/:documentId", listAllSectionSeven);
homeRouter.get(
  "/section-seven/:documentId/:contentId",
  getSelectedSectionSeven
);
homeRouter.delete(
  "/section-seven/delete/:documentId/:contentId",
  deleteSectionSeven
);

// Section Eight

homeRouter.post("/section-eight/add", upload.single("image"), addSectionEight);
homeRouter.put(
  "/section-eight/update/:documentId/:contentId",
  upload.single("image"),
  updateSectionEight
);
homeRouter.get("/section-eight", listAllSectionEight);
homeRouter.get(
  "/section-eight/:documentId/:contentId",
  getSelectedSectionEight
);
homeRouter.delete(
  "/section-eight/delete/:documentId/:contentId",
  deleteSectionEight
);

// Section Nine

homeRouter.post("/section-nine/add", upload.single("image"), addSectionNine);
homeRouter.put(
  "/section-nine/update/:documentId/:contentId",
  upload.single("image"),
  updateSectionNine
);
homeRouter.get("/section-nine", listAllSectionNine);
homeRouter.get("/section-nine/:documentId/:contentId", getSelectedSectionNine);
homeRouter.delete(
  "/section-nine/delete/:documentId/:contentId",
  deleteSectionNine
);

// Section Ten

homeRouter.post("/section-ten/add", upload.single("logoImage"), addSectionTen);
homeRouter.put(
  "/section-ten/update/:documentId/:contentId",
  upload.single("logoImage"),
  updateSectionTen
);
homeRouter.get("/section-ten", listAllSectionTen);
homeRouter.get(
  "/section-ten/:documentId/:contentId",
  getSelectedSectionTen
);
homeRouter.delete(
  "/section-ten/delete/:documentId/:contentId",
  deleteSectionTen
);

export default homeRouter;
