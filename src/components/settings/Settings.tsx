import React from 'react';
import { User, Building2, Bell, MessageSquare, Bot, Users } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ChannelSettings } from './channels/ChannelSettings';
import { ChatbotBuilder } from './chatbot/ChatbotBuilder';
import { UserManagement } from './UserManagement';
import { NotificationSettings } from './NotificationSettings';
import { CompanySettings } from './CompanySettings';
import { ProfileSettings } from './ProfileSettings';

export function Settings() {
  const [activeTab, setActiveTab] = React.useState('profile');
  const { user } = useAuth();

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'company', label: 'Company', icon: Building2 },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'channels', label: 'Channels', icon: MessageSquare },
    { id: 'chatbot', label: 'Chatbot', icon: Bot },
    { id: 'users', label: 'Users', icon: Users },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
      </div>

      <div className="rounded-lg bg-white shadow">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Settings tabs">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    border-b-2 py-4 px-1 text-sm font-medium ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }
                  `}
                >
                  <div className="flex items-center space-x-2">
                    <Icon className="h-5 w-5" />
                    <span>{tab.label}</span>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'profile' && <ProfileSettings />}
          {activeTab === 'company' && <CompanySettings />}
          {activeTab === 'notifications' && <NotificationSettings />}
          {activeTab === 'channels' && <ChannelSettings />}
          {activeTab === 'chatbot' && <ChatbotBuilder />}
          {activeTab === 'users' && <UserManagement />}
        </div>
      </div>
    </div>
  );
}