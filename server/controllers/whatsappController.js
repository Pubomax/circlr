import qrcode from 'qrcode';
import { Client } from 'whatsapp-web.js';
import { logger } from '../utils/logger.js';

const clients = new Map();

export const generateQR = async (req, res) => {
  try {
    const client = new Client({});
    
    client.on('qr', async (qr) => {
      try {
        const qrCodeDataUrl = await qrcode.toDataURL(qr);
        res.json({ qrCode: qrCodeDataUrl });
      } catch (error) {
        logger.error('QR generation error:', error);
        res.status(500).json({ error: 'Failed to generate QR code' });
      }
    });

    client.on('ready', () => {
      logger.info('WhatsApp client is ready');
      clients.set(req.user.id, client);
    });

    client.on('message', async (message) => {
      // Handle incoming messages
      logger.info('Received message:', message.body);
    });

    await client.initialize();
  } catch (error) {
    logger.error('WhatsApp initialization error:', error);
    res.status(500).json({ error: 'Failed to initialize WhatsApp' });
  }
};

export const connectAPI = async (req, res) => {
  try {
    const { apiKey, phoneNumber } = req.body;

    // Validate API key and phone number with WhatsApp Business API
    // Implementation depends on your WhatsApp Business API provider

    res.json({ success: true, message: 'WhatsApp API connected successfully' });
  } catch (error) {
    logger.error('WhatsApp API connection error:', error);
    res.status(500).json({ error: 'Failed to connect WhatsApp API' });
  }
};

export const disconnect = async (req, res) => {
  try {
    const client = clients.get(req.user.id);
    if (client) {
      await client.destroy();
      clients.delete(req.user.id);
    }
    res.json({ success: true, message: 'WhatsApp disconnected successfully' });
  } catch (error) {
    logger.error('WhatsApp disconnect error:', error);
    res.status(500).json({ error: 'Failed to disconnect WhatsApp' });
  }
};