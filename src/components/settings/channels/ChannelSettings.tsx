import React from 'react';
import { MessageCircle, Mail, Phone, MessageSquare } from 'lucide-react';

interface Channel {
  id: string;
  name: string;
  type: 'whatsapp' | 'email' | 'sms' | 'phone';
  status: 'active' | 'inactive';
  icon: React.ElementType;
}

const channels: Channel[] = [
  {
    id: '1',
    name: 'WhatsApp Business',
    type: 'whatsapp',
    status: 'active',
    icon: MessageCircle,
  },
  {
    id: '2',
    name: 'Email Support',
    type: 'email',
    status: 'active',
    icon: Mail,
  },
  {
    id: '3',
    name: 'SMS',
    type: 'sms',
    status: 'inactive',
    icon: MessageSquare,
  },
  {
    id: '4',
    name: 'Phone Support',
    type: 'phone',
    status: 'active',
    icon: Phone,
  },
];

export function ChannelSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Communication Channels</h3>
        <p className="text-sm text-gray-500">
          Configure and manage your communication channels
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {channels.map((channel) => {
          const Icon = channel.icon;
          return (
            <div
              key={channel.id}
              className="relative rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                  <Icon className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">{channel.name}</h4>
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      channel.status === 'active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {channel.status === 'active' ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>

              <div className="mt-4 space-y-4">
                <button className="block w-full rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                  Configure
                </button>
                <button
                  className={`block w-full rounded-md px-3 py-2 text-sm font-semibold shadow-sm ${
                    channel.status === 'active'
                      ? 'bg-red-50 text-red-600 hover:bg-red-100'
                      : 'bg-blue-600 text-white hover:bg-blue-500'
                  }`}
                >
                  {channel.status === 'active' ? 'Deactivate' : 'Activate'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}