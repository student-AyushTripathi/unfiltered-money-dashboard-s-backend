import mongoose from "mongoose";

const mutualFundSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: {
    type: String,
    enum: [
      "Large Cap",
      "Mid Cap",
      "Small Cap",
      "ELSS",
      "Hybrid",
      "Debt",
      "Equity - Mid Cap",
      "Equity - Large Cap",
      "Equity - Small Cap",
      "Equity - Flexi Cap",
      "Equity - Value",
      "Equity - Quant",
      "Sectoral - Technology",
    ],
    required: true,
  },
  returns1Y: { type: String, default: "+0.0%" },
  returns3Y: { type: String, default: "+0.0%" },
  returns5Y: { type: String, default: "+0.0%" },
  risk: {
    type: String,
    enum: ["Low", "Moderate", "High", "Tax Benefit", "Balanced", "Stable Growth", "High Growth", "Aggressive Growth"],
    required: true,
  },
  expenseRatio: { type: String, default: "0.00%" },
  minInvestment: { type: Number, default: 500 },
  fundManager: { type: String },
  aum: { type: String },
  description: { type: String },
  rating: { type: Number, min: 1, max: 5 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("MutualFund", mutualFundSchema);