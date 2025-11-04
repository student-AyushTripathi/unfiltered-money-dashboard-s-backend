import express from "express";
import {
  getPages,
  getPageBySlug,
  addPage,
  updatePage,
  deletePage,
} from "../controllers/newpage.controller.js";

const router = express.Router();

router.get("/", getPages);
router.get("/:slug", getPageBySlug);
router.post("/", addPage);
router.put("/:id", updatePage);
router.delete("/:id", deletePage);

export default router;