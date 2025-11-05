// routes/personalLoanRoutes.js
import express from 'express';
import {
  getAllTopLenders, createTopLender, getTopLenderById, updateTopLender, deleteTopLender,

} from '../controllers/loan/TopLender.controller.js';
import {getAllCompareByCategories, createCompareByCategory, getCompareByCategoryById, updateCompareByCategory, deleteCompareByCategory} from '../controllers/loan/comparebycategory.controller.js';
const router = express.Router();

router.get('/top-lenders', getAllTopLenders);
router.post('/top-lenders', createTopLender);
router.get('/top-lenders/:id', getTopLenderById);
router.put('/top-lenders/:id', updateTopLender);
router.delete('/top-lenders/:id', deleteTopLender);

router.get('/compare-by-categories', getAllCompareByCategories);
router.post('/compare-by-categories', createCompareByCategory);
router.get('/compare-by-categories/:id', getCompareByCategoryById);
router.put('/compare-by-categories/:id', updateCompareByCategory);
router.delete('/compare-by-categories/:id', deleteCompareByCategory);

export default router;