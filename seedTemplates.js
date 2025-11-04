


// seedTemplates.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Template from "./src/models/template.model.js"; // adjust path if needed
import { DB_NAME } from "./src/constants.js";

dotenv.config();

// ✅ Use same env key as project (your .env has MONGODB_URI, not MONGO_URI)
const MONGO_URI =
  process.env.MONGODB_URI/DB_NAME || "mongodb://127.0.0.1:27017/Finance_Data";

// ✅ Templates with working preview images from picsum.photos
const templates = [
  {
    name: "Template 1 - Modern",
    previewImage: "https://picsum.photos/300/200?random=1",
    sections: [
      {
        type: "hero",
        content: {
          title: "Welcome to Modern Store",
          subtitle: "The best products for your needs",
          backgroundColor: "#f3f4f6",
          textColor: "#111827",
          button: { text: "Shop Now", color: "#3b82f6", shape: "rounded" },
          image: "https://picsum.photos/600/300?random=11",
        },
      },
      {
        type: "products",
        content: {
          title: "Featured Products",
          layout: "grid",
          backgroundColor: "#ffffff",
          products: [
            { name: "Product A", price: "$49", img: "https://picsum.photos/150?random=21" },
            { name: "Product B", price: "$79", img: "https://picsum.photos/150?random=22" },
          ],
        },
      },
      {
        type: "testimonials",
        content: {
          title: "What Customers Say",
          backgroundColor: "#f9fafb",
          list: [
            { name: "Alice", text: "Amazing service!" },
            { name: "Bob", text: "Loved the product quality." },
          ],
        },
      },
    ],
  },
  {
    name: "Template 2 - Minimal",
    previewImage: "https://picsum.photos/300/200?random=2",
    sections: [
      {
        type: "hero",
        content: {
          title: "Minimal Design",
          subtitle: "Clean and simple experience",
          backgroundColor: "#ffffff",
          textColor: "#000000",
          button: { text: "Explore", color: "#10b981", shape: "pill" },
          image: "https://picsum.photos/600/300?random=12",
        },
      },
      {
        type: "products",
        content: {
          title: "Our Collection",
          layout: "list",
          backgroundColor: "#f9fafb",
          products: [
            { name: "Product X", price: "$29", img: "https://picsum.photos/150?random=23" },
            { name: "Product Y", price: "$59", img: "https://picsum.photos/150?random=24" },
          ],
        },
      },
      {
        type: "testimonials",
        content: {
          title: "Client Reviews",
          backgroundColor: "#ffffff",
          list: [
            { name: "Charlie", text: "So neat and minimal!" },
            { name: "Dana", text: "Perfect for my needs." },
          ],
        },
      },
    ],
  },
  {
    name: "Template 3 - Bold",
    previewImage: "https://picsum.photos/300/200?random=3",
    sections: [
      {
        type: "hero",
        content: {
          title: "Go Bold or Go Home",
          subtitle: "Stand out with vibrant designs",
          backgroundColor: "#1f2937",
          textColor: "#f9fafb",
          button: { text: "Get Started", color: "#ef4444", shape: "square" },
          image: "https://picsum.photos/600/300?random=13",
        },
      },
      {
        type: "products",
        content: {
          title: "Hot Picks",
          layout: "carousel",
          backgroundColor: "#111827",
          products: [
            { name: "Bold Shirt", price: "$39", img: "https://picsum.photos/150?random=25" },
            { name: "Bold Shoes", price: "$89", img: "https://picsum.photos/150?random=26" },
          ],
        },
      },
      {
        type: "testimonials",
        content: {
          title: "Fans Love It",
          backgroundColor: "#1f2937",
          list: [
            { name: "Eva", text: "The bold style is amazing!" },
            { name: "Frank", text: "It really pops out." },
          ],
        },
      },
    ],
  },
];

const seed = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB Connected");

    await Template.deleteMany({});
    console.log("🗑️ Old templates removed");

    const response = await Template.insertMany(templates);
    console.log("🌱 Templates seeded successfully", response);

    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Seeding error:", err);
    process.exit(1);
  }
};

seed();






