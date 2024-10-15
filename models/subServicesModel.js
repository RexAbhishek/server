import mongoose from "mongoose";

const subServicesSchema = new mongoose.Schema({
    sectionOne: {
        heading: { type: String, required: true },
        description: { type: String },
        image: { type: String, required: true }
      },
      sectionTwo: [
        {
          image: { type: String, required: true },
          details: [{
            title:{ type: String, required: true },
            description: { type: String, required: true }
        }]
        }
      ]
    });

const subServices = mongoose.model("subServices", subServicesSchema);
export default subServices;
        