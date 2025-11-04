

// src/controllers/page.controller.js
import Template from "../models/template.model.js";
import Page from "../models/page.model.js";
import Navlink from "../models/navlink.model.js"; // adjust path if needed
import path from "path";


// Add this new function for attaching navlink and activating page
export const updatePageNavlink = async (req, res) => {
  try {
    const { id } = req.params;
    const { navLinkId, active } = req.body;
    const updatedPage = await Page.findByIdAndUpdate(
      id,
      { navLinkId, active },
      { new: true }
    );
    if (!updatedPage) {
      return res.status(404).json({ message: "Page not found" });
    }
    res.json({ message: "Page updated successfully", page: updatedPage });
  } catch (err) {
    res.status(500).json({ message: "Error updating page", error: err.message });
  }
};

// Existing function (assuming it exists for fetching by navlink)
export const getPageByNavlink = async (req, res) => {
  try {
    const { navLinkId } = req.params;
    const page = await Page.findOne({ navLinkId, active: true }).populate("templateId");
    if (!page) {
      return res.status(404).json({ message: "Page not found for this navlink" });
    }
    res.json(page);
  } catch (err) {
    res.status(500).json({ message: "Error fetching page", error: err.message });
  }
};

/**
 * Utility: map uploaded files into request body
 * Example: product[0].image -> sections[index].content.products[0].image
 */
const mapFilesToSections = (sections, files) => {
  if (!files || files.length === 0) return sections;

  files.forEach((file) => {
    // Multer gives fieldname like "products[0][image]" or "reviews[1][image]"
    const field = file.fieldname; // e.g. "products[0][image]"
    const filePath = `/uploads/${file.filename}`;

    sections = sections.map((section) => {
      if (field.startsWith("products")) {
        const match = field.match(/products\[(\d+)\]\[(\w+)\]/);
        if (match) {
          const [_, idx, key] = match;
          if (section.content?.products?.[idx]) {
            section.content.products[idx][key] = filePath;
          }
        }
      } else if (field.startsWith("reviews")) {
        const match = field.match(/reviews\[(\d+)\]\[(\w+)\]/);
        if (match) {
          const [_, idx, key] = match;
          if (section.content?.reviews?.[idx]) {
            section.content.reviews[idx][key] = filePath;
          }
        }
      } else {
        // fallback: heroImage, testimonialImage, previewImage
        section.content = { ...section.content, [field]: filePath };
      }
      return section;
    });
  });

  return sections;
};

// ✅ update full page sections (used in PageBuilder)
export const updatePageSections = async (req, res) => {
  try {
    const { pageId } = req.params;
    let { sections } = req.body;

    // Parse sections if coming from form-data as string
    if (typeof sections === "string") {
      sections = JSON.parse(sections);
    }

    // Attach file uploads into sections
    sections = mapFilesToSections(sections, req.files);

    const page = await Page.findById(pageId);
    if (!page) return res.status(404).json({ message: "Page not found" });

    page.sections = sections;
    await page.save();

    res.json({ message: "Page sections updated", page });
  } catch (err) {
    console.error("updatePageSections error:", err);
    res.status(500).json({ message: err.message });
  }
};

// ✅ Create page from template and optionally attach to a navlink
export const createPageFromTemplate = async (req, res) => {
  try {
    const { navLinkId, templateId, title } = req.body;

    const template = await Template.findById(templateId);
    if (!template) return res.status(404).json({ message: "Template not found" });

    let sections = template.sections.map((s) => ({
      type: s.type,
      content: s.content || {},
      active: true,
    }));

    // Handle uploaded files
    sections = mapFilesToSections(sections, req.files);

    const page = new Page({
      navLinkId: navLinkId || null,
      templateId,
      sections,
      active: false, // default newly created page is inactive
      title: title || template.name,
    });

    await page.save();

    // optionally attach page id to Navlink
    if (navLinkId) {
      const nav = await Navlink.findById(navLinkId);
      if (nav) {
        // nav.pageId = page._id; // uncomment if needed
        // await nav.save();
      }
    }

    return res.status(201).json(page);
  } catch (err) {
    console.error("createPageFromTemplate error:", err);
    return res.status(500).json({ message: err.message });
  }
};

// ✅ Get single page by id (for preview)
export const getPageById = async (req, res) => {
  try {
    const { pageId } = req.params;
    const page = await Page.findById(pageId).populate("templateId");
    if (!page) return res.status(404).json({ message: "Page not found" });
    res.json(page);
  } catch (err) {
    console.error("getPageById error:", err);
    res.status(500).json({ message: err.message });
  }
};


// ✅ Update section content (merge strategy)
export const updateSectionContent = async (req, res) => {
  try {
    const { pageId, sectionId } = req.params;
    let { content, push } = req.body;

    if (typeof content === "string") content = JSON.parse(content);
    if (typeof push === "string") push = JSON.parse(push);

    const page = await Page.findById(pageId);
    if (!page) return res.status(404).json({ message: "Page not found" });

    const section = page.sections.id(sectionId);
    if (!section) return res.status(404).json({ message: "Section not found" });

    if (content && typeof content === "object") {
      section.content = { ...section.content, ...content };
    }

    if (push && typeof push === "object") {
      for (const key of Object.keys(push)) {
        const val = push[key];
        if (Array.isArray(val)) {
          if (!Array.isArray(section.content[key])) section.content[key] = [];
          section.content[key].push(...val);
        } else {
          section.content[key] = val;
        }
      }
    }

    // Attach uploaded files into this section
    if (req.files && req.files.length > 0) {
      const wrapped = [{ content: section.content, type: section.type }];
      const updated = mapFilesToSections(wrapped, req.files);
      section.content = updated[0].content;
    }

    await page.save();
    res.json({ message: "Section updated", section });
  } catch (err) {
    console.error("updateSectionContent error:", err);
    res.status(500).json({ message: err.message });
  }
};

// ✅ Toggle a section active/inactive
export const toggleSection = async (req, res) => {
  try {
    const { pageId, sectionId } = req.params;
    const page = await Page.findById(pageId);
    if (!page) return res.status(404).json({ message: "Page not found" });

    const section = page.sections.id(sectionId);
    if (!section) return res.status(404).json({ message: "Section not found" });

    section.active = !section.active;
    await page.save();
    res.json({ message: "Section toggled", section });
  } catch (err) {
    console.error("toggleSection error:", err);
    res.status(500).json({ message: err.message });
  }
};

// ✅ Toggle whole page active/inactive
export const togglePage = async (req, res) => {
  try {
    const { pageId } = req.params;
    const page = await Page.findById(pageId);
    if (!page) return res.status(404).json({ message: "Page not found" });

    page.active = !page.active;
    await page.save();
    res.json({ message: "Page toggled", page });
  } catch (err) {
    console.error("togglePage error:", err);
    res.status(500).json({ message: err.message });
  }
};

// ✅ List pages
export const listPages = async (req, res) => {
  try {
    const pages = await Page.find().populate("templateId");
    res.json(pages);
  } catch (err) {
    console.error("listPages error:", err);
    res.status(500).json({ message: err.message });
  }
};
