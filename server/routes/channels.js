import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import {
  getChannels,
  createChannel,
  updateChannel,
  deleteChannel
} from '../controllers/channelController.js';

const router = express.Router();

router.use(protect);
router.use(authorize('supervisor', 'manager', 'owner'));

router.route('/')
  .get(getChannels)
  .post(createChannel);

router.route('/:id')
  .patch(updateChannel)
  .delete(deleteChannel);

export default router;