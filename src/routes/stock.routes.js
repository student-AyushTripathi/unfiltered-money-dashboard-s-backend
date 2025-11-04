// import express from "express";
// import {
//   createStock,
//   getAllStocks,
//   getStockById,
//   updateStock,
//   deleteStock,
  
// } from "../controllers/stock.controller.js";

// const router = express.Router();

// router.post("/", createStock);
// router.get("/", getAllStocks);
// router.get("/:id", getStockById);
// router.put("/:id", updateStock);
// router.delete("/:id", deleteStock);


// export default router;



import express from "express";
import {
  createStock,
  getAllStocks,
  getStockById,
  updateStock,
  deleteStock,
  createExpertPick,
  getAllExpertPicks,
  getExpertPickById,
  updateExpertPick,
  deleteExpertPick,
  createIPOTracker,
  getAllIPOTrackers,
  getIPOTrackerById,
  updateIPOTracker,
  deleteIPOTracker,
} from "../controllers/stock.controller.js";

const router = express.Router();



// Expert Picks Routes
router.post("/expert-picks", createExpertPick);
router.get("/expert-picks", getAllExpertPicks);
router.get("/expert-picks/:id", getExpertPickById);
router.put("/expert-picks/:id", updateExpertPick);
router.delete("/expert-picks/:id", deleteExpertPick);

// IPO Tracker Routes
router.post("/ipo-tracker", createIPOTracker);
router.get("/ipo-tracker", getAllIPOTrackers);
router.get("/ipo-tracker/:id", getIPOTrackerById);
router.put("/ipo-tracker/:id", updateIPOTracker);
router.delete("/ipo-tracker/:id", deleteIPOTracker);


// Stock Routes
router.post("/", createStock);
router.get("/", getAllStocks);
router.get("/:id", getStockById);
router.put("/:id", updateStock);
router.delete("/:id", deleteStock);

export default router;