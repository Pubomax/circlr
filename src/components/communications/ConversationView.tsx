import React from 'react';
import { Send, Phone, Video } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'customer';
  timestamp: string;
}

const messages: Message[] = [
  {
    id: '1',
    content: 'Hi, I need help with the latest update.',
    sender: 'customer',
    timestamp: '10:23 AM',
  },
  {
    id: '2',
    content: 'Of course! I\'d be happy to help. What specific issues are you experiencing?',
    sender: 'user',
    timestamp: '10:25 AM',
  },
  {
    id: '3',
    content: 'The new dashboard isn\'t loading properly. It shows a blank screen.',
    sender: 'customer',
    timestamp: '10:26 AM',
  },
];

interface ConversationViewProps {
  conversationId: string;
}

export function ConversationView({ conversationId }: ConversationViewProps) {
  const [newMessage, setNewMessage] = React.useState('');

  const handleSend = () => {
    if (newMessage.trim()) {
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Jane Cooper</h2>
            <p className="text-sm text-gray-500">Microsoft</p>
          </div>
          <div className="flex space-x-2">
            <button className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500">
              <Phone className="h-5 w-5" />
            </button>
            <button className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500">
              <Video className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`rounded-lg px-4 py-2 max-w-sm ${
                  message.sender === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p
                  className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}
                >
                  {message.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-200 px-6 py-4">
        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="block w-full rounded-lg border border-gray-300 py-2 pl-4 pr-10 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSend();
                }
              }}
            />
          </div>
          <button
            onClick={handleSend}
            className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-500"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}