






import Price from '../models/price.model.js';

export const getPrices = async (req, res) => {
  try {
    const { city = 'Mumbai', from, to } = req.query;
    let query = Price.find({ city });
    if (from && to) {
      const fromDate = new Date(from);
      const toDate = new Date(to);
      if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
        return res.status(400).json({ message: 'Invalid date format' });
      }
      toDate.setHours(23, 59, 59, 999); // Set to end of day for inclusive filtering
      query = query.where('createdAt').gte(fromDate).lte(toDate);
    }
    const prices = await query.exec();
    if (prices.length === 0 && from && to) {
      return res.status(404).json({ message: 'No prices found for this date range' });
    }
    res.json(prices);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching prices', error });
  }
};

export const createPrice = async (req, res) => {
  try {
    const { metal, prices, city } = req.body;
    const newPrice = new Price({ metal, prices, city });
    await newPrice.save();
    res.status(201).json({ message: 'Price saved successfully', data: newPrice });
  } catch (error) {
    res.status(500).json({ message: 'Error saving price', error });
  }
};

export const deletePrice = async (req, res) => {
  try {
    const { id } = req.params; // Assuming ID is passed as a URL parameter
    const price = await Price.findByIdAndDelete(id);
    if (!price) {
      return res.status(404).json({ message: 'Price not found' });
    }
    res.status(200).json({ message: 'Price deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting price', error });
  }
};

export const updatePrice = async (req, res) => {
  try {
    const { id } = req.params; // Assuming ID is passed as a URL parameter
    const { metal, prices, city } = req.body;
    const price = await Price.findByIdAndUpdate(
      id,
      { metal, prices, city, updatedAt: Date.now() }, // Update with new data and timestamp
      { new: true, runValidators: true }
    );
    if (!price) {
      return res.status(404).json({ message: 'Price not found' });
    }
    res.status(200).json({ message: 'Price updated successfully', data: price });
  } catch (error) {
    res.status(500).json({ message: 'Error updating price', error });
  }
};



export const getPriceById = async (req, res) => {
  try {
    const { id } = req.params;
    const price = await Price.findById(id);
    if (!price) {
      return res.status(404).json({ message: 'Price not found' });
    }
    res.status(200).json(price);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching price by ID', error });
  }
};


