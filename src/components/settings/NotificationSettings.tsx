import React from 'react';

const notificationTypes = [
  {
    id: 'new-customer',
    title: 'New Customer',
    description: 'When a new customer is added to the system',
  },
  {
    id: 'customer-update',
    title: 'Customer Updates',
    description: 'When customer information is modified',
  },
  {
    id: 'new-message',
    title: 'New Messages',
    description: 'When you receive a new message from a customer',
  },
  {
    id: 'task-assigned',
    title: 'Task Assignments',
    description: 'When a task is assigned to you',
  },
];

export function NotificationSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Notification Preferences</h3>
        <p className="text-sm text-gray-500">Choose how and when you want to be notified</p>
      </div>

      <div className="space-y-4">
        {notificationTypes.map((notification) => (
          <div
            key={notification.id}
            className="flex items-start space-x-4 rounded-lg border border-gray-200 p-4"
          >
            <div className="flex-1">
              <h4 className="text-sm font-medium text-gray-900">{notification.title}</h4>
              <p className="text-sm text-gray-500">{notification.description}</p>
            </div>
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-600">Email</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-600">Push</span>
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}