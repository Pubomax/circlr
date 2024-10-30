import ChatbotFlow from '../models/ChatbotFlow.js';
import { AppError } from '../utils/AppError.js';

export const getChatbotFlows = async (req, res, next) => {
  try {
    const flows = await ChatbotFlow.find()
      .populate('channels', 'name type status')
      .populate('createdBy', 'name email')
      .populate('updatedBy', 'name email');
    res.json(flows);
  } catch (error) {
    next(error);
  }
};

export const createChatbotFlow = async (req, res, next) => {
  try {
    const flow = new ChatbotFlow({
      ...req.body,
      createdBy: req.user.id,
      updatedBy: req.user.id
    });
    await flow.save();
    res.status(201).json(flow);
  } catch (error) {
    next(error);
  }
};

export const updateChatbotFlow = async (req, res, next) => {
  try {
    const flow = await ChatbotFlow.findByIdAndUpdate(
      req.params.id,
      { 
        $set: {
          ...req.body,
          updatedBy: req.user.id
        }
      },
      { new: true, runValidators: true }
    );

    if (!flow) {
      throw new AppError('Chatbot flow not found', 404);
    }

    res.json(flow);
  } catch (error) {
    next(error);
  }
};

export const deleteChatbotFlow = async (req, res, next) => {
  try {
    const flow = await ChatbotFlow.findByIdAndDelete(req.params.id);

    if (!flow) {
      throw new AppError('Chatbot flow not found', 404);
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};