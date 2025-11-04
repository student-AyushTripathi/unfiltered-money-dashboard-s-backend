

// import CompareByCategory from '../../models/loan/comparebycategory.model.js';


// export const getAllCompareByCategories = async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 10;
//     const skip = (page - 1) * limit;
//     const category = req.query.category;
//     const subCategory = req.query.subCategory;
//     let query = CompareByCategory.find();
//     if (category) query = query.where('category').equals(category);
//     if (subCategory) query = query.where('subCategory').equals(subCategory);
//     const categories = await query.skip(skip).limit(limit);
//     const total = await CompareByCategory.countDocuments(query.getFilter());
//     const totalPages = Math.ceil(total / limit);
//     res.json({ categories, totalPages });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const createCompareByCategory = async (req, res) => {
//   const { category, subCategory, bank, loanName, condition, rate, amount, notes } = req.body;
//   console.log('Received data for creation:', req.body); // Debug log
//   const categoryItem = new CompareByCategory({ category, subCategory, bank, loanName, condition, rate, amount, notes });
//   try {
//     const savedCategory = await categoryItem.save();
//     console.log('Saved Category:', { _id: savedCategory._id, category: savedCategory.category, subCategory: savedCategory.subCategory, bank: savedCategory.bank }); // Debug log
//     res.status(201).json(savedCategory);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// export const getCompareByCategoryById = async (req, res) => {
//   try {
//     const category = await CompareByCategory.findById(req.params.id);
//     if (!category) return res.status(404).json({ message: 'Category not found' });
//     res.json(category);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const updateCompareByCategory = async (req, res) => {
//   try {
//     const category = await CompareByCategory.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
//     if (!category) return res.status(404).json({ message: 'Category not found' });
//     res.json(category);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// export const deleteCompareByCategory = async (req, res) => {
//   try {
//     const category = await CompareByCategory.findByIdAndDelete(req.params.id);
//     if (!category) return res.status(404).json({ message: 'Category not found' });
//     res.json({ message: 'Category deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };







import CompareByCategory from '../../models/loan/comparebycategory.model.js';

export const getAllCompareByCategories = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const category = req.query.category;
    const subCategory = req.query.subCategory;
    let { from, to } = req.query;
    let query = CompareByCategory.find();
    if (category) query = query.where('category').equals(category);
    if (subCategory) query = query.where('subCategory').equals(subCategory);
    if (from && to) {
      from = new Date(from);
      to = new Date(to);
      to.setHours(23, 59, 59, 999); // Set to end of day for inclusive filtering
      query = query.where('createdAt').gte(from).lte(to);
    }
    const categories = await query.skip(skip).limit(limit);
    const total = await CompareByCategory.countDocuments(query.getFilter());
    const totalPages = Math.ceil(total / limit);
    res.json({ categories, totalPages });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createCompareByCategory = async (req, res) => {
  const { category, subCategory, bank, loanName, condition, rate, amount, notes } = req.body;
  console.log('Received data for creation:', req.body); // Debug log
  const categoryItem = new CompareByCategory({ category, subCategory, bank, loanName, condition, rate, amount, notes });
  try {
    const savedCategory = await categoryItem.save();
    console.log('Saved Category:', { _id: savedCategory._id, category: savedCategory.category, subCategory: savedCategory.subCategory, bank: savedCategory.bank }); // Debug log
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getCompareByCategoryById = async (req, res) => {
  try {
    const category = await CompareByCategory.findById(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCompareByCategory = async (req, res) => {
  try {
    const category = await CompareByCategory.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteCompareByCategory = async (req, res) => {
  try {
    const category = await CompareByCategory.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};