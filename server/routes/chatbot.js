import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import {
  getChatbotFlows,
  createChatbotFlow,
  updateChatbotFlow,
  deleteChatbotFlow
} from '../controllers/chatbotController.js';

const router = express.Router();

router.use(protect);
router.use(authorize('supervisor', 'manager', 'owner'));

router.route('/')
  .get(getChatbotFlows)
  .post(createChatbotFlow);

router.route('/:id')
  .patch(updateChatbotFlow)
  .delete(deleteChatbotFlow);

export default router;