




import express from "express";
import { pageUpload } from "../middlewares/upload.js";

const router = express.Router();

router.post("/", pageUpload, (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: "No files uploaded" });
  }

  const files = req.files.map((file) => ({
    fieldName: file.fieldname,
    // url: `/uploads/${file.filename}`,
    url: `${req.protocol}://${req.get("host")}/uploads/${file.filename}`,

  }));

  res.json({
    message: "Files uploaded successfully",
    files,
  });
});

export default router;

