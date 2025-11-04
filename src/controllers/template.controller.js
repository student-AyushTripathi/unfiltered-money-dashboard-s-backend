

// controllers/template.controller.js
import Template from "../models/template.model.js";
// import Page from "../models/page.model.js";



// Add this helper at top of template.controller.js (after imports)
const deepMerge = (target, source) => {
  if (typeof target !== 'object' || target === null || typeof source !== 'object' || source === null) {
    return source;
  }
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      if (typeof source[key] === 'object' && source[key] !== null && !Array.isArray(source[key])) {
        target[key] = deepMerge(target[key] || {}, source[key]);
      } else if (Array.isArray(source[key])) {
        target[key] = source[key];  // Overwrite arrays like products/reviews
      } else {
        target[key] = source[key];
      }
    }
  }
  return target;
};




// ✅ Upload route handler (multer saves, return file URL)
export const uploadFile = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  res.json({ url: `/uploads/${req.file.filename}` });
};

// ✅ Get all templates
export const getTemplates = async (req, res) => {
  try {
    const templates = await Template.find();
    res.json(templates);
  } catch {
    res.status(500).json({ message: "Failed to fetch templates" });
  }
};

// ✅ Get single template
export const getTemplateById = async (req, res) => {
  try {
    const tpl = await Template.findById(req.params.id);
    if (!tpl) return res.status(404).json({ message: "Template not found" });
    res.json(tpl);
  } catch {
    res.status(500).json({ message: "Failed to fetch template" });
  }
};

// ✅ Create template
export const createTemplate = async (req, res) => {
  try {
    const template = new Template(req.body);
    await template.save();
    res.status(201).json(template);
  } catch (err) {
    res.status(500).json({ message: "Failed to create template", error: err.message });
  }
};

// ✅ Update template
export const updateTemplate = async (req, res) => {
  try {
    const updated = await Template.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Template not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to update template", error: err.message });
  }
};

// ✅ Delete template
export const deleteTemplate = async (req, res) => {
  try {
    await Template.findByIdAndDelete(req.params.id);
    res.json({ message: "Template deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete template", error: err.message });
  }
};

// // ✅ Update template copy & create Page
// export const updateAndCreatePage = async (req, res) => {
//   try {
//     const { id } = req.params; // templateId
//     const { sections } = req.body;

//     const template = await Template.findById(id);
//     if (!template) return res.status(404).json({ message: "Template not found" });

//     // merge template.sections with frontend edits
//     const mergedSections = template.sections.map((s, idx) => ({
//       type: s.type,
//       content: {
//         ...s.content.toObject?.() || s.content,
//         ...(sections?.[idx] || {}),
//       },
//       active: true,
//     }));

//     const newPage = new Page({
//       templateId: template._id,
//       name: `${template.name} Page`,
//       sections: mergedSections,
//       active: false,
//     });

//     await newPage.save();
//     res.status(201).json({ message: "✅ Page created", page: newPage });
//   } catch (err) {
//     res.status(500).json({ message: "Failed to create page", error: err.message });
//   }
// };




// Main function
export const updateAndCreatePage = async (req, res) => {
  try {
    const { id } = req.params;
    const { sections: frontendSections } = req.body;

    console.log("🔍 Received frontend sections:", JSON.stringify(frontendSections, null, 2));  // Debug log

    const template = await Template.findById(id);
    if (!template) return res.status(404).json({ message: "Template not found" });

    // Validate sections length
    if (frontendSections && frontendSections.length !== template.sections.length) {
      console.warn("⚠️ Sections length mismatch! Template:", template.sections.length, "Frontend:", frontendSections.length);
      return res.status(400).json({ message: "Sections mismatch - check order" });
    }

    // Deep merge sections
    const mergedSections = template.sections.map((s, idx) => {
      const frontendContent = (frontendSections?.[idx]?.content || {});
      console.log(`Merging section ${idx} (${s.type}):`, { templateContent: s.content, frontendContent });  // Per-section debug

      const mergedContent = { ...s.content.toObject() };
      deepMerge(mergedContent, frontendContent);  // Deep merge for nested data

      // Clean unused fields based on section type
      if (s.type === "hero") {
        delete mergedContent.products;
        delete mergedContent.reviews;
      } else if (s.type === "products") {
        delete mergedContent.reviews;
        // Keep products (no delete)
      } else if (s.type === "testimonials") {
        delete mergedContent.products;
        // Keep reviews (no delete)
      }

      return {
        type: s.type,
        content: mergedContent,
        active: true,  // Force active
      };
    });

    console.log("💾 Final merged sections:", JSON.stringify(mergedSections, null, 2));  // Final debug

    const newPage = new Page({
      templateId: template._id,
      name: `${template.name} Page - ${new Date().toISOString().split('T')[0]}`,
      sections: mergedSections,
      active: true,
    });

    await newPage.save();
    console.log("✅ Page saved with ID:", newPage._id);

    res.status(201).json({ message: "✅ Page created", page: newPage });
  } catch (err) {
    console.error("❌ updateAndCreatePage error:", err);
    res.status(500).json({ message: "Failed to create page", error: err.message });
  }
};