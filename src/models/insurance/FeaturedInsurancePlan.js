
// import mongoose from "mongoose";

// const featuredInsurancePlanSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   price: { type: String, required: true },
//   duration: { type: String, required: true },
//   features: [{ type: String, required: true }],
//   theme: { type: String, required: true },
//   moreInfo: {
//     description: { type: String, required: true },
//     highlights: [{ type: String, required: true }],
//   },
//   planType: { type: String, required: true },
//   insurer: { type: String, required: true },
//   claimProcess: { type: String, required: true },
//   waitingPeriod: { type: String, required: true },
// });

// const FeaturedInsurancePlan = mongoose.model('FeaturedInsurancePlan', featuredInsurancePlanSchema);
// export default FeaturedInsurancePlan;




import mongoose from "mongoose";

const featuredInsurancePlanSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: String, required: true },
  duration: { type: String, required: true },
  features: [{ type: String, required: true }],
  theme: { type: String, required: true },
  moreInfo: {
    description: { type: String, required: true },
    highlights: [{ type: String, required: true }],
  },
  planType: { type: String, required: true },
  insurer: { type: String, required: true },
  claimProcess: { type: String, required: true },
  waitingPeriod: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

featuredInsurancePlanSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const FeaturedInsurancePlan = mongoose.model('FeaturedInsurancePlan', featuredInsurancePlanSchema);
export default FeaturedInsurancePlan;