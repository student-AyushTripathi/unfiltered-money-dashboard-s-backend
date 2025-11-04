// // models/TopLender.js
// import mongoose from 'mongoose';

// const topLenderSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   interestRate: { type: String, required: true },
//   tenure: { type: String, required: true },
//   features: { type: String, required: true },
//   description: { type: String, required: true },
//   notes: { type: [String], default: [''] },
// });

// export default mongoose.model('TopLender', topLenderSchema);








import mongoose from 'mongoose';

const topLenderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  interestRate: { type: String, required: true },
  tenure: { type: String, required: true },
  features: { type: String, required: true },
  description: { type: String, required: true },
  notes: { type: [String], default: [''] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

topLenderSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model('TopLender', topLenderSchema);