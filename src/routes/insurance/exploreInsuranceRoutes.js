// routes/exploreInsuranceRoutes.js
import express from 'express';
const router = express.Router();

import { deleteFunction,getAll, create,update,getById } from '../../controllers/insurance/exploreInsuranceController.js';

router.get('/', getAll);
router.get('/:id', getById); // Added GET by ID
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', deleteFunction);

export default router;