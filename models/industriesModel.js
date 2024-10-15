import mongoose from "mongoose";

const industriesSchema = new mongoose.Schema({
    sectionOne: {
        heading: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String, required: true },
        imageIcons: [{ type: String, required: true }]
      },
      sectionTwo: [
        {
          image: { type: String, required: true },
          heading: { type: String, required: true },
          description: { type: String, required: true },
        },
      ]
    });

const industries = mongoose.model("Industries", industriesSchema);
export default industries;
