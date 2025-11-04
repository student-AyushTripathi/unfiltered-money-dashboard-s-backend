// import CreditCard from '../models/creditcard.model.js';



// // Get all credit cards with pagination
// export const getCreditCards = async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 10;
//     const skip = (page - 1) * limit;

//     const creditCards = await CreditCard.find().skip(skip).limit(limit);
//     const total = await CreditCard.countDocuments();

//     res.json({
//       creditCards,
//       totalPages: Math.ceil(total / limit),
//       currentPage: page,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get single credit card by ID
// export const getCreditCardById = async (req, res) => {
//   try {
//     const creditCard = await CreditCard.findById(req.params.id);
//     if (!creditCard) return res.status(404).json({ message: 'Credit card not found' });
//     res.json(creditCard);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Create new credit card
// export const createCreditCard = async (req, res) => {
//   try {
//     const creditCard = new CreditCard(req.body);
//     await creditCard.save();
//     res.status(201).json(creditCard);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // Update credit card
// export const updateCreditCard = async (req, res) => {
//   try {
//     const creditCard = await CreditCard.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//       runValidators: true,
//     });
//     if (!creditCard) return res.status(404).json({ message: 'Credit card not found' });
//     res.json(creditCard);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // Delete credit card
// export const deleteCreditCard = async (req, res) => {
//   try {
//     const creditCard = await CreditCard.findByIdAndDelete(req.params.id);
//     if (!creditCard) return res.status(404).json({ message: 'Credit card not found' });
//     res.json({ message: 'Credit card deleted' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };









import CreditCard from '../models/creditcard.model.js';

// Get all credit cards with pagination
export const getCreditCards = async (req, res) => {
  try {
    const { page = 1, limit = 10, from, to } = req.query;
    let query = CreditCard.find();
    if (from && to) {
      const fromDate = new Date(from);
      let toDate = new Date(to);
      toDate.setHours(23, 59, 59, 999); // Inclusive end of day
      query = query.where('createdAt').gte(fromDate).lte(toDate);
      console.log(`Filtering Credit Cards from ${from} to ${to} (inclusive)`);
    } else {
      console.log("Fetching all Credit Cards");
    }
    const creditCards = await query.skip((page - 1) * limit).limit(parseInt(limit)).exec();
    const total = await CreditCard.countDocuments(from && to ? { createdAt: { $gte: new Date(from), $lte: new Date(to) } } : {});
    res.json({
      creditCards,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error("Error in getCreditCards:", error.message, error.stack);
    res.status(500).json({ message: error.message });
  }
};

// Get single credit card by ID
export const getCreditCardById = async (req, res) => {
  try {
    const creditCard = await CreditCard.findById(req.params.id);
    if (!creditCard) return res.status(404).json({ message: 'Credit card not found' });
    res.json(creditCard);
  } catch (error) {
    console.error("Error in getCreditCardById:", error.message, error.stack);
    res.status(500).json({ message: error.message });
  }
};

// Create new credit card
export const createCreditCard = async (req, res) => {
  try {
    const creditCard = new CreditCard(req.body);
    await creditCard.save();
    res.status(201).json(creditCard);
  } catch (error) {
    console.error("Error in createCreditCard:", error.message, error.stack);
    res.status(400).json({ message: error.message });
  }
};

// Update credit card
export const updateCreditCard = async (req, res) => {
  try {
    const creditCard = await CreditCard.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!creditCard) return res.status(404).json({ message: 'Credit card not found' });
    res.json(creditCard);
  } catch (error) {
    console.error("Error in updateCreditCard:", error.message, error.stack);
    res.status(400).json({ message: error.message });
  }
};

// Delete credit card
export const deleteCreditCard = async (req, res) => {
  try {
    const creditCard = await CreditCard.findByIdAndDelete(req.params.id);
    if (!creditCard) return res.status(404).json({ message: 'Credit card not found' });
    res.json({ message: 'Credit card deleted' });
  } catch (error) {
    console.error("Error in deleteCreditCard:", error.message, error.stack);
    res.status(500).json({ message: error.message });
  }
};