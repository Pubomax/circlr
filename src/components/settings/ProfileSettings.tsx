import React from 'react';
import { Camera } from 'lucide-react';

export function ProfileSettings() {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-6">
        <div className="relative">
          <div className="h-24 w-24 rounded-full bg-gray-200">
            <span className="absolute inset-0 flex items-center justify-center text-xl font-medium text-gray-600">
              JD
            </span>
          </div>
          <button className="absolute bottom-0 right-0 rounded-full bg-white p-1.5 shadow-sm ring-1 ring-gray-300 hover:bg-gray-50">
            <Camera className="h-4 w-4 text-gray-500" />
          </button>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900">Profile Picture</h3>
          <p className="text-sm text-gray-500">Update your profile photo</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 pt-6 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">First Name</label>
          <input
            type="text"
            defaultValue="John"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Last Name</label>
          <input
            type="text"
            defaultValue="Doe"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            defaultValue="john.doe@example.com"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="tel"
            defaultValue="+1 (555) 123-4567"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
}