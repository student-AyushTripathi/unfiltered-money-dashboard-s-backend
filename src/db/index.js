// import mongoose from "mongoose";
// import { DB_NAME } from "../constants.js";


// const connectDB=async()=>{
    
//     try {
//         const connectionInstance=await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//         console.log(`\n MONGODB connected!!DB HOST:${connectionInstance.connection.host}`);
        
//     } catch (error) {
//         console.log("MONGODB connnection error",error);
//         process.exit(1);
        
//     }
// }
// export default connectDB









import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // ✅ Directly use the connection string from .env
    const connectionInstance = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(
      `✅ MongoDB connected successfully! Host: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
