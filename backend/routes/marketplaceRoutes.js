import express from 'express';
import { getMarketplace, requestMedicine } from '../controllers/marketplaceController.js';
import { protect } from '../middleware/authMiddleware.js';
import { requireRole } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.get('/', getMarketplace);
router.post('/request/:id', protect, requireRole('Receiver'), requestMedicine);

export default router;

