import Channel from '../models/Channel.js';
import { AppError } from '../utils/AppError.js';

export const getChannels = async (req, res, next) => {
  try {
    const channels = await Channel.find()
      .populate('createdBy', 'name email');
    res.json(channels);
  } catch (error) {
    next(error);
  }
};

export const createChannel = async (req, res, next) => {
  try {
    const channel = new Channel({
      ...req.body,
      createdBy: req.user.id
    });
    await channel.save();
    res.status(201).json(channel);
  } catch (error) {
    next(error);
  }
};

export const updateChannel = async (req, res, next) => {
  try {
    const channel = await Channel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!channel) {
      throw new AppError('Channel not found', 404);
    }

    res.json(channel);
  } catch (error) {
    next(error);
  }
};

export const deleteChannel = async (req, res, next) => {
  try {
    const channel = await Channel.findByIdAndDelete(req.params.id);

    if (!channel) {
      throw new AppError('Channel not found', 404);
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};