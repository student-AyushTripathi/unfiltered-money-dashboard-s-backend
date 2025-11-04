
import mongoose from 'mongoose';

const fdSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  logo: { type: String, required: true, unique: true }, // URL or path to logo
  interestRate: { type: Number, required: true },
  minDeposit: { type: Number, required: true },
  tenure: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

fdSchema.pre('save', function(next) {  
  this.updatedAt = Date.now(); 
  next(); 
}); 

const FD = mongoose.model('FD', fdSchema); 
export default FD;  