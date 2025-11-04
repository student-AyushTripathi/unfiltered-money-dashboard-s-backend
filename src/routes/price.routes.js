import express from 'express';
import {
  getPrices,
  createPrice,
  updatePrice,
  deletePrice,
  getPriceById
} from '../controllers/price.controller.js';

const router = express.Router();

// Read all prices (optionally by city)
router.get('/prices', getPrices);

// ✅ Get a price entry by ID
router.get('/prices/:id', getPriceById);

// Create a new price entry
router.post('/prices', createPrice);

// ✅ Update a price entry by ID
router.put('/prices/:id', updatePrice);

// ✅ Delete a price entry by ID
router.delete('/prices/:id', deletePrice);

export default router;
