import express from 'express';
import authRoutes from './auth.js';
import userRoutes from './users.js';
import customerRoutes from './customers.js';
import channelRoutes from './channels.js';
import chatbotRoutes from './chatbot.js';
import automationRoutes from './automations.js';
import whatsappRoutes from './whatsapp.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/customers', customerRoutes);
router.use('/channels', channelRoutes);
router.use('/chatbot', chatbotRoutes);
router.use('/automations', automationRoutes);
router.use('/whatsapp', whatsappRoutes);

export default router;