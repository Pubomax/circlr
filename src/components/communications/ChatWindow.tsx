import React, { useState, useEffect, useRef } from 'react';
import { Send, Paperclip, Smile } from 'lucide-react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from '../../context/AuthContext';

interface Message {
  id: string;
  content: string;
  sender: {
    id: string;
    name: string;
  };
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
}

interface ChatWindowProps {
  conversationId: string;
  customerId: string;
}

export function ChatWindow({ conversationId, customerId }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  useEffect(() => {
    // Connect to Socket.IO server
    const socketInstance = io('http://localhost:5000', {
      query: { conversationId },
      withCredentials: true,
    });

    socketInstance.on('connect', () => {
      console.log('Connected to chat server');
    });

    socketInstance.on('message', (message: Message) => {
      setMessages(prev => [...prev, message]);
    });

    socketInstance.on('messageStatus', ({ messageId, status }) => {
      setMessages(prev =>
        prev.map(msg =>
          msg.id === messageId ? { ...msg, status } : msg
        )
      );
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [conversationId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = () => {
    if (!newMessage.trim() || !socket) return;

    const message: Omit<Message, 'id' | 'timestamp' | 'status'> = {
      content: newMessage,
      sender: {
        id: user!.id,
        name: user!.name,
      },
    };

    socket.emit('sendMessage', {
      conversationId,
      customerId,
      message,
    });

    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex h-full flex-col">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender.id === user?.id ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-sm rounded-lg px-4 py-2 ${
                  message.sender.id === user?.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <div
                  className={`mt-1 flex items-center justify-end space-x-1 text-xs ${
                    message.sender.id === user?.id ? 'text-blue-100' : 'text-gray-500'
                  }`}
                >
                  <span>
                    {new Date(message.timestamp).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                  {message.sender.id === user?.id && (
                    <span>
                      {message.status === 'sent' && '✓'}
                      {message.status === 'delivered' && '✓✓'}
                      {message.status === 'read' && '✓✓'}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-end space-x-4">
          <div className="flex-1">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="block w-full resize-none rounded-lg border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              rows={1}
            />
          </div>
          <div className="flex space-x-2">
            <button className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500">
              <Paperclip className="h-5 w-5" />
            </button>
            <button className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500">
              <Smile className="h-5 w-5" />
            </button>
            <button
              onClick={handleSend}
              className="rounded-lg bg-blue-600 p-2 text-white hover:bg-blue-500"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}