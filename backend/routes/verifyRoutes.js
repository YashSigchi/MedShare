import express from 'express';
import { getPending, verifyMedicine } from '../controllers/verifyController.js';
import { protect } from '../middleware/authMiddleware.js';
import { requireRole } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.get('/pending', protect, requireRole('Verifier'), getPending);
router.patch('/:id', protect, requireRole('Verifier'), verifyMedicine);

export default router;

