import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import {
  getAutomations,
  createAutomation,
  updateAutomation,
  deleteAutomation
} from '../controllers/automationController.js';

const router = express.Router();

router.use(protect);
router.use(authorize('supervisor', 'manager', 'owner'));

router.route('/')
  .get(getAutomations)
  .post(createAutomation);

router.route('/:id')
  .patch(updateAutomation)
  .delete(deleteAutomation);

export default router;