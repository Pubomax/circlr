import express from 'express';
import multer from 'multer';
import { protect, authorize } from '../middleware/auth.js';
import {
  getCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  addActivity,
  importCustomers
} from '../controllers/customerController.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Protect all routes
router.use(protect);

// Customer routes
router.route('/')
  .get(getCustomers)
  .post(authorize('supervisor', 'manager', 'owner'), createCustomer);

router.post('/import', 
  authorize('supervisor', 'manager', 'owner'),
  upload.single('file'),
  importCustomers
);

router.route('/:id')
  .get(getCustomer)
  .patch(authorize('supervisor', 'manager', 'owner'), updateCustomer)
  .delete(authorize('manager', 'owner'), deleteCustomer);

// Activity routes
router.post('/:id/activities', addActivity);

export default router;