
// routes/template.routes.js
import express from "express";
import upload from "../middlewares/upload.js"
import {
  getTemplates,
  getTemplateById,
  createTemplate,
  updateTemplate,
  deleteTemplate,
  uploadFile,
  updateAndCreatePage,
} from "../controllers/template.controller.js";

const router = express.Router();

// CRUD
router.get("/", getTemplates);
router.get("/:id", getTemplateById);
router.post("/", createTemplate);
router.put("/:id", updateTemplate);
router.delete("/:id", deleteTemplate);

// File upload (local /uploads)
router.post("/upload", upload.single("file"), uploadFile);

// Update + Create page
router.post("/:id/update-and-create-page", updateAndCreatePage);

export default router;











