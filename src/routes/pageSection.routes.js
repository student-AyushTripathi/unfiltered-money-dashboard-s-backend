



import express from "express";
import {
  getPageSections,
  createPageSection,
  addStyleOption,
  updateItemsAndStyle,
} from "../controllers/pageSection.controller.js";

const router = express.Router();

// Get all sections (filterable by ?page=blogs&type=blogs)


router.get("/", getPageSections);

// Create new section
router.post("/", createPageSection);

// Add new style option
router.post("/:id/add-style-option", addStyleOption);

// Update items and/or style for a section
router.put("/:id/items", updateItemsAndStyle);



export default router;
