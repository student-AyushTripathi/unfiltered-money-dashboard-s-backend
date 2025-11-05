

// import dotenv from "dotenv";
// dotenv.config({ path: "./.env" });

// import connectDB from "./db/index.js";
// import { app } from "./app.js";
// import { createAdminIfNotExists } from "./utils/createAdmin.utils.js";

// connectDB() 
//   .then(async () => {
//     await createAdminIfNotExists(); // seed admin user
//     app.listen(process.env.PORT || 8000, () => {
//       console.log(`⚙️ Server is running on port ${process.env.PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.log("❌ MongoDB connection failed:", err);
//   });










import dotenv from "dotenv";
// dotenv.config({ path: "./.env" });
dotenv.config();


import connectDB from "./db/index.js";
import { app } from "./app.js";
import { createAdminIfNotExists } from "./utils/createAdmin.utils.js";

// Connect DB before requests
await connectDB();
await createAdminIfNotExists();

// ✅ Export app for Vercel instead of running a persistent server
export default app;

