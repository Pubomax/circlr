import Automation from '../models/Automation.js';
import { AppError } from '../utils/AppError.js';

export const getAutomations = async (req, res, next) => {
  try {
    const automations = await Automation.find()
      .populate('createdBy', 'name email');
    res.json(automations);
  } catch (error) {
    next(error);
  }
};

export const createAutomation = async (req, res, next) => {
  try {
    const automation = new Automation({
      ...req.body,
      createdBy: req.user.id
    });
    await automation.save();
    res.status(201).json(automation);
  } catch (error) {
    next(error);
  }
};

export const updateAutomation = async (req, res, next) => {
  try {
    const automation = await Automation.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!automation) {
      throw new AppError('Automation not found', 404);
    }

    res.json(automation);
  } catch (error) {
    next(error);
  }
};

export const deleteAutomation = async (req, res, next) => {
  try {
    const automation = await Automation.findByIdAndDelete(req.params.id);

    if (!automation) {
      throw new AppError('Automation not found', 404);
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};