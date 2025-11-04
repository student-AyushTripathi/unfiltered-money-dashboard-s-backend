import mongoose from "mongoose";

const styleSchema = new mongoose.Schema({
  fontFamily: { type: String, default: "Arial" },
  fontSize: { type: String, default: "16px" },
  imageShape: { type: String, default: "rectangle" },
  buttonShape: { type: String, default: "rounded" },
  imagePosition: { type: String, default: "top" },
  buttonPosition: { type: String, default: "bottom" },
  layout: { type: String, default: "grid" },
  columns: { type: Number, default: 3 },
  fullWidth: { type: Boolean, default: false },
});

const styleOptionsSchema = new mongoose.Schema({
  fontFamilies: { type: [String], default: ["Arial", "Roboto", "Poppins"] }, 
  imageShapes: { type: [String], default: ["rectangle", "circle", "rounded"] },
  buttonShapes: { type: [String], default: ["rounded", "square", "pill"] },
  imagePositions: { type: [String], default: ["top", "left", "right"] },
  buttonPositions: { type: [String], default: ["bottom", "right", "center"] }, 
  layouts: { type: [String], default: ["grid", "list", "masonry"] }, 
});

const pageSectionSchema = new mongoose.Schema(
  {
    page: { type: String, required: true }, // e.g., "blogs"
    type: { type: String, required: true }, // e.g., "blog-category"
    status: { type: String, default: "active" },
    style: { type: styleSchema, default: () => ({}) },
    styleOptions: { type: styleOptionsSchema, default: () => ({}) },
  },
  { timestamps: true }
);

export default mongoose.model("PageSection", pageSectionSchema); 
