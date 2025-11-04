



import Category from "../models/category.model.js";
import Blog from "../models/blog.model.js";
import SectionOrder from "../models/SectionOrder.js";
import slugify from "slugify";

// Logging utility
const log = (message, level = "info") => {
  const timestamp = new Date().toISOString();
  console[level](`[CategoriesController] ${timestamp} ${message}`);
};

// Add Category
export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    log(`Creating category: ${name}`, "info");
    if (!name) {
      log("Name is required", "error");
      return res.status(400).json({ message: "Name is required" });
    }

    const existing = await Category.findOne({ name });
    if (existing) {
      log(`Category already exists: ${name}`, "error");
      return res.status(400).json({ message: "Category already exists" });
    }

    const category = await Category.create({ name, slug: slugify(name) });
    log(`Created category: ${name} (ID: ${category._id})`, "info");

    const sectionOrder = await SectionOrder.findOne({ pageId: "blogs" });
    const sectionId = `${name.toLowerCase().replace(/\s+/g, "-")}-blogs`;
    const newSection = {
      id: sectionId,
      title: `${name} Blogs`,
      order: sectionOrder ? sectionOrder.sections.length : 0,
    };
    if (sectionOrder) {
      if (!sectionOrder.sections.some((s) => s.id === sectionId)) {
        sectionOrder.sections.push(newSection);
        await sectionOrder.save();
        log(`Added section ${sectionId} to blogs SectionOrder`, "info");
      } else {
        log(`Section ${sectionId} already exists in SectionOrder`, "warn");
      }
    } else {
      await SectionOrder.create({ pageId: "blogs", sections: [newSection] });
      log(`Created new SectionOrder for blogs with section: ${sectionId}`, "info");
    }

    res.status(201).json({ message: "Category created successfully", category });
  } catch (error) {
    log(`Server error in createCategory: ${error.message}, stack: ${error.stack}`, "error");
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get All Categories
export const getCategories = async (req, res) => {
  try {
    log("Fetching all categories", "info");
    const categories = await Category.find().sort({ createdAt: -1 });
    log(`Fetched ${categories.length} categories: ${JSON.stringify(categories.map(c => ({ _id: c._id, name: c.name })))}`, "info");
    res.status(200).json({ categories });
  } catch (error) {
    log(`Server error in getCategories: ${error.message}, stack: ${error.stack}`, "error");
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update Category
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    log(`Updating category ID: ${id}`, "info");

    const category = await Category.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );

    if (!category) {
      log(`Category not found: ${id}`, "error");
      return res.status(404).json({ message: "Category not found" });
    }

    log(`Updated category: ${name} (ID: ${id})`, "info");
    res.status(200).json({ message: "Category updated successfully", category });
  } catch (error) {
    log(`Server error in updateCategory for ID: ${id}: ${error.message}, stack: ${error.stack}`, "error");
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete Category
export const deleteCategory = async (req, res) => {
  const id = req.params.id;
  try {
    log(`Deleting category ID: ${id}`, "info");

    const category = await Category.findById(id);
    if (!category) {
      log(`Category not found: ${id}`, "error");
      return res.status(404).json({ message: "Category not found" });
    }

    await Category.findByIdAndDelete(id);
    log(`Deleted category: ${category.name} (ID: ${id})`, "info");

    const deletedBlogs = await Blog.deleteMany({ category: category._id });
    log(`Deleted ${deletedBlogs.deletedCount} blogs for category ID: ${category._id}`, "info");

    const sectionOrder = await SectionOrder.findOne({ pageId: "blogs" });
    if (sectionOrder) {
      const sectionIdToRemove = `${category.name.toLowerCase().replace(/\s+/g, "-")}-blogs`;
      const legacySectionId = category.name.toLowerCase().replace(/\s+/g, "-");
      const updatedSections = sectionOrder.sections.filter(
        (section) => section.id !== sectionIdToRemove && section.id !== legacySectionId
      );
      updatedSections.forEach((section, index) => { section.order = index; });
      sectionOrder.sections = updatedSections;
      await sectionOrder.save();
      log(`Updated section order for blogs, removed section: ${sectionIdToRemove} or ${legacySectionId}`, "info");
    } else {
      await SectionOrder.create({ pageId: "blogs", sections: [] });
      log("No section order found for pageId: blogs - created empty", "warn");
    }

    res.status(200).json({ message: "Category and associated blogs deleted successfully" });
  } catch (error) {
    log(`Server error in deleteCategory for ID: ${id}: ${error.message}, stack: ${error.stack}`, "error");
    res.status(500).json({ message: "Server error", error: error.message });
  }
};