import nodemailer from 'nodemailer';
import { logger } from '../utils/logger.js';

let transporter;

export function initializeEmailService() {
  transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_PORT === '465',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
}

export async function sendEmail({ to, subject, html }) {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html,
    });
    logger.info('Email sent:', info.messageId);
    return info;
  } catch (error) {
    logger.error('Email sending error:', error);
    throw error;
  }
}