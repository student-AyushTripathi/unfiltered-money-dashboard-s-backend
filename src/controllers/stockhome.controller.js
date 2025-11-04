




import { MajorIndices, TrendingStocks } from '../models/stockhome.model.js';

export const getMajorIndices = async (req, res) => {
  try {
    let { from, to } = req.query;
    let query = MajorIndices.find();
    if (from && to) {
      from = new Date(from);
      to = new Date(to);
      to.setHours(23, 59, 59, 999); // Set to end of day for inclusive filtering
      query = query.where('createdAt').gte(from).lte(to);
      console.log(`Filtering Major Indices from ${from} to ${to}`);
    } else {
      console.log("Fetching all Major Indices");
    }
    const indices = await query.exec();
    console.log("Fetched Major Indices:", indices);
    if (indices.length === 0 && from && to) {
      console.log("No Major Indices found in the selected date range");
    }
    res.json(indices);
  } catch (error) {
    console.error("Error in getMajorIndices:", error.message, error.stack);
    res.status(500).json({ message: error.message });
  }
};

export const getMajorIndex = async (req, res) => {
  try {
    const index = await MajorIndices.findById(req.params.id);
    if (!index) return res.status(404).json({ message: "Index not found" });
    res.json(index);
  } catch (error) {
    console.error("Error in getMajorIndex:", error.message, error.stack);
    res.status(500).json({ message: error.message });
  }
};

export const createMajorIndex = async (req, res) => {
  process.stdout.write("Entered createMajorIndex function\n"); // Force log to stdout
  const { category, name, price, change } = req.body || {};
  if (!req.body) {
    process.stderr.write("No request body received\n");
    return res.status(400).json({ message: "No data provided" });
  }
  process.stdout.write(`Received request body for createMajorIndex: ${JSON.stringify(req.body)}\n`);
  const index = new MajorIndices({ category, name, price, change });
  if (!index) {
    process.stderr.write("Failed to create Mongoose document\n");
    return res.status(500).json({ message: "Internal server error" });
  }
  process.stdout.write(`Mongoose document before save: ${JSON.stringify(index.toObject())}\n`);
  try {
    const savedIndex = await index.save();
    process.stdout.write(`Saved Major Index document: ${JSON.stringify(savedIndex)}\n`);
    res.status(201).json(savedIndex);
  } catch (error) {
    process.stderr.write(`Error in createMajorIndex: ${error.message}\n${error.stack}\n`);
    res.status(400).json({ message: error.message });
  }
};

export const updateMajorIndex = async (req, res) => {
  try {
    const { category, name, price, change } = req.body;
    const updatedIndex = await MajorIndices.findByIdAndUpdate(req.params.id, { category, name, price, change }, { new: true });
    if (!updatedIndex) return res.status(404).json({ message: "Index not found" });
    console.log("Updated Major Index:", updatedIndex);
    res.json(updatedIndex);
  } catch (error) {
    console.error("Error in updateMajorIndex:", error.message, error.stack);
    res.status(400).json({ message: error.message });
  }
};

export const deleteMajorIndex = async (req, res) => {
  try {
    const deletedIndex = await MajorIndices.findByIdAndDelete(req.params.id);
    if (!deletedIndex) return res.status(404).json({ message: "Index not found" });
    console.log("Deleted Major Index with ID:", req.params.id);
    res.json({ message: "Index deleted successfully" });
  } catch (error) {
    console.error("Error in deleteMajorIndex:", error.message, error.stack);
    res.status(500).json({ message: error.message });
  }
};

export const getTrendingStocks = async (req, res) => {
  try {
    let { from, to } = req.query;
    let query = TrendingStocks.find();
    if (from && to) {
      from = new Date(from);
      to = new Date(to);
      to.setHours(23, 59, 59, 999); // Set to end of day for inclusive filtering
      query = query.where('createdAt').gte(from).lte(to);
      console.log(`Filtering Trending Stocks from ${from} to ${to}`);
    } else {
      console.log("Fetching all Trending Stocks");
    }
    const stocks = await query.exec();
    console.log("Fetched Trending Stocks:", stocks);
    if (stocks.length === 0 && from && to) {
      console.log("No Trending Stocks found in the selected date range");
    }
    res.json(stocks);
  } catch (error) {
    console.error("Error in getTrendingStocks:", error.message, error.stack);
    res.status(500).json({ message: error.message });
  }
};

export const getTrendingStock = async (req, res) => {
  try {
    const stock = await TrendingStocks.findById(req.params.id);
    if (!stock) return res.status(404).json({ message: "Stock not found" });
    res.json(stock);
  } catch (error) {
    console.error("Error in getTrendingStock:", error.message, error.stack);
    res.status(500).json({ message: error.message });
  }
};

export const createTrendingStock = async (req, res) => {
  const { category, name, price, change, volume, peRatio, marketCap } = req.body;
  console.log("Received request body for createTrendingStock:", req.body);
  const stock = new TrendingStocks({ category, name, price, change, volume, peRatio, marketCap });
  console.log("Mongoose document schema options:", TrendingStocks.schema.options); // Verify timestamps option
  console.log("Mongoose document before save:", stock.toObject());
  try {
    const savedStock = await stock.save(); // Explicitly enforce timestamps
    console.log("Saved Trending Stock document:", savedStock);
    res.status(201).json(savedStock);
  } catch (error) {
    console.error("Error in createTrendingStock:", error.message, error.stack);
    res.status(400).json({ message: error.message });
  }
};

export const updateTrendingStock = async (req, res) => {
  try {
    const updatedStock = await TrendingStocks.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedStock) return res.status(404).json({ message: "Stock not found" });
    console.log("Updated Trending Stock:", updatedStock);
    res.json(updatedStock);
  } catch (error) {
    console.error("Error in updateTrendingStock:", error.message, error.stack);
    res.status(400).json({ message: error.message });
  }
};

export const deleteTrendingStock = async (req, res) => {
  try {
    const deletedStock = await TrendingStocks.findByIdAndDelete(req.params.id);
    if (!deletedStock) return res.status(404).json({ message: "Stock not found" });
    console.log("Deleted Trending Stock with ID:", req.params.id);
    res.json({ message: "Stock deleted successfully" });
  } catch (error) {
    console.error("Error in deleteTrendingStock:", error.message, error.stack);
    res.status(500).json({ message: error.message });
  }
};