import { create } from 'zustand';
import { Customer, CustomerFormData } from '../types/customer';

interface CustomerStore {
  customers: Customer[];
  loading: boolean;
  error: string | null;
  addCustomer: (data: CustomerFormData) => Promise<void>;
  fetchCustomers: () => Promise<void>;
  deleteCustomer: (id: string) => Promise<void>;
}

// Mock storage functions
const getStoredCustomers = (): Customer[] => {
  const stored = localStorage.getItem('customers');
  return stored ? JSON.parse(stored) : [];
};

const setStoredCustomers = (customers: Customer[]) => {
  localStorage.setItem('customers', JSON.stringify(customers));
};

export const useCustomerStore = create<CustomerStore>((set, get) => ({
  customers: [],
  loading: false,
  error: null,

  fetchCustomers: async () => {
    set({ loading: true });
    try {
      const customers = getStoredCustomers();
      set({ customers, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch customers', loading: false });
    }
  },

  addCustomer: async (data: CustomerFormData) => {
    set({ loading: true });
    try {
      const newCustomer: Customer = {
        id: Date.now().toString(),
        ...data,
        status: 'active',
        createdAt: new Date().toISOString()
      };
      
      const customers = [...get().customers, newCustomer];
      setStoredCustomers(customers);
      set({ customers, loading: false });
    } catch (error) {
      set({ error: 'Failed to add customer', loading: false });
    }
  },

  deleteCustomer: async (id: string) => {
    set({ loading: true });
    try {
      const customers = get().customers.filter(c => c.id !== id);
      setStoredCustomers(customers);
      set({ customers, loading: false });
    } catch (error) {
      set({ error: 'Failed to delete customer', loading: false });
    }
  }
}));