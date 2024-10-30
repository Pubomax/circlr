import React from 'react';
import { AutomationBuilder } from '../settings/automation/AutomationBuilder';

export function Automations() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Automations</h1>
      </div>
      <div className="rounded-lg bg-white p-6 shadow">
        <AutomationBuilder />
      </div>
    </div>
  );
}