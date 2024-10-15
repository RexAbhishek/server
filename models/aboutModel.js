import mongoose from "mongoose";

const ImageHeadingIntroSchema = new mongoose.Schema({
  contentHeading: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
});

const aboutSchema = new mongoose.Schema({
  sectionOne: {
    heading: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
  },
  sectionTwo: [
    {
      image: { type: String, required: true },
      heading: { type: String, required: true },
      description: { type: String, required: true },
    },
  ],
  sectionThree: {
    heading: { type: String, required: false, default: "" },
    content: [ImageHeadingIntroSchema],
  },
});

const About = mongoose.model("About", aboutSchema);
export default About;
