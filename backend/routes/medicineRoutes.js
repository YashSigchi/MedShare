import express from 'express';
import {
  uploadMedicine,
  getMyUploads,
  getPendingMedicines,
  approveMedicine,
  getMarketplaceMedicines,
} from '../controllers/medicineController.js';
import { protect } from '../middleware/authMiddleware.js';
import { requireRole } from '../middleware/roleMiddleware.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  },
});

const router = express.Router();

router.post('/upload', protect, requireRole('Donor'), upload.single('photo'), uploadMedicine);
router.get('/myuploads', protect, requireRole('Donor'), getMyUploads);
router.get('/pending', protect, requireRole('Verifier'), getPendingMedicines);
router.patch('/:id/approve', protect, requireRole('Verifier'), approveMedicine);
router.get('/marketplace', getMarketplaceMedicines);

export default router;

