



import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    date: { type: Date, required: true, default: Date.now },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    imageUrl: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

blogSchema.index({ category: 1 });

export default mongoose.model("Blog", blogSchema); 







