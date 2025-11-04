// routes/featuredInsuranceRoutes.js
import express from 'express';
const router = express.Router();
import { getAll,create, update, deleteFunction,getById } from '../../controllers/insurance/featuredInsuranceController.js';

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', deleteFunction);

export default router;