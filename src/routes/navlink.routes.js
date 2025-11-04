import express from "express";
import {
  getNavlinks,
  addNavlink,
  updateNavlink,
  deleteNavlink,
} from "../controllers/navlink.controller.js";

const router = express.Router();

router.get("/", getNavlinks);
router.post("/", addNavlink);
router.put("/:id", updateNavlink);
router.delete("/:id", deleteNavlink);

export default router;
