import { create } from 'zustand';
import { Customer } from '../types/customer';
import * as mockData from '../services/mockData';

interface Store {
  customers: Customer[];
  loading: boolean;
  error: string | null;
  fetchCustomers: () => Promise<void>;
  addCustomer: (customer: Partial<Customer>) => Promise<void>;
  updateCustomer: (id: string, data: Partial<Customer>) => Promise<void>;
  deleteCustomer: (id: string) => Promise<void>;
}

export const useStore = create<Store>((set) => ({
  customers: [],
  loading: false,
  error: null,

  fetchCustomers: async () => {
    try {
      set({ loading: true, error: null });
      const customers = await mockData.getCustomers();
      set({ customers, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch customers', loading: false });
    }
  },

  addCustomer: async (customer) => {
    try {
      set({ loading: true, error: null });
      const newCustomer = await mockData.addCustomer(customer);
      set((state) => ({
        customers: [...state.customers, newCustomer],
        loading: false
      }));
    } catch (error) {
      set({ error: 'Failed to add customer', loading: false });
    }
  },

  updateCustomer: async (id, data) => {
    try {
      set({ loading: true, error: null });
      const updatedCustomer = await mockData.updateCustomer(id, data);
      set((state) => ({
        customers: state.customers.map((c) =>
          c.id === id ? updatedCustomer : c
        ),
        loading: false
      }));
    } catch (error) {
      set({ error: 'Failed to update customer', loading: false });
    }
  },

  deleteCustomer: async (id) => {
    try {
      set({ loading: true, error: null });
      await mockData.deleteCustomer(id);
      set((state) => ({
        customers: state.customers.filter((c) => c.id !== id),
        loading: false
      }));
    } catch (error) {
      set({ error: 'Failed to delete customer', loading: false });
    }
  }
}));