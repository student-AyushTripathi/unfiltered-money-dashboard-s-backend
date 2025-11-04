



import mongoose from "mongoose";

const pageSectionSchema = new mongoose.Schema(
  {
    page: { type: String, required: true }, // e.g., "blogs"
    type: { type: String, required: true }, // e.g., "blogs"
    content: { type: mongoose.Schema.Types.Mixed, default: {} }, // Optional category filter
    style: {
      layout: { type: String, default: "grid" },
      columns: { type: Number, default: 3 },
      fontSize: { type: String, default: "16px" },
      fontFamily: { type: String, default: "Poppins" },
      cardShape: { type: String, default: "rounded-lg" },
      imageShape: { type: String, default: "rounded-t-lg" },
      buttonShape: { type: String, default: "rounded" },
      buttonPosition: { type: String, default: "belowContent" },
      fullWidth: { type: Boolean, default: false },
      imagePosition: { type: String, default: "top" },
    },
    styleOptions: {
      fontFamilies: { type: [String], default: ["Poppins", "Roboto", "Open Sans", "Montserrat"] },
      imageShapes: { type: [String], default: ["rounded-t-lg", "rounded-full", "rounded"] },
      cardShapes: { type: [String], default: ["rounded-lg", "rounded-full", "rounded"] }, // <-- add this
      buttonShapes: { type: [String], default: ["rounded", "rounded-full", "rounded-none"] },
      imagePositions: { type: [String], default: ["top", "left", "right"] },
      buttonPositions: { type: [String], default: ["belowContent", "besideContent"] },
      layouts: { type: [String], default: ["grid", "grid-two", "list"] },
    },
    data: [
      {
        refId: { type: mongoose.Schema.Types.ObjectId, ref: "Blog" },
        layout: { type: String },
        columns: Number,
        fontSize: String,
        fontFamily: String,
        cardShape: String,
        imageShape: String,
        buttonShape: String,
        buttonPosition: String,
        fullWidth: Boolean,
        imagePosition: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("PageSection", pageSectionSchema);




