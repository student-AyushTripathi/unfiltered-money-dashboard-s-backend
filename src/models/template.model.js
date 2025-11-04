




// models/template.model.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, default: "" },
  image: { type: String, default: "" },
});

const reviewSchema = new mongoose.Schema({
  sectionHeading: { type: String, default: "" }, // add this
  personName: { type: String, default: "" },     // fix naming
  reviewText: { type: String, default: "" },     // rename for clarity
  image: { type: String, default: "" },
});


const sectionSchema = new mongoose.Schema({
  type: { type: String, required: true }, // hero, products, testimonials
  content: {
    bgColor: { type: String, default: "#ffffff" },
    fontFamily: { type: String, default: "Arial" },
    textSize: { type: String, default: "16px" },
    textColor: { type: String, default: "#000000" },

    // Hero
    headingText: { type: String, default: "" },
    subheadingText: { type: String, default: "" },
    buttonText: { type: String, default: "" },
    buttonShape: { type: String, default: "rounded" },
    buttonColor: { type: String, default: "#4f46e5" },
    buttonTextColor: { type: String, default: "#ffffff" },
    image: { type: String, default: "" },

    // Products
    products: { type: [productSchema], default: [] },

    // Testimonials
    reviews: { type: [reviewSchema], default: [] },
  },
});

const templateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  previewImage: { type: String },
  sections: [sectionSchema],
});

export default mongoose.model("Template", templateSchema);
