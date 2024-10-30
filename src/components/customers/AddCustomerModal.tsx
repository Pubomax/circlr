import React from 'react';
import { X } from 'lucide-react';
import { CustomerForm } from './CustomerForm';
import { CustomerFormData } from '../../types/customer';

interface AddCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (data: CustomerFormData) => void;
}

export function AddCustomerModal({ isOpen, onClose, onAdd }: AddCustomerModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

        <div className="inline-block w-full max-w-2xl transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left align-bottom shadow-xl transition-all sm:my-8 sm:p-6 sm:align-middle">
          <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
            <button
              onClick={onClose}
              className="rounded-md bg-white text-gray-400 hover:text-gray-500"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="sm:flex sm:items-start">
            <div className="mt-3 w-full text-center sm:ml-4 sm:mt-0 sm:text-left">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Add New Customer
              </h3>
              <div className="mt-6">
                <CustomerForm onSubmit={onAdd} onCancel={onClose} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}