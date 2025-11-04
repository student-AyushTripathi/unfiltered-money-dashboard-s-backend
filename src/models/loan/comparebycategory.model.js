

// import mongoose from 'mongoose';

// const compareByCategorySchema = new mongoose.Schema({
//   category: { type: String, required: true }, // Matches form's category
//   subCategory: { type: String, required: true }, // Matches form's subCategory
//   bank: { type: String, required: true }, // Matches form's bank (replaces lender1)
//   loanName: { type: String, required: true }, // Matches form's loanName
//   condition: { type: String, required: true }, // Matches form's condition
//   rate: { type: String, required: true }, // Matches form's rate (replaces interestRate1)
//   amount: { type: String, required: true }, // Matches form's amount
//   notes: { type: [String], default: [''] }, // Optional, matches potential notes structure
// });

// export default mongoose.model('CompareByCategory', compareByCategorySchema);







import mongoose from 'mongoose';

const compareByCategorySchema = new mongoose.Schema({
  category: { type: String, required: true }, // Matches form's category
  subCategory: { type: String, required: true }, // Matches form's subCategory
  bank: { type: String, required: true }, // Matches form's bank (replaces lender1)
  loanName: { type: String, required: true }, // Matches form's loanName
  condition: { type: String, required: true }, // Matches form's condition
  rate: { type: String, required: true }, // Matches form's rate (replaces interestRate1)
  amount: { type: String, required: true }, // Matches form's amount
  notes: { type: [String], default: [''] }, // Optional, matches potential notes structure
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

compareByCategorySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model('CompareByCategory', compareByCategorySchema);