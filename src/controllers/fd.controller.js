





import FD from '../models/fd.model.js';

export const getFD = async (req, res) => {
  try {
    const { id } = req.params;
    const fd = await FD.findById(id);
    if (!fd) {
      return res.status(404).json({ message: 'FD not found' });
    }
    res.status(200).json(fd);
  } catch (error) {
    console.error('Error in getFD:', error.message, error.stack);
    res.status(500).json({ message: 'Error fetching FD', error: error.message });
  }
};

export const getFDs = async (req, res) => {
  try {
    let { from, to } = req.query;
    let query = FD.find();
    if (from && to) {
      from = new Date(from);
      to = new Date(to);
      to.setHours(23, 59, 59, 999); // Set to end of day for inclusive filtering
      query = query.where('createdAt').gte(from).lte(to);
      console.log(`Filtering FDs from ${from} to ${to} (inclusive)`);
    } else {
      console.log("Fetching all FDs");
    }
    const fds = await query.exec();
    console.log("Fetched FDs:", fds);
    if (fds.length === 0 && from && to) {
      console.log("No FDs found in the selected date range");
    }
    res.json(fds);
  } catch (error) {
    console.error('Get FDs error:', error.message, error.stack);
    res.status(500).json({ message: 'Error fetching FDs', error: error.message });
  }
};

export const createFD = async (req, res) => {
  try {
    const { name, logo, interestRate, minDeposit, tenure } = req.body;
    console.log("Received request body for createFD:", req.body);
    const newFD = new FD({ name, logo, interestRate, minDeposit, tenure });
    console.log("Mongoose document before save:", newFD.toObject());
    const savedFD = await newFD.save();
    console.log("Saved FD document:", savedFD);
    res.status(201).json({ message: 'FD created successfully', data: savedFD });
  } catch (error) {
    console.error('Create FD error:', error.message, error.stack);
    res.status(500).json({ message: 'Error creating FD', error: error.message });
  }
};

export const deleteFD = async (req, res) => {
  try {
    const { id } = req.params;
    const fd = await FD.findByIdAndDelete(id);
    if (!fd) {
      return res.status(404).json({ message: 'FD not found' });
    }
    console.log("Deleted FD with ID:", id);
    res.status(200).json({ message: 'FD deleted successfully' });
  } catch (error) {
    console.error('Delete FD error:', error.message, error.stack);
    res.status(500).json({ message: 'Error deleting FD', error: error.message });
  }
};

export const updateFD = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, logo, interestRate, minDeposit, tenure } = req.body;
    console.log("Received request body for updateFD:", req.body);
    const fd = await FD.findByIdAndUpdate(
      id,
      { name, logo, interestRate, minDeposit, tenure },
      { new: true, runValidators: true }
    );
    if (!fd) {
      return res.status(404).json({ message: 'FD not found' });
    }
    console.log("Updated FD:", fd);
    res.status(200).json({ message: 'FD updated successfully', data: fd });
  } catch (error) {
    console.error('Update FD error:', error.message, error.stack);
    res.status(500).json({ message: 'Error updating FD', error: error.message });
  }
};




