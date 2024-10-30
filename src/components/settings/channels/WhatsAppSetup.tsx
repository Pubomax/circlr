import React, { useState, useEffect } from 'react';
import { QrCode, Smartphone, Key, RefreshCw } from 'lucide-react';

interface WhatsAppSetupProps {
  channelId?: string;
  onConnect: (data: { type: 'api' | 'qr', config: any }) => Promise<void>;
}

export function WhatsAppSetup({ channelId, onConnect }: WhatsAppSetupProps) {
  const [connectionType, setConnectionType] = useState<'api' | 'qr'>('qr');
  const [qrCode, setQrCode] = useState<string>('');
  const [apiKey, setApiKey] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (connectionType === 'qr') {
      fetchQRCode();
    }
  }, [connectionType]);

  const fetchQRCode = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/channels/whatsapp/qr', {
        credentials: 'include'
      });
      const data = await response.json();
      setQrCode(data.qrCode);
    } catch (err) {
      setError('Failed to generate QR code');
    } finally {
      setIsLoading(false);
    }
  };

  const handleConnect = async () => {
    try {
      setIsLoading(true);
      setError('');

      if (connectionType === 'api') {
        if (!apiKey || !phoneNumber) {
          setError('Please fill in all fields');
          return;
        }
        await onConnect({
          type: 'api',
          config: { apiKey, phoneNumber }
        });
      } else {
        await onConnect({
          type: 'qr',
          config: { qrCode }
        });
      }
    } catch (err) {
      setError('Connection failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex space-x-4">
        <button
          onClick={() => setConnectionType('qr')}
          className={`flex items-center gap-2 rounded-lg px-4 py-2 ${
            connectionType === 'qr'
              ? 'bg-blue-100 text-blue-700'
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          <QrCode className="h-5 w-5" />
          QR Code
        </button>
        <button
          onClick={() => setConnectionType('api')}
          className={`flex items-center gap-2 rounded-lg px-4 py-2 ${
            connectionType === 'api'
              ? 'bg-blue-100 text-blue-700'
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          <Key className="h-5 w-5" />
          API Key
        </button>
      </div>

      {error && (
        <div className="rounded-md bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {connectionType === 'qr' ? (
        <div className="space-y-4">
          <div className="flex justify-center">
            {isLoading ? (
              <div className="flex h-64 w-64 items-center justify-center rounded-lg bg-gray-100">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
              </div>
            ) : qrCode ? (
              <div className="relative">
                <img
                  src={qrCode}
                  alt="WhatsApp QR Code"
                  className="h-64 w-64 rounded-lg"
                />
                <button
                  onClick={fetchQRCode}
                  className="absolute -right-4 -top-4 rounded-full bg-white p-2 shadow-md hover:bg-gray-50"
                >
                  <RefreshCw className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            ) : (
              <div className="flex h-64 w-64 items-center justify-center rounded-lg bg-gray-100">
                <span className="text-sm text-gray-500">QR Code not available</span>
              </div>
            )}
          </div>
          <p className="text-center text-sm text-gray-600">
            Open WhatsApp on your phone, go to Settings {'>'} WhatsApp Web/Desktop and scan the QR code
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              WhatsApp Business API Key
            </label>
            <input
              type="text"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Enter your API key"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              WhatsApp Business Phone Number
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500">
                <Smartphone className="h-4 w-4" />
              </span>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="block w-full rounded-none rounded-r-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="+1234567890"
              />
            </div>
          </div>
        </div>
      )}

      <button
        onClick={handleConnect}
        disabled={isLoading}
        className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-500 disabled:opacity-50"
      >
        {isLoading ? 'Connecting...' : 'Connect WhatsApp'}
      </button>
    </div>
  );
}