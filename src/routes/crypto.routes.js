import express from 'express';
import { getCryptos, getCryptoById, createCrypto, deleteCrypto, updateCrypto } from '../controllers/crypto.controller.js';

const router = express.Router();

router.get('/crypto', getCryptos);
router.get('/crypto/:id', getCryptoById);
router.post('/crypto/add', createCrypto);
router.delete('/crypto/:id', deleteCrypto);
router.put('/crypto/:id', updateCrypto);

export default router;