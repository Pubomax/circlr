import { User, UserRole } from '../types/auth';
import { Customer } from '../types/customer';

// Initial admin user
const defaultUser: User = {
  id: '1',
  email: 'tbijou@me.com',
  name: 'Admin User',
  role: 'owner'
};

// Initialize localStorage with default data
export function initializeStorage() {
  if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify([defaultUser]));
  }
  if (!localStorage.getItem('customers')) {
    localStorage.setItem('customers', JSON.stringify([]));
  }
}

// Auth functions
export function login(email: string, password: string): Promise<User> {
  return new Promise((resolve, reject) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: User) => u.email === email);
    
    // For demo, accept any password for the default user
    if (email === 'tbijou@me.com' && password === 'MahBijou007') {
      resolve(user);
    } else {
      reject(new Error('Invalid credentials'));
    }
  });
}

// Customer functions
export function getCustomers(): Promise<Customer[]> {
  return new Promise((resolve) => {
    const customers = JSON.parse(localStorage.getItem('customers') || '[]');
    resolve(customers);
  });
}

export function addCustomer(customer: Partial<Customer>): Promise<Customer> {
  return new Promise((resolve) => {
    const customers = JSON.parse(localStorage.getItem('customers') || '[]');
    const newCustomer = {
      id: Date.now().toString(),
      ...customer,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    customers.push(newCustomer);
    localStorage.setItem('customers', JSON.stringify(customers));
    resolve(newCustomer);
  });
}

export function updateCustomer(id: string, data: Partial<Customer>): Promise<Customer> {
  return new Promise((resolve, reject) => {
    const customers = JSON.parse(localStorage.getItem('customers') || '[]');
    const index = customers.findIndex((c: Customer) => c.id === id);
    if (index === -1) {
      reject(new Error('Customer not found'));
      return;
    }
    customers[index] = {
      ...customers[index],
      ...data,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem('customers', JSON.stringify(customers));
    resolve(customers[index]);
  });
}

export function deleteCustomer(id: string): Promise<void> {
  return new Promise((resolve) => {
    const customers = JSON.parse(localStorage.getItem('customers') || '[]');
    const filtered = customers.filter((c: Customer) => c.id !== id);
    localStorage.setItem('customers', JSON.stringify(filtered));
    resolve();
  });
}