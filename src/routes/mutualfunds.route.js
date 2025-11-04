import express from "express";
import * as mutualFundController from "../controllers/mutualfunds.controller.js";

const router = express.Router();

router.get("/", mutualFundController.getAllMutualFunds);
router.get("/:id", mutualFundController.getMutualFundById);
router.post("/", mutualFundController.createMutualFund);
router.put("/:id", mutualFundController.updateMutualFund);
router.delete("/:id", mutualFundController.deleteMutualFund);

export default router;