import mongoose from "mongoose";

const servicesSchema = new mongoose.Schema({
    sectionOne: {
        heading: { type: String, required: true },
        description: { type: String, required: true },
        title: { type: String, required: true },
        image: { type: String, required: true }
      },
      sectionTwo: [
        {
          image: { type: String, required: true },
          heading: { type: String, required: true },
          description: { type: String, required: true }
        }
      ],
      sectionThree: {
        heading: { type: String },
        content: [
          {
            image: { type: String },
            heading: { type: String },
            info: { type: String },
            buttonText: { type: String },
          },
        ]
      }
    });

const services = mongoose.model("Services", servicesSchema);
export default services;
    

    