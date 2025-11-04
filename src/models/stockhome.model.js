



import mongoose from 'mongoose';

const majorIndicesSchema = new mongoose.Schema({
  category: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  change: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

majorIndicesSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const trendingStocksSchema = new mongoose.Schema({
  category: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  change: { type: String, required: true },
  volume: { type: Number, required: true },
  peRatio: { type: Number, required: true },
  marketCap: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

trendingStocksSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

export const MajorIndices = mongoose.model('MajorIndices', majorIndicesSchema);
export const TrendingStocks = mongoose.model('TrendingStocks', trendingStocksSchema);