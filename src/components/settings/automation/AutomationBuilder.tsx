import React, { useState } from 'react';
import { Plus, Save, Trash2 } from 'lucide-react';

interface AutomationRule {
  id: string;
  name: string;
  type: 'follow_up' | 'task_reminder' | 'notification' | 'message' | 'email';
  trigger: {
    event: 'customer_inactive' | 'task_due' | 'status_change' | 'schedule';
    conditions: {
      field: string;
      operator: string;
      value: any;
    }[];
    schedule?: {
      frequency: 'once' | 'daily' | 'weekly' | 'monthly';
      time: string;
      daysOfWeek?: number[];
      dayOfMonth?: number;
    };
  };
  action: {
    template: string;
    channel: 'email' | 'sms' | 'whatsapp' | 'notification';
    recipients: ('customer' | 'assigned_agent' | 'supervisor' | 'team')[];
  };
  isActive: boolean;
}

export function AutomationBuilder() {
  const [automations, setAutomations] = useState<AutomationRule[]>([]);
  const [selectedAutomation, setSelectedAutomation] = useState<AutomationRule | null>(null);

  const createNewAutomation = () => {
    const newAutomation: AutomationRule = {
      id: Date.now().toString(),
      name: 'New Automation',
      type: 'follow_up',
      trigger: {
        event: 'customer_inactive',
        conditions: []
      },
      action: {
        template: '',
        channel: 'email',
        recipients: ['customer']
      },
      isActive: false
    };
    setAutomations([...automations, newAutomation]);
    setSelectedAutomation(newAutomation);
  };

  const updateAutomation = (updatedAutomation: AutomationRule) => {
    setAutomations(automations.map(a => 
      a.id === updatedAutomation.id ? updatedAutomation : a
    ));
    setSelectedAutomation(updatedAutomation);
  };

  const deleteAutomation = (id: string) => {
    setAutomations(automations.filter(a => a.id !== id));
    if (selectedAutomation?.id === id) {
      setSelectedAutomation(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Automation Rules</h3>
          <p className="text-sm text-gray-500">
            Create automated workflows for customer engagement
          </p>
        </div>
        <button
          onClick={createNewAutomation}
          className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
        >
          <Plus className="h-4 w-4" />
          New Automation
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Automation List */}
        <div className="space-y-4 lg:col-span-1">
          {automations.map((automation) => (
            <div
              key={automation.id}
              className={`cursor-pointer rounded-lg border p-4 ${
                selectedAutomation?.id === automation.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
              onClick={() => setSelectedAutomation(automation)}
            >
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-gray-900">
                  {automation.name}
                </h4>
                <div className="flex items-center space-x-2">
                  <span
                    className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                      automation.isActive
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {automation.isActive ? 'Active' : 'Inactive'}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteAutomation(automation.id);
                    }}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                {automation.type.replace('_', ' ')}
              </p>
            </div>
          ))}
        </div>

        {/* Automation Editor */}
        {selectedAutomation ? (
          <div className="space-y-6 rounded-lg border border-gray-200 bg-white p-6 lg:col-span-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Automation Name
              </label>
              <input
                type="text"
                value={selectedAutomation.name}
                onChange={(e) =>
                  updateAutomation({
                    ...selectedAutomation,
                    name: e.target.value
                  })
                }
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Type
              </label>
              <select
                value={selectedAutomation.type}
                onChange={(e) =>
                  updateAutomation({
                    ...selectedAutomation,
                    type: e.target.value as AutomationRule['type']
                  })
                }
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="follow_up">Follow Up</option>
                <option value="task_reminder">Task Reminder</option>
                <option value="notification">Notification</option>
                <option value="message">Message</option>
                <option value="email">Email</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Trigger Event
              </label>
              <select
                value={selectedAutomation.trigger.event}
                onChange={(e) =>
                  updateAutomation({
                    ...selectedAutomation,
                    trigger: {
                      ...selectedAutomation.trigger,
                      event: e.target.value as AutomationRule['trigger']['event']
                    }
                  })
                }
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="customer_inactive">Customer Inactive</option>
                <option value="task_due">Task Due</option>
                <option value="status_change">Status Change</option>
                <option value="schedule">Schedule</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Action Channel
              </label>
              <select
                value={selectedAutomation.action.channel}
                onChange={(e) =>
                  updateAutomation({
                    ...selectedAutomation,
                    action: {
                      ...selectedAutomation.action,
                      channel: e.target.value as AutomationRule['action']['channel']
                    }
                  })
                }
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="email">Email</option>
                <option value="sms">SMS</option>
                <option value="whatsapp">WhatsApp</option>
                <option value="notification">In-app Notification</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Message Template
              </label>
              <textarea
                value={selectedAutomation.action.template}
                onChange={(e) =>
                  updateAutomation({
                    ...selectedAutomation,
                    action: {
                      ...selectedAutomation.action,
                      template: e.target.value
                    }
                  })
                }
                rows={4}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Use {{variables}} for dynamic content"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedAutomation.isActive}
                  onChange={(e) =>
                    updateAutomation({
                      ...selectedAutomation,
                      isActive: e.target.checked
                    })
                  }
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Active</span>
              </label>

              <button className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500">
                <Save className="h-4 w-4" />
                Save Changes
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center rounded-lg border border-gray-200 bg-white p-6 lg:col-span-2">
            <p className="text-gray-500">Select an automation rule to edit</p>
          </div>
        )}
      </div>
    </div>
  );
}