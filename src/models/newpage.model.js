





import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['hero', 'products', 'testimonials'], 
    required: true,
  },
  data: mongoose.Schema.Types.Mixed, // Flexible data based on type
});

const newpageSchema = new mongoose.Schema(   
  { 
    slug: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      validate: {
        validator: (value) => !value.startsWith("/"),
        message: "Slug should not start with a forward slash",
      },
    },
    sections: [sectionSchema], // Array of sections for dynamic content
    active: {
      type: Boolean,
      default: true,
    },
    navlinkId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Navlink",
    },
  },
  { timestamps: true }
);

const Newpage = mongoose.model("Newpage", newpageSchema);
export default Newpage;