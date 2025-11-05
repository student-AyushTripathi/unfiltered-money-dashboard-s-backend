

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

// routes import
import cryptoRoutes from "./routes/crypto.routes.js";
import blogRoutes from "./routes/blog.route.js";
import userRouter from "./routes/user.routes.js";
import priceRouter from "./routes/price.routes.js";
import fdRoutes from "./routes/fd.routes.js";
import stockRoutes from "./routes/stock.routes.js";
import creditCardRoutes from "./routes/creditcard.route.js";
import exploreInsuranceRoutes from "./routes/insurance/exploreInsuranceRoutes.js";
import featuredInsuranceRoutes from "./routes/insurance/featuredInsuranceRoutes.js";
// import insuranceCalculatorRoutes from "./routes/insurance/insuranceCalculatorRoutes.js";
import personalLoanRoutes from "./routes/loan.routes.js";
import mutualFundRoutes from "./routes/mutualfunds.route.js";
import stockhomeRoutes from "./routes/stockhome.route.js";
import sectionOrderRoutes from "./routes/sectionOrders.js";
import categoryRouter from "./routes/category.routes.js";
import pageSectionRoutes from "./routes/pageSection.routes.js";
import navlinkRoutes from "./routes/navlink.routes.js";
import templateRoutes from "./routes/template.route.js";
// import pageRoutes from "./routes/page.route.js";
import uploadRoutes from "./routes/upload.route.js"
import newpageRoutes from "./routes/newpage.route.js"

const app = express();

// ✅ Middlewares
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// ✅ resolve __dirname for ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Serve uploads folder statically
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// Go one level up from /src to reach project root, then into /uploads
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
// app.use("/uploads", express.static("uploads"));

// ✅ Router declarations
app.use("/api/v1/users", userRouter);
app.use("/api/v1/categories", categoryRouter);
// app.use("/api/v1/destination", destinationRouter)
app.use("/api/v1/prices", priceRouter);
app.use("/api/v1", fdRoutes);
app.use("/api/v1", cryptoRoutes);
app.use("/api/v1/stocks", stockRoutes);
app.use("/api/credit-cards", creditCardRoutes);
app.use("/api", personalLoanRoutes);

// insurance-page-routes
app.use("/api/explore-insurance-options", exploreInsuranceRoutes);
app.use("/api/featured-insurance-plans", featuredInsuranceRoutes);
// app.use("/api/insurance-calculators", insuranceCalculatorRoutes);

app.use("/api/v1/blogs", blogRoutes);
app.use("/api/v1/mutual-funds", mutualFundRoutes); 
app.use("/api/v1/stockhome", stockhomeRoutes);
app.use("/api/v1/page-section", pageSectionRoutes);
app.use("/api/navlinks", navlinkRoutes);
// newly added
app.use("/api/pages", newpageRoutes); 


// ✅ templates & pages
app.use("/api/templates", templateRoutes);
// app.use("/api/pages", pageRoutes); 
app.use("/api/upload", uploadRoutes);

try {
  app.use("/api/v1/section-orders", sectionOrderRoutes);
  console.log("✅ Section order routes mounted successfully");
} catch (error) {
  console.error("❌ Failed to mount section order routes:", error.message);
}

app.get("/", (req, res) => {
  res.send("✅ Backend is live and working!");
});

export { app };






