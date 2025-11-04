






// File: Backend/src/routes/sectionOrders.js
import express from 'express';
import { getSectionOrder, updateSectionOrder } from '../controllers/sectionOrderController.js';
import {authMiddleware} from '../middlewares/auth.middlewares.js';

const router = express.Router();


try {
  // GET /api/v1/section-orders/:pageId (public)
  router.get('/:pageId', getSectionOrder);

  // PUT /api/v1/section-orders/:pageId (admin-only)
  router.put('/:pageId',  updateSectionOrder);

  console.log('✅ SectionOrders routes set up successfully for GET and PUT');
} catch (setupError) {
  console.error('❌ Error setting up SectionOrders routes:', setupError.message);
}

export default router;
