import mongoose from "mongoose";

const insightsSchema = new mongoose.Schema({
    sectionOne: {
        heading: { type: String, required: true },
        // description: { type: String, required: true },
        image: { type: String, required: true }
        
      },
      sectionTwo:{ 
      heading: { type: String },
      content: [
        {
          image: { type: String, required: true },
          title: { type: String, required: true },
          heading: { type: String, required: true },
          buttonText: { type: String }
        },
      ]}
    });

const insights = mongoose.model("Insights", insightsSchema);
export default insights;