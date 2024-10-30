import React, { useState, useEffect } from 'react';
import { CustomerList } from './CustomerList';
import { CustomerProfile } from './CustomerProfile';
import { AddCustomerModal } from './AddCustomerModal';
import { ImportCustomersModal } from './ImportCustomersModal';
import { useStore } from '../../store';
import { useToast } from '../../hooks/useToast';
import { UserPlus, Upload, Download } from 'lucide-react';

export function CustomersPage() {
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showAddOptions, setShowAddOptions] = useState(false);

  const { customers, fetchCustomers, loading, error } = useStore();
  const { toast } = useToast();

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const handleImportCustomers = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/customers/import', {
        method: 'POST',
        body: formData,
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Import failed');
      }

      toast({
        title: 'Success',
        description: 'Customers imported successfully',
        type: 'success'
      });

      fetchCustomers();
      setShowImportModal(false);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to import customers',
        type: 'error'
      });
    }
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
          <div className="flex-shrink-0">
            <span className="h-5 w-5 text-red-400" aria-hidden="true">⚠</span>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Error loading customers</h3>
            <div className="mt-2 text-sm text-red-700">
              {error}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const selectedCustomerData = customers.find(c => c.id === selectedCustomer);

  return (
    <div className="space-y-6">
      {selectedCustomerData ? (
        <>
          <button
            onClick={() => setSelectedCustomer(null)}
            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
          >
            ← Back to Customer List
          </button>
          <CustomerProfile customer={selectedCustomerData} />
        </>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-900">Customers</h1>
            <div className="relative flex items-center gap-3">
              <button
                onClick={() => setShowAddOptions(!showAddOptions)}
                className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
              >
                <UserPlus className="h-4 w-4" />
                Add Customer
              </button>
              {showAddOptions && (
                <div className="absolute right-0 top-full z-10 mt-2 w-56 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setShowAddOptions(false);
                        setShowAddModal(true);
                      }}
                      className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <UserPlus className="mr-3 h-4 w-4" />
                      Add Single Customer
                    </button>
                    <button
                      onClick={() => {
                        setShowAddOptions(false);
                        setShowImportModal(true);
                      }}
                      className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <Upload className="mr-3 h-4 w-4" />
                      Import from File
                    </button>
                  </div>
                </div>
              )}
              <button className="inline-flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                <Download className="h-4 w-4" />
                Export
              </button>
            </div>
          </div>

          <CustomerList 
            customers={customers} 
            onCustomerSelect={setSelectedCustomer} 
          />

          <AddCustomerModal
            isOpen={showAddModal}
            onClose={() => setShowAddModal(false)}
          />

          <ImportCustomersModal
            isOpen={showImportModal}
            onClose={() => setShowImportModal(false)}
            onImport={handleImportCustomers}
          />
        </>
      )}
    </div>
  );
}