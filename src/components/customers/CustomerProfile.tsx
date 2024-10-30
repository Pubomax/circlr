import React from 'react';
import { Customer, CustomerActivity } from '../../types/customer';
import { 
  Building2, 
  Globe, 
  Users, 
  TrendingUp, 
  Calendar,
  Phone,
  Mail,
  Star,
  Activity,
  AlertCircle,
  Tag
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface CustomerProfileProps {
  customer: Customer;
}

export function CustomerProfile({ customer }: CustomerProfileProps) {
  const primaryContact = customer.contacts.find(contact => contact.isPrimary);

  const healthStatus = {
    high: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-red-100 text-red-800'
  };

  const getHealthClass = (score?: number) => {
    if (!score) return healthStatus.medium;
    if (score >= 75) return healthStatus.high;
    if (score >= 50) return healthStatus.medium;
    return healthStatus.low;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{customer.companyName}</h2>
          <div className="mt-1 flex items-center space-x-4">
            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
              getHealthClass(customer.healthScore)
            }`}>
              Health Score: {customer.healthScore || 'N/A'}
            </span>
            <span className="inline-flex items-center text-sm text-gray-500">
              <Star className="mr-1.5 h-4 w-4" />
              {customer.priority} Priority
            </span>
            <span className="inline-flex items-center text-sm text-gray-500">
              <Activity className="mr-1.5 h-4 w-4" />
              {customer.status}
            </span>
          </div>
        </div>
        <div className="flex space-x-3">
          <button className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            Edit
          </button>
          <button className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500">
            Contact
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main Info */}
        <div className="col-span-2 space-y-6">
          {/* Company Details */}
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h3 className="text-lg font-medium text-gray-900">Company Details</h3>
            <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <dt className="flex items-center text-sm font-medium text-gray-500">
                  <Building2 className="mr-2 h-4 w-4" />
                  Industry
                </dt>
                <dd className="mt-1 text-sm text-gray-900">{customer.industry || 'N/A'}</dd>
              </div>
              <div>
                <dt className="flex items-center text-sm font-medium text-gray-500">
                  <Globe className="mr-2 h-4 w-4" />
                  Website
                </dt>
                <dd className="mt-1 text-sm text-blue-600 hover:text-blue-500">
                  <a href={customer.website} target="_blank" rel="noopener noreferrer">
                    {customer.website}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="flex items-center text-sm font-medium text-gray-500">
                  <Users className="mr-2 h-4 w-4" />
                  Employee Count
                </dt>
                <dd className="mt-1 text-sm text-gray-900">{customer.employeeCount || 'N/A'}</dd>
              </div>
              <div>
                <dt className="flex items-center text-sm font-medium text-gray-500">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Annual Revenue
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {customer.annualRevenue 
                    ? new Intl.NumberFormat('en-US', { 
                        style: 'currency', 
                        currency: 'USD',
                        notation: 'compact',
                        maximumFractionDigits: 1
                      }).format(customer.annualRevenue)
                    : 'N/A'}
                </dd>
              </div>
            </dl>
          </div>

          {/* Activity Timeline */}
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Activity History</h3>
              <button className="text-sm font-medium text-blue-600 hover:text-blue-500">
                View All
              </button>
            </div>
            <div className="mt-4 flow-root">
              <ul className="-mb-8">
                {customer.activities.slice(0, 5).map((activity, index) => (
                  <li key={activity.id}>
                    <div className="relative pb-8">
                      {index !== customer.activities.length - 1 && (
                        <span
                          className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
                          aria-hidden="true"
                        />
                      )}
                      <div className="relative flex space-x-3">
                        <div>
                          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                            <Activity className="h-4 w-4 text-blue-600" />
                          </span>
                        </div>
                        <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                          <div>
                            <p className="text-sm text-gray-900">{activity.title}</p>
                            {activity.description && (
                              <p className="mt-0.5 text-sm text-gray-500">
                                {activity.description}
                              </p>
                            )}
                          </div>
                          <div className="whitespace-nowrap text-right text-sm text-gray-500">
                            {formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Key Contacts */}
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h3 className="text-lg font-medium text-gray-900">Key Contacts</h3>
            <ul className="mt-4 divide-y divide-gray-200">
              {customer.contacts.map((contact) => (
                <li key={contact.id} className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                        <span className="text-sm font-medium leading-none text-blue-700">
                          {contact.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {contact.name}
                        {contact.isPrimary && (
                          <span className="ml-2 text-xs text-blue-600">Primary</span>
                        )}
                      </p>
                      <p className="text-sm text-gray-500">{contact.title}</p>
                      <div className="mt-1 flex items-center space-x-4">
                        {contact.email && (
                          <a href={`mailto:${contact.email}`} className="text-gray-400 hover:text-gray-500">
                            <Mail className="h-4 w-4" />
                          </a>
                        )}
                        {contact.phone && (
                          <a href={`tel:${contact.phone}`} className="text-gray-400 hover:text-gray-500">
                            <Phone className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <button className="mt-4 block w-full rounded-md bg-white px-3 py-2 text-center text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              Add Contact
            </button>
          </div>

          {/* Contract Details */}
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h3 className="text-lg font-medium text-gray-900">Contract Details</h3>
            <dl className="mt-4 space-y-4">
              <div>
                <dt className="text-sm font-medium text-gray-500">Contract Value</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {customer.contractValue
                    ? new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD'
                      }).format(customer.contractValue)
                    : 'N/A'}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Contract Period</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {customer.contractStartDate && customer.contractEndDate
                    ? `${new Date(customer.contractStartDate).toLocaleDateString()} - ${new Date(customer.contractEndDate).toLocaleDateString()}`
                    : 'N/A'}
                </dd>
              </div>
            </dl>
          </div>

          {/* Tags */}
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Tags</h3>
              <button className="text-sm font-medium text-blue-600 hover:text-blue-500">
                Edit
              </button>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {customer.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full bg-blue-100 px-3 py-0.5 text-sm font-medium text-blue-800"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}