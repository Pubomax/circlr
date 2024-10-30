import cron from 'node-cron';
import { format } from 'date-fns';
import Automation from '../models/Automation.js';
import Customer from '../models/Customer.js';
import { sendEmail } from './email.js';
import { sendWhatsAppMessage } from './whatsapp.js';
import { sendSMS } from './sms.js';
import { logger } from '../utils/logger.js';

export function initializeAutomations() {
  // Run every hour
  cron.schedule('0 * * * *', async () => {
    try {
      const automations = await Automation.find({ isActive: true });
      
      for (const automation of automations) {
        await processAutomation(automation);
      }
    } catch (error) {
      logger.error('Automation processing error:', error);
    }
  });
}

async function processAutomation(automation) {
  try {
    const { trigger, action } = automation;
    let targets = [];

    switch (trigger.event) {
      case 'customer_inactive':
        targets = await findInactiveCustomers(trigger.conditions);
        break;
      case 'task_due':
        targets = await findDueTasks(trigger.conditions);
        break;
      case 'status_change':
        // Handled by webhook/event listener
        break;
      case 'schedule':
        if (shouldRunScheduledAutomation(trigger.schedule)) {
          targets = await findTargetsByConditions(trigger.conditions);
        }
        break;
    }

    for (const target of targets) {
      await executeAction(action, target);
    }

    // Update last run time
    automation.lastRun = new Date();
    await automation.save();
  } catch (error) {
    logger.error(`Error processing automation ${automation._id}:`, error);
  }
}

async function executeAction(action, target) {
  const message = processTemplate(action.template, target);

  switch (action.channel) {
    case 'email':
      await sendEmail({
        to: target.email,
        subject: 'CRM Notification',
        html: message
      });
      break;
    case 'whatsapp':
      await sendWhatsAppMessage(target.phone, message);
      break;
    case 'sms':
      await sendSMS(target.phone, message);
      break;
    case 'notification':
      // Handle in-app notifications
      break;
  }
}

function processTemplate(template, data) {
  return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return data[key] || match;
  });
}

function shouldRunScheduledAutomation(schedule) {
  const now = new Date();
  const currentHour = format(now, 'HH:mm');
  const currentDay = now.getDay();

  if (schedule.time !== currentHour) return false;

  if (schedule.frequency === 'daily') return true;
  if (schedule.frequency === 'weekly' && schedule.daysOfWeek.includes(currentDay)) return true;
  if (schedule.frequency === 'monthly' && now.getDate() === schedule.dayOfMonth) return true;

  return false;
}

async function findInactiveCustomers(conditions) {
  const inactiveDays = conditions.find(c => c.field === 'inactiveDays')?.value || 30;
  const date = new Date();
  date.setDate(date.getDate() - inactiveDays);

  return Customer.find({
    lastContactedAt: { $lt: date },
    status: 'active'
  });
}

async function findDueTasks(conditions) {
  // Implement task due date checking logic
  return [];
}

async function findTargetsByConditions(conditions) {
  // Implement custom condition matching logic
  return [];
}