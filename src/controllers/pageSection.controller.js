



// ....................WORKING Code 2........................
import PageSection from "../models/pageSection.model.js";
import Blog from "../models/blog.model.js";
import Category from "../models/category.model.js";

// Helper function to get default layout config
const getDefaultLayoutConfig = (section) => {
  return {
    layout: section.style?.layout || "grid",
    columns:
      section.style?.layout === "list"
        ? 1
        : section.style?.layout === "grid-two"
        ? 2
        : section.style?.columns || 3,
    fontSize: section.style?.fontSize || "16px",
    fontFamily:
      section.style?.fontFamily ||
      (section.styleOptions?.fontFamilies?.[0] || "Poppins"),
    cardShape:
      section.style?.cardShape ||
      (section.styleOptions?.imageShapes?.[0] || "rounded-lg"),
    imageShape:
      section.style?.imageShape ||
      (section.styleOptions?.imageShapes?.[0] || "rounded-t-lg"),
    buttonShape:
      section.style?.buttonShape ||
      (section.styleOptions?.buttonShapes?.[0] || "rounded"),
    buttonPosition:
      section.style?.buttonPosition ||
      (section.styleOptions?.buttonPositions?.[0] || "belowContent"),
    fullWidth: section.style?.fullWidth || false,
    imagePosition:
      section.style?.imagePosition ||
      (section.styleOptions?.imagePositions?.[0] || "top"),
  };
};

// Fetch sections by page
export const getSectionsByPage = async (req, res) => {
  const logPrefix = `[getSectionsByPage] ${new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
  })}`;
  console.log(
    `${logPrefix} Initiating request for page: ${req.params.page}, type: ${req.query.type}, category: ${req.query.category}, status: ${req.query.status}`
  );
  try {
    const { page } = req.params;
    const { type, category, status } = req.query;
    const query = { page, type: type || "blogs", status: status || "active" };
    if (category && category.toLowerCase() !== "all") {
      query["content.category"] = new RegExp(`^${category}$`, "i");
    }

    console.log(`${logPrefix} Querying PageSection with: ${JSON.stringify(query)}`);
    const sections = await PageSection.find(query)
      .populate({
        path: "data.refId",
        model: "Blog",
        select: "title content date status category imageUrl",
      })
      .sort({ order: 1 })
      .lean();

    console.log(`${logPrefix} Found ${sections.length} sections`);

    const output = await Promise.all(
      sections.map(async (section) => {
        let data = section.data
          .filter(
            (item) =>
              item.refId && item.refId._id && item.refId.status === "published"
          )
          .map((item) => {
            const blog = item.refId;
            const categoryName = blog.category?.name || "Uncategorized";
            const sectionOverrides = {
              layout: item.layout,
              columns: item.columns,
              fontSize: item.fontSize,
              fontFamily: item.fontFamily,
              cardShape: item.cardShape,
              imageShape: item.imageShape,
              buttonShape: item.buttonShape,
              buttonPosition: item.buttonPosition,
              fullWidth: item.fullWidth,
              imagePosition: item.imagePosition,
            };
            return {
              refId: blog._id,
              title: blog.title,
              excerpt: blog.content?.substring(0, 100) || "No excerpt",
              imageUrl: blog.imageUrl || "https://via.placeholder.com/300x200",
              date: blog.date,
              category: categoryName,
              order: item.order || 0,
              layoutConfig: { ...getDefaultLayoutConfig(section), ...sectionOverrides },
            };
          })
          .sort((a, b) => (a.order || 0) - (b.order || 0));

        if (data.length === 0) {
          console.log(
            `${logPrefix} No data for section type: ${section.type}, category: ${
              section.content?.category || category || "all"
            }`
          );
          const blogQuery = { status: "published" };
          if (
            category &&
            category.toLowerCase() !== "all" &&
            (section.content?.category || category)
          ) {
            const categoryDoc = await Category.findOne({
              name: section.content?.category || category,
            }).select("_id");
            if (categoryDoc) {
              blogQuery.category = categoryDoc._id;
            } else {
              console.log(
                `${logPrefix} No matching category found for: ${
                  section.content?.category || category
                }`
              );
              return { ...section, data };
            }
          }
          const allBlogs = await Blog.find(blogQuery).lean();
          console.log(`${logPrefix} Fallback blogs found: ${allBlogs.length}`);
          data = allBlogs.map((blog) => {
            const categoryName = blog.category?.name || "Uncategorized";
            return {
              refId: blog._id,
              title: blog.title,
              excerpt: blog.content?.substring(0, 100) || "No excerpt",
              imageUrl: blog.imageUrl || "https://via.placeholder.com/300x200",
              date: blog.date,
              category: categoryName,
              order: blog.order || 0,
              layoutConfig: getDefaultLayoutConfig(section),
            };
          });
        }
        return { ...section, data };
      })
    );

    console.log(`${logPrefix} Response sections: ${output.length}`);
    res.json({ success: true, sections: output });
  } catch (err) {
    console.error(`${logPrefix} Error: ${err.message}`, err);
    res.status(500).json({ message: err.message });
  }
};

