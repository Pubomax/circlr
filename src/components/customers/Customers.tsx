import React, { useEffect, useState } from 'react';
import { CustomerList } from './CustomerList';
import { AddCustomerModal } from './AddCustomerModal';
import { useCustomerStore } from '../../store/customerStore';
import { CustomerFormData } from '../../types/customer';

export function Customers() {
  const [showAddModal, setShowAddModal] = useState(false);
  const { customers, loading, error, fetchCustomers, addCustomer } = useCustomerStore();

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const handleAddCustomer = async (data: CustomerFormData) => {
    await addCustomer(data);
    setShowAddModal(false);
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-md bg-red-50 p-4">
        <div className="flex">
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Error</h3>
            <div className="mt-2 text-sm text-red-700">{error}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <CustomerList 
        customers={customers} 
        onAdd={() => setShowAddModal(true)} 
      />
      
      <AddCustomerModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddCustomer}
      />
    </div>
  );
}