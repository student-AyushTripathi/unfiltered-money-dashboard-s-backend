// import MutualFund from "../models/mutualfunds.model.js"


// export const getAllMutualFunds = async (req, res) => {
//   try {
//     const { category, page = 1, limit = 10 } = req.query;
//     const query = category ? { category } : {};
//     const skip = (page - 1) * limit;

//     const total = await MutualFund.countDocuments(query);
//     const mutualFunds = await MutualFund.find(query)
//       .skip(skip)
//       .limit(Number(limit));

//     const totalPages = Math.ceil(total / limit);

//     res.status(200).json({
//       mutualFunds,
//       totalPages,
//       total,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
// export const getMutualFundById = async (req, res) => {
//   try {
//     const mutualFund = await MutualFund.findById(req.params.id);
//     if (!mutualFund) return res.status(404).json({ message: "Mutual fund not found" });
//     res.status(200).json(mutualFund);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
// export const createMutualFund = async (req, res) => {
//   const mutualFund = new MutualFund(req.body);
//   try {
//     const savedMutualFund = await mutualFund.save();
//     res.status(201).json(savedMutualFund);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };
// export const updateMutualFund = async (req, res) => {
//   try {
//     const mutualFund = await MutualFund.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
//     if (!mutualFund) return res.status(404).json({ message: "Mutual fund not found" });
//     res.status(200).json(mutualFund);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };
// export const deleteMutualFund = async (req, res) => {
//   try {
//     const mutualFund = await MutualFund.findByIdAndDelete(req.params.id);
//     if (!mutualFund) return res.status(404).json({ message: "Mutual fund not found" });
//     res.status(200).json({ message: "Mutual fund deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// }; 








import MutualFund from "../models/mutualfunds.model.js";

export const getAllMutualFunds = async (req, res) => {
  try {
    const { category, page = 1, limit = 10, fromDate, toDate } = req.query;
    const query = category ? { category } : {};

    // Add date range filter if provided
    if (fromDate && toDate) {
      const from = new Date(fromDate);
      const to = new Date(toDate);
      to.setHours(23, 59, 59, 999);
      query.$or = [
        { createdAt: { $gte: from, $lte: to } },
        { updatedAt: { $gte: from, $lte: to } },
      ];
    } else if (fromDate) {
      query.$or = [
        { createdAt: { $gte: new Date(fromDate) } },
        { updatedAt: { $gte: new Date(fromDate) } },
      ];
    } else if (toDate) {
      const to = new Date(toDate);
      to.setHours(23, 59, 59, 999);
      query.$or = [
        { createdAt: { $lte: to } },
        { updatedAt: { $lte: to } },
      ];
    }

    const skip = (page - 1) * limit;
    const total = await MutualFund.countDocuments(query);
    const mutualFunds = await MutualFund.find(query)
      .skip(skip)
      .limit(Number(limit));

    const totalPages = Math.ceil(total / limit);

    res.status(200).json({
      mutualFunds,
      totalPages,
      total,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getMutualFundById = async (req, res) => {
  try {
    const mutualFund = await MutualFund.findById(req.params.id);
    if (!mutualFund) return res.status(404).json({ message: "Mutual fund not found" });
    res.status(200).json(mutualFund);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const createMutualFund = async (req, res) => {
  const mutualFund = new MutualFund(req.body);
  try {
    const savedMutualFund = await mutualFund.save();
    res.status(201).json(savedMutualFund);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const updateMutualFund = async (req, res) => {
  try {
    const mutualFund = await MutualFund.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!mutualFund) return res.status(404).json({ message: "Mutual fund not found" });
    res.status(200).json(mutualFund);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const deleteMutualFund = async (req, res) => {
  try {
    const mutualFund = await MutualFund.findByIdAndDelete(req.params.id);
    if (!mutualFund) return res.status(404).json({ message: "Mutual fund not found" });
    res.status(200).json({ message: "Mutual fund deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};










