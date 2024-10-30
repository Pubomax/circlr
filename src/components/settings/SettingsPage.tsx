import React from 'react';
import { PageHeader } from '../ui/PageHeader';
import { Save } from 'lucide-react';
import { SettingsTabs } from './SettingsTabs';
import { ProfileSettings } from './ProfileSettings';
import { CompanySettings } from './CompanySettings';
import { NotificationSettings } from './NotificationSettings';
import { UserManagement } from './UserManagement';
import { ChannelSettings } from './channels/ChannelSettings';
import { ChatbotBuilder } from './chatbot/ChatbotBuilder';

export function SettingsPage() {
  const [activeTab, setActiveTab] = React.useState('profile');

  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        actions={[
          {
            label: 'Save Changes',
            icon: Save,
            variant: 'primary',
            onClick: () => console.log('Save settings'),
          },
        ]}
      />

      <div className="rounded-lg bg-white shadow">
        <SettingsTabs activeTab={activeTab} onTabChange={setActiveTab} />
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