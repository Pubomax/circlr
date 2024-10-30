import { Customer, CustomerActivity } from '../types/customer';

const API_URL = '/api';

export async function getCustomers(): Promise<Customer[]> {
  const response = await fetch(`${API_URL}/customers`, {
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch customers');
  }

  return response.json();
}

export async function getCustomer(id: string): Promise<Customer> {
  const response = await fetch(`${API_URL}/customers/${id}`, {
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch customer');
  }

  return response.json();
}

export async function createCustomer(data: Partial<Customer>): Promise<Customer> {
  const response = await fetch(`${API_URL}/customers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    credentials: 'include',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create customer');
  }

  return response.json();
}

export async function updateCustomer(id: string, data: Partial<Customer>): Promise<Customer> {
  const response = await fetch(`${API_URL}/customers/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    credentials: 'include',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to update customer');
  }

  return response.json();
}

export async function deleteCustomer(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/customers/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to delete customer');
  }
}

export async function addCustomerActivity(
  customerId: string,
  activity: Omit<CustomerActivity, 'id' | 'createdAt'>
): Promise<CustomerActivity> {
  const response = await fetch(`${API_URL}/customers/${customerId}/activities`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(activity),
    credentials: 'include',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to add activity');
  }

  return response.json();
}