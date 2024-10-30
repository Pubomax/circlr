import React from 'react';
import { Phone, Mail, MessageCircle } from 'lucide-react';

interface Conversation {
  id: string;
  customer: {
    name: string;
    email: string;
  };
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  channel: 'email' | 'sms' | 'call';
}

const conversations: Conversation[] = [
  {
    id: '1',
    customer: {
      name: 'Jane Cooper',
      email: 'jane@example.com',
    },
    lastMessage: 'Thanks for your help with the latest update.',
    timestamp: '5m ago',
    unread: true,
    channel: 'email',
  },
  {
    id: '2',
    customer: {
      name: 'Wade Warren',
      email: 'wade@example.com',
    },
    lastMessage: 'When can we schedule a call to discuss the proposal?',
    timestamp: '2h ago',
    unread: false,
    channel: 'sms',
  },
  {
    id: '3',
    customer: {
      name: 'Esther Howard',
      email: 'esther@example.com',
    },
    lastMessage: 'Missed call',
    timestamp: '1d ago',
    unread: false,
    channel: 'call',
  },
];

const channelIcons = {
  email: Mail,
  sms: MessageCircle,
  call: Phone,
};

interface ConversationListProps {
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function ConversationList({ selectedId, onSelect }: ConversationListProps) {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow">
      <ul className="divide-y divide-gray-200">
        {conversations.map((conversation) => {
          const Icon = channelIcons[conversation.channel];
          return (
            <li
              key={conversation.id}
              className={`cursor-pointer ${
                selectedId === conversation.id ? 'bg-gray-50' : ''
              }`}
              onClick={() => onSelect(conversation.id)}
            >
              <div className="relative px-6 py-5 hover:bg-gray-50">
                <div className="flex justify-between space-x-3">
                  <div className="flex min-w-0 flex-1 justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                          <span className="text-sm font-medium leading-none text-gray-700">
                            {conversation.customer.name
                              .split(' ')
                              .map((n) => n[0])
                              .join('')}
                          </span>
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-gray-900">
                          {conversation.customer.name}
                        </p>
                        <p className="truncate text-sm text-gray-500">
                          {conversation.lastMessage}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-1">
                      <p className="text-sm text-gray-500">{conversation.timestamp}</p>
                      <div className="flex items-center space-x-2">
                        <Icon className="h-4 w-4 text-gray-400" />
                        {conversation.unread && (
                          <span className="h-2.5 w-2.5 rounded-full bg-blue-600"></span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}