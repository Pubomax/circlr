import React from 'react';
import { useToast } from '../../hooks/useToast';
import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react';

const icons = {
  success: CheckCircle,
  error: XCircle,
  info: Info,
  warning: AlertTriangle,
};

const styles = {
  success: 'bg-green-50 text-green-800 border-green-200',
  error: 'bg-red-50 text-red-800 border-red-200',
  info: 'bg-blue-50 text-blue-800 border-blue-200',
  warning: 'bg-yellow-50 text-yellow-800 border-yellow-200',
};

export function Toaster() {
  const { toasts } = useToast();

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-4">
      {toasts.map((toast) => {
        const Icon = icons[toast.type];
        return (
          <div
            key={toast.id}
            className={`flex w-96 items-start space-x-4 rounded-lg border p-4 shadow-lg ${styles[toast.type]}`}
          >
            <Icon className="h-5 w-5 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-sm font-medium">{toast.title}</h3>
              {toast.description && (
                <p className="mt-1 text-sm opacity-90">{toast.description}</p>
              )}
            </div>
            <button className="text-gray-500 hover:text-gray-700">
              <X className="h-5 w-5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}