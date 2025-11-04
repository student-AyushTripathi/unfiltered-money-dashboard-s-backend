

// import Blog from "../models/blog.model.js";
// import mongoose from "mongoose"; // Ensure mongoose is imported

// export const getBlogs = async (req, res) => {
//   const log = (message, level = "info") => {
//     const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata", hour12: true });
//     console[level](`[BlogController] ${timestamp} [${level.toUpperCase()}] ${message}`);
//   };

//   try {
//     const { category, page = 1, limit = 10 } = req.query;
//     log(`Received request with category: ${category}, page: ${page}, limit: ${limit}`, "info");

//     let query = {};
//     if (category) {
//       try {
//         query.category = mongoose.Types.ObjectId(category);
//         log(`Successfully cast category "${category}" to ObjectId`, "debug");
//       } catch (castError) {
//         log(`Failed to cast category "${category}" to ObjectId: ${castError.message}`, "warn");
//         const Category = mongoose.model("Category");
//         const catDoc = await Category.findOne({ name: category });
//         if (catDoc) {
//           query.category = catDoc._id;
//           log(`Found category ID ${catDoc._id} for name "${category}"`, "info");
//         } else {
//           log(`No category found with name "${category}", setting empty query`, "warn");
//           query = {};
//         }
//       }
//     }

//     const skip = (page - 1) * limit;
//     log(`Executing query: ${JSON.stringify(query)}, skip: ${skip}, limit: ${limit}`, "debug");

//     const total = await Blog.countDocuments(query);
//     const blogs = await Blog.find(query)
//       .skip(skip)
//       .limit(Number(limit))
//       .populate("category", "name");

//     const totalPages = Math.ceil(total / limit);

//     log(`Query returned ${blogs.length} blogs, total: ${total}, totalPages: ${totalPages}`, "info");
//     res.json({
//       blogs,
//       totalPages,
//       total,
//     });
//   } catch (error) {
//     log(`Error in getBlogs: ${error.message}`, "error");
//     res.status(500).json({ message: error.message });
//   }
// };

// export const getBlogById = async (req, res) => {
//   try {
//     const blog = await Blog.findById(req.params.id).populate("category", "name");
//     if (!blog) return res.status(404).json({ message: "Blog not found" });
//     res.json(blog);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const createBlog = async (req, res) => {
//   try {
//     const blog = new Blog(req.body);
//     const savedBlog = await blog.save();
//     res.status(201).json(savedBlog);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// export const updateBlog = async (req, res) => {
//   const log = (message, level = "info") => {
//     const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata", hour12: true });
//     console[level](`[BlogController] ${timestamp} [${level.toUpperCase()}] ${message}`);
//   };

//   try {
//     log(`Received update request for blog ID: ${req.params.id}, body: ${JSON.stringify(req.body)}`, "info");
//     const blog = await Blog.findById(req.params.id);
//     if (!blog) return res.status(404).json({ message: "Blog not found" });

//     // Validate and map all required fields
//     const { title, content, author, date, status, category, imageUrl } = req.body;
//     if (!title || !content || !author || !date || !category || !imageUrl) {
//       log("Missing required fields", "warn");
//       return res.status(400).json({ message: "All fields (title, content, author, date, category, imageUrl) are required" });
//     }

//     // Validate category as ObjectId
//     if (!mongoose.Types.ObjectId.isValid(category)) {
//       log(`Invalid category ID "${category}"`, "warn");
//       return res.status(400).json({ message: "Invalid category ID" });
//     }
//     const Category = mongoose.model("Category");
//     const catDoc = await Category.findById(category);
//     if (!catDoc) {
//       log(`No category found with ID "${category}"`, "warn");
//       return res.status(400).json({ message: "Category not found" });
//     }

//     // Validate status
//     if (!["draft", "published"].includes(status)) {
//       log(`Invalid status "${status}"`, "warn");
//       return res.status(400).json({ message: "Status must be 'draft' or 'published'" });
//     }

//     const updateData = { title, content, author, date, status, category, imageUrl };
//     const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, updateData, {
//       new: true,
//       runValidators: true,
//     }).populate("category", "name");

//     log(`Blog updated successfully: ${JSON.stringify(updatedBlog)}`, "info");
//     res.json(updatedBlog);
//   } catch (error) {
//     log(`Error updating blog: ${error.message}`, "error");
//     if (error.name === "ValidationError") {
//       log(`Validation errors: ${JSON.stringify(error.errors)}`, "error");
//       return res.status(400).json({
//         message: "Validation failed",
//         errors: Object.keys(error.errors).reduce((acc, key) => {
//           acc[key] = error.errors[key].message;
//           return acc;
//         }, {}),
//       });
//     }
//     res.status(400).json({ message: error.message });
//   }
// };

