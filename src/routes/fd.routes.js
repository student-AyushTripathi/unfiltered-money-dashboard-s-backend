import express from 'express';
import { getFDs, createFD, deleteFD, updateFD, getFD } from '../controllers/fd.controller.js';

const router = express.Router();

router.get('/fds', getFDs);
router.post('/fds', createFD);
router.delete('/fds/:id', deleteFD);
router.put('/fds/:id', updateFD);


router.get('/fds/:id', getFD);

export default router;