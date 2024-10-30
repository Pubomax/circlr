import React from 'react';
import { CustomerActivity as Activity } from '../../types/customer';
import { formatDistanceToNow } from 'date-fns';
import { MessageSquare, Phone, Mail, Calendar, FileText, CreditCard } from 'lucide-react';

interface CustomerActivityProps {
  activity: Activity;
}

const activityIcons = {
  note: FileText,
  email: Mail,
  call: Phone,
  meeting: Calendar,
  support_ticket: MessageSquare,
  payment: CreditCard,
};

export function CustomerActivity({ activity }: CustomerActivityProps) {
  const Icon = activityIcons[activity.type];

  return (
    <div className="flex space-x-3">
      <div className="flex-shrink-0">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
          <Icon className="h-4 w-4 text-blue-600" />
        </div>
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-sm text-gray-900">
          <span className="font-medium">{activity.title}</span>
        </div>
        {activity.description && (
          <div className="mt-1 text-sm text-gray-700">{activity.description}</div>
        )}
        <div className="mt-1 flex items-center space-x-2 text-xs text-gray-500">
          <span>{formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true })}</span>
          <span>•</span>
          <span>by {activity.createdBy}</span>
        </div>
      </div>
    </div>
  );
}