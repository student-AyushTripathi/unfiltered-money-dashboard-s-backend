// import express from "express";
// import { registerUser, loginUser, getAllUsers, deleteUser, updateUser } from "../controllers/user.controller.js";
// const router = express.Router();

// router.post("/register", registerUser);
// router.post("/login", loginUser);
// router.get("/all", getAllUsers);
// router.delete("/:id", deleteUser);
// router.put("/:id", updateUser);

// export default router;

import express from "express";
import {

  loginAdmin,
} from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middlewares.js"; // ✅ Import

const router = express.Router();

// ❌ Public routes

router.post("/login", loginAdmin);

// ✅ Protected routes


export default router;
