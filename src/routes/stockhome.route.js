import express from "express";
import {
  getMajorIndices, getMajorIndex, createMajorIndex, updateMajorIndex, deleteMajorIndex,
  getTrendingStocks, getTrendingStock, createTrendingStock, updateTrendingStock, deleteTrendingStock
} from "../controllers/stockhome.controller.js";

const router = express.Router();

router.get("/major-indices", getMajorIndices);
router.get("/major-indices/:id", getMajorIndex);
router.post("/major-indices", createMajorIndex);
router.put("/major-indices/:id", updateMajorIndex);
router.delete("/major-indices/:id", deleteMajorIndex);

router.get("/trending-stocks", getTrendingStocks);
router.get("/trending-stocks/:id", getTrendingStock);
router.post("/trending-stocks", createTrendingStock);
router.put("/trending-stocks/:id", updateTrendingStock);
router.delete("/trending-stocks/:id", deleteTrendingStock);

export default router;