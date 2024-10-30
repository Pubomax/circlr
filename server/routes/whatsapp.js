import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import {
  generateQR,
  connectAPI,
  disconnect
} from '../controllers/whatsappController.js';

const router = express.Router();

router.use(protect);
router.use(authorize('supervisor', 'manager', 'owner'));

router.get('/qr', generateQR);
router.post('/connect/api', connectAPI);
router.post('/disconnect', disconnect);

export default router;