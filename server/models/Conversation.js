import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  },
  channel: {
    type: String,
    enum: ['chat', 'email', 'whatsapp', 'sms'],
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'closed', 'archived'],
    default: 'active',
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  lastMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message',
  },
  lastMessageAt: Date,
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
}, {
  timestamps: true,
});

conversationSchema.index({ customerId: 1, status: 1 });
conversationSchema.index({ assignedTo: 1, status: 1 });
conversationSchema.index({ lastMessageAt: -1 });

export default mongoose.model('Conversation', conversationSchema);