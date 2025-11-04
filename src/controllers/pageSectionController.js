import PageSection from "../models/PageSection.js";

// Get sections by page + type
export const getPageSections = async (req, res) => {
  try {
    const { page } = req.params;
    const { type, status } = req.query;

    const filter = { page };
    if (type) filter.type = type;
    if (status) filter.status = status;

    const sections = await PageSection.find(filter);
    res.json({ success: true, sections });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Update style for section
export const updatePageSectionItems = async (req, res) => {
  try {
    const { id } = req.params;
    const { style } = req.body;

    const section = await PageSection.findByIdAndUpdate(
      id,
      { style },
      { new: true }
    );

    res.json({ success: true, section });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Add a new style option
export const addStyleOption = async (req, res) => {
  try {
    const { id } = req.params;
    const { field, value } = req.body;

    const section = await PageSection.findById(id);
    if (!section) return res.status(404).json({ success: false, error: "Section not found" });

    if (!section.styleOptions[field].includes(value)) {
      section.styleOptions[field].push(value);
      await section.save();
    }

    res.json({ success: true, section });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Delete a style option
export const deleteStyleOption = async (req, res) => {
  try {
    const { id } = req.params;
    const { field, value } = req.body;

    const section = await PageSection.findById(id);
    if (!section) return res.status(404).json({ success: false, error: "Section not found" });

    section.styleOptions[field] = section.styleOptions[field].filter(
      (item) => item !== value
    );
    await section.save();

    res.json({ success: true, section });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Add style option globally
export const addStyleOptionGlobal = async (req, res) => {
  try {
    const { field, value, excludeId } = req.body;
    const filter = excludeId ? { _id: { $ne: excludeId } } : {};

    const sections = await PageSection.find(filter);
    for (const sec of sections) {
      if (!sec.styleOptions[field].includes(value)) {
        sec.styleOptions[field].push(value);
        await sec.save();
      }
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Delete style option globally
export const deleteStyleOptionGlobal = async (req, res) => {
  try {
    const { field, value, excludeId } = req.body;
    const filter = excludeId ? { _id: { $ne: excludeId } } : {};

    const sections = await PageSection.find(filter);
    for (const sec of sections) {
      sec.styleOptions[field] = sec.styleOptions[field].filter(
        (item) => item !== value
      );
      await sec.save();
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
