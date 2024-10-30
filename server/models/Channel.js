import mongoose from 'mongoose';

const channelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['whatsapp', 'email', 'sms', 'phone'],
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'inactive'
  },
  config: {
    // WhatsApp config
    whatsappPhoneNumber: String,
    whatsappApiKey: String,
    
    // Email config
    emailHost: String,
    emailPort: Number,
    emailUser: String,
    emailPassword: String,
    emailFrom: String,
    
    // SMS config
    smsApiKey: String,
    smsFrom: String,
    
    // Phone config
    phoneNumber: String,
    phoneProvider: String,
    phoneApiKey: String
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Channel', channelSchema);