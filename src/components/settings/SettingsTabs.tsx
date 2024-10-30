import React from 'react';
import { User, Building2, Bell, Users, MessageSquare, Bot } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface SettingsTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function SettingsTabs({ activeTab, onTabChange }: SettingsTabsProps) {
  const { hasPermission } = useAuth();

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'company', label: 'Company', icon: Building2 },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'channels', label: 'Channels', icon: MessageSquare, requiredRole: 'supervisor' as const },
    { id: 'chatbot', label: 'Chatbot', icon: Bot, requiredRole: 'supervisor' as const },
    { id: 'users', label: 'Users', icon: Users, requiredRole: 'owner' as const },
  ].filter(tab => !tab.requiredRole || hasPermission(tab.requiredRole));

  return (
    <div className="border-b border-gray-200">
      <nav className="flex space-x-8 px-6" aria-label="Settings tabs">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
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
  );
}