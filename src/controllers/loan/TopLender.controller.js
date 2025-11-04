// // controllers/topLenderController.js
// import TopLender from '../../models/loan/toplender.model.js';


// export const getAllTopLenders = async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 10;
//     const skip = (page - 1) * limit;
//     const lenders = await TopLender.find().skip(skip).limit(limit);
//     const total = await TopLender.countDocuments();
//     const totalPages = Math.ceil(total / limit);
//     res.json({ lenders, totalPages });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const createTopLender = async (req, res) => {
//   const { name, interestRate, tenure, features, description, notes } = req.body;
//   const lender = new TopLender({ name, interestRate, tenure, features, description, notes });
//   try {
//     const savedLender = await lender.save();
//     res.status(201).json(savedLender);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// export const getTopLenderById = async (req, res) => {
//   try {
//     const lender = await TopLender.findById(req.params.id);
//     if (!lender) return res.status(404).json({ message: 'Lender not found' });
//     res.json(lender);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const updateTopLender = async (req, res) => {
//   try {
//     const lender = await TopLender.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
//     if (!lender) return res.status(404).json({ message: 'Lender not found' });
//     res.json(lender);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// export const deleteTopLender = async (req, res) => {
//   try {
//     const lender = await TopLender.findByIdAndDelete(req.params.id);
//     if (!lender) return res.status(404).json({ message: 'Lender not found' });
//     res.json({ message: 'Lender deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };









import TopLender from '../../models/loan/toplender.model.js';

export const getAllTopLenders = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    let { from, to } = req.query;
    let query = TopLender.find();
    if (from && to) {
      from = new Date(from);
      to = new Date(to);
      to.setHours(23, 59, 59, 999); // Set to end of day for inclusive filtering
      query = query.where('createdAt').gte(from).lte(to);
    }
    const lenders = await query.skip(skip).limit(limit);
    const total = await TopLender.countDocuments(query.getFilter());
    const totalPages = Math.ceil(total / limit);
    res.json({ lenders, totalPages });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createTopLender = async (req, res) => {
  const { name, interestRate, tenure, features, description, notes } = req.body;
  const lender = new TopLender({ name, interestRate, tenure, features, description, notes });
  try {
    const savedLender = await lender.save();
    res.status(201).json(savedLender);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getTopLenderById = async (req, res) => {
  try {
    const lender = await TopLender.findById(req.params.id);
    if (!lender) return res.status(404).json({ message: 'Lender not found' });
    res.json(lender);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTopLender = async (req, res) => {
  try {
    const lender = await TopLender.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!lender) return res.status(404).json({ message: 'Lender not found' });
    res.json(lender);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteTopLender = async (req, res) => {
  try {
    const lender = await TopLender.findByIdAndDelete(req.params.id);
    if (!lender) return res.status(404).json({ message: 'Lender not found' });
    res.json({ message: 'Lender deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};