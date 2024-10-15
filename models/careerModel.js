const careerSchema = new mongoose.Schema({
        heading: { type: String, required: true },
        description: { type: String, required: true },
        title: { type: String, required: true },
        image: { type: String, required: true }
});

const career = mongoose.model("Career", careerSchema);
export default career;
