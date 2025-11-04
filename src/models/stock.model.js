

// import mongoose from "mongoose";

// const expertPickSchema = new mongoose.Schema({
//   name: { type: String, required: true, unique: true },
//   symbol: { type: String, required: true, unique: true },
//   suggestion: {
//     type: String,
//     enum: ["BUY", "HOLD", "SELL"],
//     required: true,
//   },
//   summary: { type: String, required: true },
//   target: { type: String },
//   stopLoss: { type: String },
//   support: { type: String },
//   resistance: { type: String },
// });

// const ipoTrackerSchema = new mongoose.Schema({
//   name: { type: String, required: true, unique: true },
//   priceBand: { type: String },
//   date: { type: Date, required: true },
//   price: { type: String },
//   change: { type: String },
//   status: {
//     type: String,
//     enum: ["upcoming", "listed"],
//     required: true,
//   },
// });  

// const stockSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true, unique: true },
//     symbol: { type: String, required: true, unique: true },
//     price: { type: Number, required: true },
//     change: { type: Number, required: true },
//     marketCap: { type: String, required: true },
//     pe: { type: Number, required: true },
//     volume: { type: Number, required: true },
//     expertPicks: [expertPickSchema],
//     ipoTracker: [ipoTrackerSchema],
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Stock", stockSchema); 












// import mongoose from "mongoose";

// const expertPickSchema = new mongoose.Schema({
//   name: { type: String, required: true, unique: true },
//   symbol: { type: String, required: true, unique: true },
//   suggestion: {
//     type: String,
//     enum: ["BUY", "HOLD", "SELL"],
//     required: true,
//   },
//   summary: { type: String, required: true },
//   target: { type: String },
//   stopLoss: { type: String },
//   support: { type: String },
//   resistance: { type: String },
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date, default: Date.now },
// });

// expertPickSchema.pre('save', function(next) {
//   this.updatedAt = Date.now();
//   next();
// });

// const ipoTrackerSchema = new mongoose.Schema({
//   name: { type: String, required: true, unique: true },
//   priceBand: { type: String },
//   date: { type: Date, required: true },
//   price: { type: String },
//   change: { type: String },
//   status: {
//     type: String,
//     enum: ["upcoming", "listed"],
//     required: true,
//   },
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date, default: Date.now },
// });

// ipoTrackerSchema.pre('save', function(next) {
//   this.updatedAt = Date.now();
//   next();
// });

// const stockSchema = new mongoose.Schema({
//   name: { type: String, required: true, unique: true },
//   symbol: { type: String, required: true, unique: true },
//   price: { type: Number, required: true },
//   change: { type: Number, required: true },
//   marketCap: { type: String, required: true },
//   pe: { type: Number, required: true },
//   volume: { type: Number, required: true },
//   expertPicks: [expertPickSchema],
//   ipoTracker: [ipoTrackerSchema],
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date, default: Date.now },
// });

// stockSchema.pre('save', function(next) {
//   this.updatedAt = Date.now();
//   next();
// });

// export default mongoose.model("Stock", stockSchema);














import mongoose from "mongoose";

// Stock Schema (independent)
const stockSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  symbol: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  change: { type: Number, required: true },
  marketCap: { type: String, required: true },
  pe: { type: Number, required: true },
  volume: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

stockSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export const Stock = mongoose.model("Stock", stockSchema);

// Expert Pick Schema (independent)
const expertPickSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  symbol: { type: String, required: true, unique: true },
  suggestion: {
    type: String,
    enum: ["BUY", "HOLD", "SELL"],
    required: true,
  },
  summary: { type: String, required: true },
  target: { type: String },
  stopLoss: { type: String },
  support: { type: String },
  resistance: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

expertPickSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export const ExpertPick = mongoose.model("ExpertPick", expertPickSchema);

// IPO Tracker Schema (independent)
const ipoTrackerSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  priceBand: { type: String },
  date: { type: Date, required: true },
  price: { type: String },
  change: { type: String },
  status: {
    type: String,
    enum: ["upcoming", "listed"],
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

ipoTrackerSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export const IPOTracker = mongoose.model("IPOTracker", ipoTrackerSchema);