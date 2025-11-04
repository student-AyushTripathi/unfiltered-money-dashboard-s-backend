// src/utils/createAdmin.js
import { User } from "../models/user.model.js";

export const createAdminIfNotExists = async () => {
  const adminEmail = "admin@example.com";

  const existingAdmin = await User.findOne({ email: adminEmail });
  if (!existingAdmin) {
   const newAdmin = new User({
  username: "Admin",
  email: "admin@example.com",
  password: "admin123", // hashed
  role: "admin",
});

    await newAdmin.save();
    console.log("✅ Admin user created.");
  } else {
    console.log("✅ Admin user already exists.");
  }
};
