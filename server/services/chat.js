import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import Message from '../models/Message.js';
import Conversation from '../models/Conversation.js';
import { logger } from '../utils/logger.js';

export function initializeChat(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.CLIENT_URL,
      credentials: true,
    },
  });

  // Authentication middleware
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token || socket.handshake.headers.cookie?.split('token=')[1];
      if (!token) {
        return next(new Error('Authentication error'));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.user = decoded;
      next();
    } catch (error) {
      next(new Error('Authentication error'));
    }
  });

  io.on('connection', (socket) => {
    logger.info(`User connected: ${socket.user.id}`);

    // Join conversation room
    const { conversationId } = socket.handshake.query;
    if (conversationId) {
      socket.join(conversationId);
    }

    socket.on('sendMessage', async (data) => {
      try {
        const { conversationId, customerId, message } = data;

        // Save message to database
        const newMessage = await Message.create({
          conversationId,
          customerId,
          content: message.content,
          sender: message.sender,
        });

        // Update conversation
        await Conversation.findByIdAndUpdate(conversationId, {
          lastMessage: newMessage._id,
          lastMessageAt: new Date(),
        });

        // Broadcast message to room
        io.to(conversationId).emit('message', {
          ...newMessage.toObject(),
          status: 'sent',
        });

        // Send delivery status
        setTimeout(() => {
          io.to(conversationId).emit('messageStatus', {
            messageId: newMessage._id,
            status: 'delivered',
          });
        }, 1000);

      } catch (error) {
        logger.error('Error sending message:', error);
        socket.emit('error', { message: 'Failed to send message' });
      }
    });

    socket.on('disconnect', () => {
      logger.info(`User disconnected: ${socket.user.id}`);
    });
  });

  return io;
}