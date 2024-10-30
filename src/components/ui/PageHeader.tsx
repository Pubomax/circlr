import React from 'react';
import { LucideIcon } from 'lucide-react';

interface Action {
  label: string;
  icon: LucideIcon;
  variant: 'primary' | 'secondary';
  onClick: () => void;
}

interface PageHeaderProps {
  title: string;
  actions?: Action[];
}

export function PageHeader({ title, actions }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
      {actions && (
        <div className="flex gap-3">
          {actions.map((action) => (
            <button
              key={action.label}
              onClick={action.onClick}
              className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold ${
                action.variant === 'primary'
                  ? 'bg-blue-600 text-white shadow-sm hover:bg-blue-500'
                  : 'bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
              }`}
            >
              <action.icon className="h-4 w-4" />
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}