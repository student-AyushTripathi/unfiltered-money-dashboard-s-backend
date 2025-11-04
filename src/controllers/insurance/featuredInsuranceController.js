
import FeaturedInsurancePlan from '../../models/insurance/FeaturedInsurancePlan.js';

export const getAll = async (req, res) => {
  const { page = 1, limit = 10, from, to } = req.query;
  try {
    let query = FeaturedInsurancePlan.find();
    if (from && to) {
      const fromDate = new Date(from);
      const toDate = new Date(to);
      toDate.setHours(23, 59, 59, 999);
      query = query.where('createdAt').gte(fromDate).lte(toDate);
    }
    const plans = await query
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await FeaturedInsurancePlan.countDocuments(query.getFilter());
    res.json({ plans, totalPages: Math.ceil(count / limit), currentPage: page });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const create = async (req, res) => {
  const { title, price, duration, features, theme, moreInfo, planType, insurer, claimProcess, waitingPeriod } = req.body;

  // Validate required fields
  if (!title || !price || !duration || !features || !theme || !moreInfo?.description || !moreInfo?.highlights || !planType || !insurer || !claimProcess || !waitingPeriod) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  if (!Array.isArray(features) || features.length === 0) {
    return res.status(400).json({ message: 'Features must be a non-empty array' });
  }
  if (!Array.isArray(moreInfo.highlights) || moreInfo.highlights.length === 0) {
    return res.status(400).json({ message: 'Highlights must be a non-empty array' });
  }

  const plan = new FeaturedInsurancePlan({
    title,
    price,
    duration,
    features,
    theme,
    moreInfo: {
      description: moreInfo.description,
      highlights: moreInfo.highlights,
    },
    planType,
    insurer,
    claimProcess,
    waitingPeriod,
  });

  try {
    const newPlan = await plan.save();
    res.status(201).json(newPlan);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const update = async (req, res) => {
  const { title, price, duration, features, theme, moreInfo, planType, insurer, claimProcess, waitingPeriod } = req.body;

  // Validate required fields
  if (!title || !price || !duration || !features || !theme || !moreInfo?.description || !moreInfo?.highlights || !planType || !insurer || !claimProcess || !waitingPeriod) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  if (!Array.isArray(features) || features.length === 0) {
    return res.status(400).json({ message: 'Features must be a non-empty array' });
  }
  if (!Array.isArray(moreInfo.highlights) || moreInfo.highlights.length === 0) {
    return res.status(400).json({ message: 'Highlights must be a non-empty array' });
  }

  try {
    const plan = await FeaturedInsurancePlan.findByIdAndUpdate(
      req.params.id,
      {
        title,
        price,
        duration,
        features,
        theme,
        moreInfo: {
          description: moreInfo.description,
          highlights: moreInfo.highlights,
        },
        planType,
        insurer,
        claimProcess,
        waitingPeriod,
      },
      { new: true }
    );
    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }
    res.json(plan);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteFunction = async (req, res) => {
  try {
    const plan = await FeaturedInsurancePlan.findByIdAndDelete(req.params.id);
    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getById = async (req, res) => {
  try {
    const plan = await FeaturedInsurancePlan.findById(req.params.id);
    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }
    res.json(plan);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};