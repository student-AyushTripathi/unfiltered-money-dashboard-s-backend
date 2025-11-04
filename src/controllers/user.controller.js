
// };


// controllers/adminAuth.js
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

// 🔐 Admin Login Controller Only
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await User.findOne({ email, role: "admin" });

    if (!admin) {
      return res.status(401).json({ message: "Admin not found or invalid role" });
    }

    const isMatch = await admin.isPasswordCorrect(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: admin._id, role: "admin" }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

 res.status(200).json({
  message: "Login successful",
  token,
  admin: {
    id: admin._id,
    email: admin.email,
    username: admin.username, // ✅ send this
  },
});

  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
