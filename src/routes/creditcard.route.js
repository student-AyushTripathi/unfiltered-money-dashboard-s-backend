import express from 'express';
import { getCreditCards, getCreditCardById, createCreditCard, updateCreditCard, deleteCreditCard } from '../controllers/creditcard.controller.js';
const router = express.Router();


router.get('/', getCreditCards);
router.get('/:id', getCreditCardById);
router.post('/', createCreditCard);
router.put('/:id', updateCreditCard);
router.delete('/:id', deleteCreditCard);

export default router;