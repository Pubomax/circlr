import mongoose from 'mongoose';

const nodeSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['message', 'input', 'condition', 'action'],
    required: true
  },
  content: String,
  options: [String],
  next: [String],
  conditions: [{
    field: String,
    operator: String,
    value: String,
    nextNodeId: String
  }],
  metadata: mongoose.Schema.Types.Mixed
});

const chatbotFlowSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: String,
  status: {
    type: String,
    enum: ['draft', 'active', 'inactive'],
    default: 'draft'
  },
  nodes: [nodeSchema],
  channels: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Channel'
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

export default mongoose.model('ChatbotFlow', chatbotFlowSchema);