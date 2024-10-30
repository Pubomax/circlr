import { User, UserRole } from '../types/auth';

const API_URL = '/api';

interface CreateUserData {
  email: string;
  name: string;
  role: UserRole;
  password: string;
}

interface UpdateUserData {
  name?: string;
  role?: UserRole;
  status?: 'active' | 'inactive';
}

export async function createUser(data: CreateUserData): Promise<User> {
  const response = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    credentials: 'include',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create user');
  }

  return response.json();
}

export async function getUsers(): Promise<User[]> {
  const response = await fetch(`${API_URL}/users`, {
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }

  return response.json();
}

export async function updateUser(userId: string, data: UpdateUserData): Promise<User> {
  const response = await fetch(`${API_URL}/users/${userId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    credentials: 'include',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to update user');
  }

  return response.json();
}

export async function deleteUser(userId: string): Promise<void> {
  const response = await fetch(`${API_URL}/users/${userId}`, {
    method: 'DELETE',
    credentials: 'include',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to delete user');
  }
}