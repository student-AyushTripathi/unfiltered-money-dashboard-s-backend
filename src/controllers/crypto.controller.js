// import Crypto from '../models/crypto.model.js';

// export const getCryptos = async (req, res) => {
//   try {
//     const cryptos = await Crypto.find();
//     res.json(cryptos);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching Cryptos', error: error.message });
//   }
// };

// export const getCryptoById = async (req, res) => {
//   try {
//     const crypto = await Crypto.findById(req.params.id);
//     if (!crypto) {
//       return res.status(404).json({ message: 'Crypto not found' });
//     }
//     res.json(crypto);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching Crypto', error: error.message });
//   }
// };

// export const createCrypto = async (req, res) => {
//   try {
//     const { name, symbol, price, change } = req.body;
//     const newCrypto = new Crypto({ name, symbol, price, change });
//     await newCrypto.save();
//     res.status(201).json({ message: 'Crypto created successfully', data: newCrypto });
//   } catch (error) {
//     res.status(500).json({ message: 'Error creating Crypto', error: error.message });
//   }
// };

// export const deleteCrypto = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const crypto = await Crypto.findByIdAndDelete(id);
//     if (!crypto) {
//       return res.status(404).json({ message: 'Crypto not found' });
//     }
//     res.status(200).json({ message: 'Crypto deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error deleting Crypto', error: error.message });
//   }
// };

// export const updateCrypto = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, symbol, price, change } = req.body;
//     const crypto = await Crypto.findByIdAndUpdate(
//       id,
//       { name, symbol, price, change, updatedAt: Date.now() },
//       { new: true, runValidators: true }
//     );
//     if (!crypto) {
//       return res.status(404).json({ message: 'Crypto not found' });
//     }
//     res.status(200).json({ message: 'Crypto updated successfully', data: crypto });
//   } catch (error) {
//     res.status(500).json({ message: 'Error updating Crypto', error: error.message });
//   }
// };













import Crypto from '../models/crypto.model.js';

export const getCryptos = async (req, res) => {
  try {
    let { from, to } = req.query;
    let query = Crypto.find();
    if (from && to) {
      from = new Date(from);
      to = new Date(to);
      to.setHours(23, 59, 59, 999); // Set to end of day for inclusive filtering
      query = query.where('createdAt').gte(from).lte(to);
    }
    const cryptos = await query.exec();
    res.json(cryptos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching Cryptos', error: error.message });
  }
};

export const getCryptoById = async (req, res) => {
  try {
    const crypto = await Crypto.findById(req.params.id);
    if (!crypto) {
      return res.status(404).json({ message: 'Crypto not found' });
    }
    res.json(crypto);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching Crypto', error: error.message });
  }
};

export const createCrypto = async (req, res) => {
  try {
    const { name, symbol, price, change } = req.body;
    const newCrypto = new Crypto({ name, symbol, price, change });
    await newCrypto.save();
    res.status(201).json({ message: 'Crypto created successfully', data: newCrypto });
  } catch (error) {
    res.status(500).json({ message: 'Error creating Crypto', error: error.message });
  }
};

export const deleteCrypto = async (req, res) => {
  try {
    const { id } = req.params;
    const crypto = await Crypto.findByIdAndDelete(id);
    if (!crypto) {
      return res.status(404).json({ message: 'Crypto not found' });
    }
    res.status(200).json({ message: 'Crypto deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting Crypto', error: error.message });
  }
};

export const updateCrypto = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, symbol, price, change } = req.body;
    const crypto = await Crypto.findByIdAndUpdate(
      id,
      { name, symbol, price, change, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
    if (!crypto) {
      return res.status(404).json({ message: 'Crypto not found' });
    }
    res.status(200).json({ message: 'Crypto updated successfully', data: crypto });
  } catch (error) {
    res.status(500).json({ message: 'Error updating Crypto', error: error.message });
  }
};