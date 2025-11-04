

// import Page from "../models/newpage.model.js";

// export const getPages = async (req, res) => {
//   try {
//     const pages = await Page.find();
//     res.json(pages);
//   } catch (err) {
//     res.status(500).json({ message: "Error fetching pages", error: err.message });
//   }
// };

// export const getPageBySlug = async (req, res) => {
//   try {
//     const { slug } = req.params;
//     const page = await Page.findOne({ slug });
//     if (!page) {
//       return res.status(404).json({ message: "Page not found" });
//     }
//     res.json(page);
//   } catch (err) {
//     res.status(500).json({ message: "Error fetching page", error: err.message });
//   }
// };

// export const addPage = async (req, res) => {
//   try {
//     const { slug, title, body, image } = req.body;
//     const existing = await Page.findOne({ slug });
//     if (existing) {
//       return res.status(400).json({ message: "Page with this slug already exists" });
//     }
//     const page = new Page({ slug, title, body, image });
//     await page.save();
//     res.status(201).json({ success: true, data: page });
//   } catch (err) {
//     res.status(500).json({ message: "Error adding page", error: err.message });
//   }
// };

// export const updatePage = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updated = await Page.findByIdAndUpdate(id, req.body, { new: true });
//     if (!updated) {
//       return res.status(404).json({ message: "Page not found" });
//     }
//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ message: "Error updating page", error: err.message });
//   }
// };

// export const deletePage = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deleted = await Page.findByIdAndDelete(id);
//     if (!deleted) {
//       return res.status(404).json({ message: "Page not found" });
//     }
//     res.json({ message: "Page deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ message: "Error deleting page", error: err.message });
//   }
// };










import Newpage from "../models/newpage.model.js";

export const getPages = async (req, res) => {
  try {
    const pages = await Newpage.find().populate("navlinkId");
    res.json(pages);
  } catch (err) {
    res.status(500).json({ message: "Error fetching pages", error: err.message });
  }
};

export const getPageBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const page = await Newpage.findOne({ slug }).populate("navlinkId");
    if (!page) {
      return res.status(404).json({ message: "Page not found" });
    }
    res.json(page);
  } catch (err) {
    res.status(500).json({ message: "Error fetching page", error: err.message });
  }
};

export const addPage = async (req, res) => {
  try {
    const { slug, sections, active, navlinkId } = req.body;
    const existing = await Newpage.findOne({ slug });
    if (existing) {
      return res.status(400).json({ message: "Page with this slug already exists" });
    }
    const page = new Newpage({ slug, sections, active: active ?? true, navlinkId });
    await page.save();
    res.status(201).json({ success: true, data: page });
  } catch (err) {
    res.status(500).json({ message: "Error adding page", error: err.message });
  }
};

export const updatePage = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Newpage.findByIdAndUpdate(id, req.body, { new: true }).populate("navlinkId");
    if (!updated) {
      return res.status(404).json({ message: "Page not found" });
    }
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating page", error: err.message });
  }
};

export const deletePage = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Newpage.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Page not found" });
    }
    res.json({ message: "Page deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting page", error: err.message });
  }
};