// export const deleteBlog = async (req, res) => {
//   try {
//     const blog = await Blog.findByIdAndDelete(req.params.id);
//     if (!blog) return res.status(404).json({ message: "Blog not found" });
//     res.json({ message: "Blog deleted" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };












import Blog from "../models/blog.model.js";
import mongoose from "mongoose";

export const getBlogs = async (req, res) => {
  const log = (message, level = "info") => {
    const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata", hour12: true });
    console[level](`[BlogController] ${timestamp} [${level.toUpperCase()}] ${message}`);
  };

  try {
    const { category, page = 1, limit = 10, from, to } = req.query;
    log(`Received request with category: ${category}, page: ${page}, limit: ${limit}, from: ${from}, to: ${to}`, "info");

    let query = {};
    if (category) {
      try {
        query.category = mongoose.Types.ObjectId(category);
        log(`Successfully cast category "${category}" to ObjectId`, "debug");
      } catch (castError) {
        log(`Failed to cast category "${category}" to ObjectId: ${castError.message}`, "warn");
        const Category = mongoose.model("Category");
        const catDoc = await Category.findOne({ name: category });
        if (catDoc) {
          query.category = catDoc._id;
          log(`Found category ID ${catDoc._id} for name "${category}"`, "info");
        } else {
          log(`No category found with name "${category}", setting empty query`, "warn");
          query = {};
        }
      }
    }

    if (from && to) {
      const fromDate = new Date(from);
      const toDate = new Date(to);
      if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
        log(`Invalid date format - from: ${from}, to: ${to}`, "warn");
        return res.status(400).json({ message: 'Invalid date format' });
      }
      toDate.setHours(23, 59, 59, 999); // Set to end of day for inclusive filtering
      query.createdAt = { $gte: fromDate, $lte: toDate };
      log(`Added date filter - createdAt: ${JSON.stringify(query.createdAt)}`, "debug");
    }

    const skip = (page - 1) * limit;
    log(`Executing query: ${JSON.stringify(query)}, skip: ${skip}, limit: ${limit}`, "debug");

    const total = await Blog.countDocuments(query);
    const blogs = await Blog.find(query)
      .skip(skip)
      .limit(Number(limit))
      .populate("category", "name");

    if (blogs.length === 0 && from && to) {
      log(`No blogs found for date range - from: ${from}, to: ${to}`, "info");
      return res.status(404).json({ message: 'No blogs found for this date range' });
    }

    const totalPages = Math.ceil(total / limit);

    log(`Query returned ${blogs.length} blogs, total: ${total}, totalPages: ${totalPages}`, "info");
    res.json({
      blogs,
      totalPages,
      total,
    });
  } catch (error) {
    log(`Error in getBlogs: ${error.message}`, "error");
    res.status(500).json({ message: error.message });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("category", "name");
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createBlog = async (req, res) => {
  try {
    const blog = new Blog(req.body);
    const savedBlog = await blog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateBlog = async (req, res) => {
  const log = (message, level = "info") => {
    const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata", hour12: true });
    console[level](`[BlogController] ${timestamp} [${level.toUpperCase()}] ${message}`);
  };

  try {
    log(`Received update request for blog ID: ${req.params.id}, body: ${JSON.stringify(req.body)}`, "info");
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    const { title, content, author, date, status, category, imageUrl } = req.body;
    if (!title || !content || !author || !date || !category || !imageUrl) {
      log("Missing required fields", "warn");
      return res.status(400).json({ message: "All fields (title, content, author, date, category, imageUrl) are required" });
    }

    if (!mongoose.Types.ObjectId.isValid(category)) {
      log(`Invalid category ID "${category}"`, "warn");
      return res.status(400).json({ message: "Invalid category ID" });
    }
    const Category = mongoose.model("Category");
    const catDoc = await Category.findById(category);
    if (!catDoc) {
      log(`No category found with ID "${category}"`, "warn");
      return res.status(400).json({ message: "Category not found" });
    }

    if (!["draft", "published"].includes(status)) {
      log(`Invalid status "${status}"`, "warn");
      return res.status(400).json({ message: "Status must be 'draft' or 'published'" });
    }

    const updateData = { title, content, author, date, status, category, imageUrl };
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    }).populate("category", "name");

    log(`Blog updated successfully: ${JSON.stringify(updatedBlog)}`, "info");
    res.json(updatedBlog);
  } catch (error) {
    log(`Error updating blog: ${error.message}`, "error");
    if (error.name === "ValidationError") {
      log(`Validation errors: ${JSON.stringify(error.errors)}`, "error");
      return res.status(400).json({
        message: "Validation failed",
        errors: Object.keys(error.errors).reduce((acc, key) => {
          acc[key] = error.errors[key].message;
          return acc;
        }, {}),
      });
    }
    res.status(400).json({ message: error.message });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json({ message: "Blog deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};