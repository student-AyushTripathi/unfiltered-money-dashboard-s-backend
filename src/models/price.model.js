// import mongoose from 'mongoose';

// const priceSchema = new mongoose.Schema({
//   metal: String,
//   prices: {
//     '1D': Number,
//     '1W': Number,
//     '1M': Number,
//     '1Y': Number,
//     '5Y': Number,
//     'Max': Number,
//   },
//   city: String,
//   updatedAt: { type: Date, default: Date.now },
// });

// export default mongoose.model('Price', priceSchema);






import mongoose from 'mongoose';

const priceSchema = new mongoose.Schema({
  metal: String,
  prices: {
    '1D': Number,
    '1W': Number,
    '1M': Number,
    '1Y': Number,
    '5Y': Number,
    'Max': Number,
  },
  city: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

priceSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model('Price', priceSchema);