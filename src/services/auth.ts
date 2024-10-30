import { User } from '../types/auth';
import * as mockData from './mockData';

export async function login(email: string, password: string): Promise<{ user: User }> {
  const user = await mockData.login(email, password);
  return { user };
}

export async function logout(): Promise<void> {
  // Clear any stored session data
  localStorage.removeItem('currentUser');
}

export async function getCurrentUser(): Promise<User> {
  const userJson = localStorage.getItem('currentUser');
  if (!userJson) {
    throw new Error('No user found');
  }
  return JSON.parse(userJson);
}