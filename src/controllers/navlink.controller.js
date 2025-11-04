

import Navlink from "../models/navlink.model.js";
import Newpage from "../models/newpage.model.js"; // Import Newpage model for auto-creation

// Allowed template types
const VALID_TEMPLATE_TYPES = [
  "home",
  "insurance",
  "investment",
  "credit-card",
  "personal-loan",
  "dynamic",
];

// ✅ Get all navlinks (only active if client-side navbar)
export const getNavlinks = async (req, res) => {
  try {
    const links = await Navlink.find().sort({ order: 1, createdAt: -1 });
    res.status(200).json({ success: true, data: links });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching navlinks", error: err.message });
  }
};

// ✅ Add navlink
export const addNavlink = async (req, res) => {
  try {
    const { name, path, order, active = true, templateType } = req.body;

    // Validate inputs
    if (!name || !path || order === undefined) {
      return res.status(400).json({ success: false, message: "Name, path, and order are required" });
    }
    if (!/^[a-zA-Z0-9-_/]+$/.test(path.replace(/^\/+/, ""))) {
      return res.status(400).json({ success: false, message: "Path can only contain letters, numbers, hyphens, and slashes" });
    }
    if (!Number.isInteger(Number(order)) || order < 0) {
      return res.status(400).json({ success: false, message: "Order must be a non-negative integer" });
    }
    if (!VALID_TEMPLATE_TYPES.includes(templateType)) {
      return res.status(400).json({ success: false, message: `Template type must be one of: ${VALID_TEMPLATE_TYPES.join(", ")}` });
    }

    // Ensure path starts with /
    const formattedPath = path.startsWith("/") ? path : `/${path}`;

    // Check duplicates (name or path)
    const existing = await Navlink.findOne({ $or: [{ name }, { path: formattedPath }] });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: `Navlink with this ${existing.name === name ? "name" : "path"} already exists`,
      });
    }

    const navlink = new Navlink({ name, path: formattedPath, order, active, templateType });
    await navlink.save();

    // Auto-create Newpage for dynamic navlinks
    if (templateType === "dynamic") {
      const pageData = {
        slug: formattedPath.slice(1), // Remove leading / for slug
        title: name,
        sections: [
          { type: "hero", data: { heading: "", subheading: "", backgroundImage: "" } },
          { type: "products", data: { sectionHeading: "", products: [] } },
          { type: "testimonials", data: { sectionHeading: "", testimonials: [] } },
        ],
        active: true,
        navlinkId: navlink._id,
      };
      const existingPage = await Newpage.findOne({ slug: pageData.slug });
      if (existingPage) {
        // Roll back navlink creation if page creation fails
        await Navlink.findByIdAndDelete(navlink._id);
        return res.status(400).json({ success: false, message: "A page with this slug already exists" });
      }
      await new Newpage(pageData).save();
    }

    res.status(201).json({ success: true, data: navlink });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error adding navlink", error: err.message });
  }
};

// ✅ Update navlink
export const updateNavlink = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, path, order, active = true, templateType } = req.body;

    // Validate inputs
    if (!name || !path || order === undefined) {
      return res.status(400).json({ success: false, message: "Name, path, and order are required" });
    }
    if (!/^[a-zA-Z0-9-_/]+$/.test(path.replace(/^\/+/, ""))) {
      return res.status(400).json({ success: false, message: "Path can only contain letters, numbers, hyphens, and slashes" });
    }
    if (!Number.isInteger(Number(order)) || order < 0) {
      return res.status(400).json({ success: false, message: "Order must be a non-negative integer" });
    }
    if (!VALID_TEMPLATE_TYPES.includes(templateType)) {
      return res.status(400).json({ success: false, message: `Template type must be one of: ${VALID_TEMPLATE_TYPES.join(", ")}` });
    }

    // Ensure path starts with /
    const formattedPath = path.startsWith("/") ? path : `/${path}`;

    // Check duplicates (name or path, excluding current navlink)
    const existing = await Navlink.findOne({
      $or: [{ name }, { path: formattedPath }],
      _id: { $ne: id },
    });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: `Navlink with this ${existing.name === name ? "name" : "path"} already exists`,
      });
    }

    const updated = await Navlink.findByIdAndUpdate(
      id,
      { name, path: formattedPath, order, active, templateType },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ success: false, message: "Navlink not found" });
    }

    // Update associated Newpage if templateType is dynamic
    if (templateType === "dynamic") {
      const page = await Newpage.findOne({ navlinkId: id });
      if (page) {
        page.slug = formattedPath.slice(1);
        page.title = name;
        page.active = active;
        await page.save();
      }
    }

    res.status(200).json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error updating navlink", error: err.message });
  }
};

// ✅ Delete navlink
export const deleteNavlink = async (req, res) => {
  try {
    const { id } = req.params;
    const navlink = await Navlink.findById(id);
    if (!navlink) {
      return res.status(404).json({ success: false, message: "Navlink not found" });
    }

    // Delete associated Newpage if dynamic
    if (navlink.templateType === "dynamic") {
      await Newpage.findOneAndDelete({ navlinkId: id });
    }

    await Navlink.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Navlink deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error deleting navlink", error: err.message });
  }
};