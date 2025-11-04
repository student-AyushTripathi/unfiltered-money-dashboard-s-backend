import mongoose from "mongoose";

const navlinkSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    path: {
      type: String,
      // required: true,
      trim: true,
    },
    active: {
      type: Boolean,
      default: true, // toggle on/off navbar
    },
    order: {
      type: Number,
      default: 0, // for sorting links
    },


    templateType: { 
      type: String,
      enum: ['home', 'insurance', 'investment', 'credit-card', 'personal-loan', 'dynamic'], 
      default: 'dynamic',
    }, 


    
  },
  { timestamps: true }  
);

 const Navlink = mongoose.model("Navlink", navlinkSchema);
export default Navlink;