// Update items and/or style for a section
// export const updateItemsAndStyle = async (req, res) => {
//   const logPrefix = `[updateItemsAndStyle] ${new Date().toLocaleString("en-IN", {
//     timeZone: "Asia/Kolkata",
//   })}`;
//   console.log(`${logPrefix} Initiating update for section ID: ${req.params.id}`);
//   try {
//     const { id } = req.params;
//     const { data, style } = req.body;

//     const updatePayload = {};
//     if (data) updatePayload.data = data;
//     if (style) updatePayload.style = style;

//     const section = await PageSection.findByIdAndUpdate(id, updatePayload, {
//       new: true,
//       runValidators: true, // Ensure schema validation
//     });

//     if (!section) {
//       console.log(`${logPrefix} Section not found for ID: ${id}`);
//       return res.status(404).json({ message: "Section not found" });
//     }

//     if (style) {
//       const bulkOps = await Blog.find({ status: "published" }).then((blogs) =>
//         blogs.map((blog) => ({
//           updateOne: {
//             filter: { _id: blog._id },
//             update: { $set: { layoutConfig: style, updatedAt: new Date() } },
//           },
//         }))
//       );
//       if (bulkOps.length > 0) await Blog.bulkWrite(bulkOps);
//       console.log(
//         `${logPrefix} Updated layoutConfig for ${bulkOps.length} blogs`
//       );
//     }

//     console.log(
//       `${logPrefix} Successfully updated section: ${JSON.stringify(section)}`
//     );
//     res.json({ success: true, section });
//   } catch (err) {
//     console.error(`${logPrefix} Error: ${err.message}`, err);
//     res.status(500).json({ message: err.message });
//   }
// };

// Create or update a section
export const createOrUpdateSection = async (req, res) => {
  const logPrefix = `[createOrUpdateSection] ${new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
  })}`;
  console.log(`${logPrefix} Initiating create/update for page: ${req.body.page}`);
  try {
    const { id, page, type, content, style, order, status, data } = req.body;
    const payload = {
      page,
      type: type || "blogs",
      content: content || {},
      style: style || {},
      order: order || 0,
      status: status || "active",
      data: data || [],
    };

    let section;
    if (id) {
      section = await PageSection.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
      });
      console.log(`${logPrefix} Updated section ID: ${id}`);
    } else {
      section = await PageSection.create(payload);
      console.log(`${logPrefix} Created new section for page: ${page}`);
    }

    if (!section) {
      return res.status(404).json({ message: "Section not found or creation failed" });
    }

    console.log(
      `${logPrefix} Successfully processed section: ${JSON.stringify(section)}`
    );
    res.json({ success: true, section });
  } catch (err) {
    console.error(`${logPrefix} Error: ${err.message}`, err);
    res.status(err.name === "ValidationError" ? 400 : 500).json({ message: err.message });
  }
};


// import PageSection from "../models/pageSection.model.js";

// Get sections by page/type
export const getPageSections = async (req, res) => {
  try {
    const { page, type } = req.query;

    const filter = {};
    if (page) filter.page = page;
    if (type) filter.type = type;

    const sections = await PageSection.find(filter);
    res.json({ success: true, sections });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create section
export const createPageSection = async (req, res) => {
  try {
    const section = new PageSection(req.body);
    await section.save();
    res.json({ success: true, section });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Add new style option
export const addStyleOption = async (req, res) => {
  try {
    const { id } = req.params;
    const { field, value } = req.body;

    const section = await PageSection.findById(id);
    if (!section) return res.status(404).json({ success: false, message: "Section not found" });

    if (!section.styleOptions[field]) {
      return res.status(400).json({ success: false, message: `Invalid styleOptions field: ${field}` });
    }

    if (!section.styleOptions[field].includes(value)) {
      section.styleOptions[field].push(value);
    }

    await section.save();
    res.json({ success: true, section });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};







//
// Update items and/or style for a section
export const updateItemsAndStyle = async (req, res) => {
  const logPrefix = `[updateItemsAndStyle] ${new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
  })}`;
  console.log(`${logPrefix} Initiating update for section ID: ${req.params.id}`);
  try {
    const { id } = req.params;
    const { data, style } = req.body;

    const updatePayload = {};
    if (data) updatePayload.data = data;
    if (style) updatePayload.style = style;

    const section = await PageSection.findByIdAndUpdate(id, updatePayload, {
      new: true,
      runValidators: true,
    });

    if (!section) {
      console.log(`${logPrefix} Section not found for ID: ${id}`);
      return res.status(404).json({ message: "Section not found" });
    }

    if (style) {
      const bulkOps = await Blog.find({ status: "published" }).then((blogs) =>
        blogs.map((blog) => ({
          updateOne: {
            filter: { _id: blog._id },
            update: { $set: { layoutConfig: style, updatedAt: new Date() } },
          },
        }))
      );
      if (bulkOps.length > 0) await Blog.bulkWrite(bulkOps);
      console.log(`${logPrefix} Updated layoutConfig for ${bulkOps.length} blogs`);
    }

    console.log(`${logPrefix} Successfully updated section: ${JSON.stringify(section)}`);
    res.json({ success: true, section });
  } catch (err) {
    console.error(`${logPrefix} Error: ${err.message}`, err);
    res.status(500).json({ message: err.message });
  }
};
