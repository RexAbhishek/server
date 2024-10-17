const contactSchema = new mongoose.Schema({
        heading: { type: String, required: true },
        description: { type: String, required: true },
        title: { type: String, required: true },
        image: { type: String, required: true },
        address: { type: String, required: true },
        phone: { type: String, required: true, trim: true},
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            validate: {
              validator: function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
              },
              message: (props) => `${props.value} is not a valid email address!`,
            },
          }

});

const contact = mongoose.model("Contact", contactSchema);
export default contact;