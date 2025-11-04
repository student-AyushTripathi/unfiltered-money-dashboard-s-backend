
// controllers/exploreInsuranceController.js
import ExploreInsuranceOption from '../../models/insurance/ExploreInsuranceOption.js';

export const getAll = async (req, res) => {
  const { page = 1, limit = 10, from, to } = req.query;
  try {
    let query = ExploreInsuranceOption.find();
    if (from && to) {
      const fromDate = new Date(from);
      const toDate = new Date(to);
      toDate.setHours(23, 59, 59, 999);
      query = query.where('createdAt').gte(fromDate).lte(toDate);
    }
    const options = await query
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await ExploreInsuranceOption.countDocuments(query.getFilter());
    res.json({ options, totalPages: Math.ceil(count / limit), currentPage: page });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getById = async (req, res) => {
  try {
    const option = await ExploreInsuranceOption.findById(req.params.id);
    if (!option) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(option);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const create = async (req, res) => {
  const option = new ExploreInsuranceOption(req.body);
  try {
    const newOption = await option.save();
    res.status(201).json(newOption);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const update = async (req, res) => {
  try {
    const option = await ExploreInsuranceOption.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(option);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteFunction = async (req, res) => {
  try {
    await ExploreInsuranceOption.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};