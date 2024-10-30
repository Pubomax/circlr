import mongoose from 'mongoose';

const automationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['follow_up', 'task_reminder', 'notification', 'message', 'email'],
    required: true
  },
  trigger: {
    event: {
      type: String,
      enum: ['customer_inactive', 'task_due', 'status_change', 'schedule'],
      required: true
    },
    conditions: [{
      field: String,
      operator: String,
      value: mongoose.Schema.Types.Mixed
    }],
    schedule: {
      frequency: {
        type: String,
        enum: ['once', 'daily', 'weekly', 'monthly']
      },
      time: String,
      daysOfWeek: [Number],
      dayOfMonth: Number
    }
  },
  action: {
    template: {
      type: String,
      required: true
    },
    channel: {
      type: String,
      enum: ['email', 'sms', 'whatsapp', 'notification'],
      required: true
    },
    recipients: [{
      type: String,
      enum: ['customer', 'assigned_agent', 'supervisor', 'team']
    }]
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastRun: Date,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Automation', automationSchema);