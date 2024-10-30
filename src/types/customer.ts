export interface Customer {
  id: string;
  name: string;
  email: string;
  company: string;
  status: 'active' | 'inactive';
  phone?: string;
  createdAt: string;
  lastContact?: string;
  industry?: string;
  size?: 'small' | 'medium' | 'large' | 'enterprise';
  website?: string;
  address?: string;
}

export interface CustomerFormData {
  name: string;
  email: string;
  company: string;
  phone?: string;
  industry?: string;
  size?: 'small' | 'medium' | 'large' | 'enterprise';
  website?: string;
  address?: string;
}