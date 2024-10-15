import mongoose from "mongoose";

const BannerSlideSchema = new mongoose.Schema({
  heading: { type: String },
  description: { type: String },
  image: { type: String },
  buttonText: { type: String },
});

const IconHeadingDescSchema = new mongoose.Schema({
  icon: { type: String },
  heading: { type: String },
  description: { type: String },
});

const IconHeadingInfoArraySchema = new mongoose.Schema({
  icon: { type: String },
  heading: { type: String },
  info: [
    {
      text: { type: String },
    },
  ],
});

const ImageHeadingIntroSchema = new mongoose.Schema({
  image: { type: String },
  heading: { type: String },
  intro: { type: String },
});

const ImageIntroNameSchema = new mongoose.Schema({
  image: { type: String },
  intro: { type: String },
  name: { type: String },
  designation: { type: String },
});

const LogoImageSchema = new mongoose.Schema({
  logoImage: { type: String, required: true },
});

const homeSchema = new mongoose.Schema({
  sectionOne: [BannerSlideSchema],
  sectionTwo: {
    headingOne: { type: String },
    headingTwo: { type: String },
    description: { type: String },
    image: { type: String },
    buttonText: { type: String },
  },
  sectionThree: {
    heading: { type: String },
    content: [
      {
        image: { type: String },
        heading: { type: String },
        info: [
          {
            text: { type: String },
          },
        ],
        buttonText: { type: String },
      },
    ],
  },
  sectionFour: {
    heading: { type: String },
    description: { type: String },
    content: [IconHeadingDescSchema],
  },
  sectionFive: {
    heading: { type: String },
    content: [
      {
        icon: { type: String },
        heading: { type: String },
        description: { type: String },
        image: { type: String },
      },
    ],
  },
  sectionSix: {
    heading: { type: String },
    description: { type: String },
    content: [IconHeadingInfoArraySchema],
  },
  sectionSeven: {
    heading: { type: String },
    content: [IconHeadingDescSchema],
  },
  sectionEight: {
    heading: { type: String },
    content: [ImageHeadingIntroSchema],
  },
  sectionNine: {
    heading: { type: String },
    content: [ImageIntroNameSchema],
  },
  sectionTen: {
    heading: { type: String },
    logos: [LogoImageSchema],
  },
});

const Home = mongoose.model("Home", homeSchema);
export default Home;
