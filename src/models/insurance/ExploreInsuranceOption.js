// // models/ExploreInsuranceOption.js
// import mongoose from 'mongoose';

// const exploreInsuranceOptionSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   subtitle: { type: String, required: true },
//   coverage: { type: String, required: true },
//   premium: { type: String, required: true },
//   tenure: { type: String, required: true },
//   extra: { type: String, required: true },
//   description: { type: String, required: true },
//   eligibility: { type: String, required: true },
//   claimProcess: { type: String, required: true },
//   inclusions: { type: String, required: true },
//   exclusions: { type: String, required: true },
// });

//  const ExploreInsuranceOption = mongoose.model('ExploreInsuranceOption', exploreInsuranceOptionSchema);
//  export default ExploreInsuranceOption;





// models/ExploreInsuranceOption.js
import mongoose from 'mongoose';

const exploreInsuranceOptionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  coverage: { type: String, required: true },
  premium: { type: String, required: true },
  tenure: { type: String, required: true },
  extra: { type: String, required: true },
  description: { type: String, required: true },
  eligibility: { type: String, required: true },
  claimProcess: { type: String, required: true },
  inclusions: { type: String, required: true },
  exclusions: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

exploreInsuranceOptionSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const ExploreInsuranceOption = mongoose.model('ExploreInsuranceOption', exploreInsuranceOptionSchema);
export default ExploreInsuranceOption;