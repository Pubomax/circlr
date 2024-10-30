import React from 'react';
import { CustomerActivity } from './CustomerActivity';
import { CustomerActivity as Activity } from '../../types/customer';

interface CustomerTimelineProps {
  activities: Activity[];
}

export function CustomerTimeline({ activities }: CustomerTimelineProps) {
  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {activities.map((activity, index) => (
          <li key={activity.id}>
            <div className="relative pb-8">
              {index !== activities.length - 1 && (
                <span
                  className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true"
                />
              )}
              <CustomerActivity activity={activity} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}