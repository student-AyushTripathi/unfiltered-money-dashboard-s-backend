

import { Stock, ExpertPick, IPOTracker } from "../models/stock.model.js";

// Stock CRUD Operations
export const createStock = async (req, res) => {
  try {
    const stock = new Stock(req.body);
    await stock.save();
    res.status(201).json(stock);
  } catch (err) {
    console.log("Stock creation error:", err);
    res.status(400).json({ error: err.message });
  }
};

export const getAllStocks = async (req, res) => {
  try {
    const { page = 1, limit = 10, from, to } = req.query;
    let query = Stock.find();
    if (from && to) {
      const fromDate = new Date(from);
      let toDate = new Date(to);
      toDate.setHours(23, 59, 59, 999); // Inclusive end of day
      query = query.where('createdAt').gte(fromDate).lte(toDate);
    }
    const stocks = await query.skip((page - 1) * limit).limit(parseInt(limit)).exec();
    const total = await Stock.countDocuments(from && to ? { createdAt: { $gte: new Date(from), $lte: new Date(to) } } : {});
    res.json({ stocks, total });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getStockById = async (req, res) => {
  try {
    const stock = await Stock.findById(req.params.id);
    if (!stock) return res.status(404).json({ error: "Stock not found" });
    res.json(stock);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateStock = async (req, res) => {
  try {
    const stock = await Stock.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(stock);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteStock = async (req, res) => {
  try {
    await Stock.findByIdAndDelete(req.params.id);
    res.json({ message: "Stock deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Expert Picks Operations
export const createExpertPick = async (req, res) => {
  try {
    const expertPick = new ExpertPick(req.body);
    await expertPick.save();
    res.status(201).json(expertPick);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllExpertPicks = async (req, res) => {
  try {
    const { page = 1, limit = 10, from, to } = req.query;
    let query = ExpertPick.find();
    if (from && to) {
      const fromDate = new Date(from);
      let toDate = new Date(to);
      toDate.setHours(23, 59, 59, 999); // Inclusive end of day
      query = query.where('createdAt').gte(fromDate).lte(toDate);
    }
    const expertPicks = await query.skip((page - 1) * limit).limit(parseInt(limit)).exec();
    const total = await ExpertPick.countDocuments(from && to ? { createdAt: { $gte: new Date(from), $lte: new Date(to) } } : {});
    res.json({ expertPicks, total });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getExpertPickById = async (req, res) => {
  try {
    const expertPick = await ExpertPick.findById(req.params.id);
    if (!expertPick) return res.status(404).json({ error: "Expert pick not found" });
    res.json(expertPick);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateExpertPick = async (req, res) => {
  try {
    const expertPick = await ExpertPick.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(expertPick);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteExpertPick = async (req, res) => {
  try {
    await ExpertPick.findByIdAndDelete(req.params.id);
    res.json({ message: "Expert pick deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// IPO Tracker Operations
export const createIPOTracker = async (req, res) => {
  try {
    const ipoTracker = new IPOTracker(req.body);
    await ipoTracker.save();
    res.status(201).json(ipoTracker);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllIPOTrackers = async (req, res) => {
  try {
    const { page = 1, limit = 10, from, to } = req.query;
    let query = IPOTracker.find();
    if (from && to) {
      const fromDate = new Date(from);
      let toDate = new Date(to);
      toDate.setHours(23, 59, 59, 999); // Inclusive end of day
      query = query.where('createdAt').gte(fromDate).lte(toDate);
    }
    const ipoTrackers = await query.skip((page - 1) * limit).limit(parseInt(limit)).exec();
    const total = await IPOTracker.countDocuments(from && to ? { createdAt: { $gte: new Date(from), $lte: new Date(to) } } : {});
    res.json({ ipoTrackers, total });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getIPOTrackerById = async (req, res) => {
  try {
    const ipoTracker = await IPOTracker.findById(req.params.id);
    if (!ipoTracker) return res.status(404).json({ error: "IPO not found" });
    res.json(ipoTracker);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateIPOTracker = async (req, res) => {
  try {
    const ipoTracker = await IPOTracker.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(ipoTracker);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteIPOTracker = async (req, res) => {
  try {
    await IPOTracker.findByIdAndDelete(req.params.id);
    res.json({ message: "IPO deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};