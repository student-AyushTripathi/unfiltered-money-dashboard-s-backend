import mongoose from 'mongoose';

const cryptoSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  symbol: { type: String, required: true, unique: true }, // e.g., BTC, ETH
  price: { type: Number, required: true },
  change: { type: String, required: true }, // e.g., "+2.5%" or "-1.3%"
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});


 cryptoSchema.pre('findOneAndUpdate', function(next) {
   this.set({ updatedAt: Date.now() } );
   next();
});

const Crypto = mongoose.model('Crypto', cryptoSchema);
export default Crypto;