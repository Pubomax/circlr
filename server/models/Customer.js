import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  phone: String,
  title: String,
  isPrimary: {
    type: Boolean,
    default: false
  }
});

const activitySchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['note', 'email', 'call', 'meeting', 'support_ticket', 'payment'],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  metadata: mongoose.Schema.Types.Mixed
}, {
  timestamps: true
});

const customerSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
    trim: true
  },
  industry: String,
  website: String,
  status: {
    type: String,
    enum: ['active', 'inactive', 'pending', 'churned'],
    default: 'active'
  },
  lifecycleStage: {
    type: String,
    enum: ['lead', 'onboarding', 'active', 'at_risk', 'churned'],
    default: 'lead'
  },
  segment: {
    type: String,
    enum: ['enterprise', 'mid_market', 'smb', 'startup'],
    required: true
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  contacts: [contactSchema],
  activities: [activitySchema],
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  tags: [String],
  customFields: mongoose.Schema.Types.Mixed,
  
  // Business metrics
  annualRevenue: Number,
  employeeCount: Number,
  contractValue: Number,
  contractStartDate: Date,
  contractEndDate: Date,
  
  // Health indicators
  healthScore: {
    type: Number,
    min: 0,
    max: 100
  },
  npsScore: {
    type: Number,
    min: -100,
    max: 100
  },
  lastHealthCheck: Date,
  lastContactedAt: Date
}, {
  timestamps: true
});

// Index for search
customerSchema.index({
  companyName: 'text',
  'contacts.name': 'text',
  'contacts.email': 'text'
});

export default mongoose.model('Customer', customerSchema);