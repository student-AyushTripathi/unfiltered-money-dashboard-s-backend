// import mongoose from 'mongoose';

// const creditCardSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   issuer: { type: String, required: true },
//   type: { type: String, required: true },
//   joining_fee: { type: Number, required: true },
//   annual_fee: { type: Number, required: true },
//   fee_waiver: { type: String, required: true },
//   reward_structure: { type: [String], required: true },
//   benefits: { type: [String], required: true },
//   image: { type: String, required: true },
//   bestFor: { type: String, required: true },
//   iconColor: { type: String, default: 'bg-blue-100' },
//   buttonColor: { type: String, default: 'bg-blue-600' },
//   tagColor: { type: String, default: 'bg-blue-100 text-blue-800' },
// }, { timestamps: true });

// const CreditCard = mongoose.model('CreditCard', creditCardSchema);

// export default CreditCard;






import mongoose from 'mongoose';

const creditCardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  issuer: { type: String, required: true },
  type: { type: String, required: true },
  joining_fee: { type: Number, required: true },
  annual_fee: { type: Number, required: true },
  fee_waiver: { type: String, required: true },
  reward_structure: { type: [String], required: true },
  benefits: { type: [String], required: true },
  image: { type: String, required: true },
  bestFor: { type: String, required: true },
  iconColor: { type: String, default: 'bg-blue-100' },
  buttonColor: { type: String, default: 'bg-blue-600' },
  tagColor: { type: String, default: 'bg-blue-100 text-blue-800' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

creditCardSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const CreditCard = mongoose.model('CreditCard', creditCardSchema);

export default CreditCard;