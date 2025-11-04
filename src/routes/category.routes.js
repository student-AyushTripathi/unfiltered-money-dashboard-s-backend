import express from "express";
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";

const router = express.Router();

// POST /api/v1/categories
router.post("/", createCategory);

// GET /api/v1/categories
router.get("/", getCategories);

// PUT /api/v1/categories/:id
router.put("/:id", updateCategory);

// DELETE /api/v1/categories/:id
router.delete("/:id", deleteCategory);

export default router;
