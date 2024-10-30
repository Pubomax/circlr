import React from 'react';
import { BarChart3, Users, MessageSquare, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export function Dashboard() {
  const stats = [
    {
      name: 'Total Customers',
      value: '2,651',
      change: '+12.5%',
      icon: Users
    },
    {
      name: 'Active Conversations',
      value: '48',
      change: '+7.2%',
      icon: MessageSquare
    },
    {
      name: 'Revenue',
      value: '$45,623',
      change: '+15.3%',
      icon: TrendingUp
    },
    {
      name: 'Customer Satisfaction',
      value: '95%',
      change: '+2.1%',
      icon: BarChart3
    }
  ];

  // Mock data for charts
  const totalBilledData = [
    { month: 'Jan', amount: 25000 },
    { month: 'Feb', amount: 30000 },
    { month: 'Mar', amount: 35000 },
    { month: 'Apr', amount: 32000 },
    { month: 'May', amount: 40000 },
    { month: 'Jun', amount: 45000 },
  ];

  const newBilledData = [
    { month: 'Jan', amount: 5000 },
    { month: 'Feb', amount: 6000 },
    { month: 'Mar', amount: 7500 },
    { month: 'Apr', amount: 6000 },
    { month: 'May', amount: 8000 },
    { month: 'Jun', amount: 9000 },
  ];

  const totalCustomersData = [
    { month: 'Jan', customers: 800 },
    { month: 'Feb', customers: 950 },
    { month: 'Mar', customers: 1100 },
    { month: 'Apr', customers: 1250 },
    { month: 'May', customers: 1400 },
    { month: 'Jun', customers: 1600 },
  ];

  const newCustomersData = [
    { month: 'Jan', customers: 120 },
    { month: 'Feb', customers: 150 },
    { month: 'Mar', customers: 180 },
    { month: 'Apr', customers: 140 },
    { month: 'May', customers: 200 },
    { month: 'Jun', customers: 220 },
  ];

  const segmentationData = [
    { name: 'Enterprise', value: 30 },
    { name: 'Mid-Market', value: 45 },
    { name: 'SMB', value: 85 },
    { name: 'Startup', value: 40 },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="relative overflow-hidden rounded-lg bg-white p-6 shadow"
            >
              <dt>
                <div className="absolute rounded-md bg-blue-100 p-3">
                  <Icon className="h-6 w-6 text-blue-600" />
                </div>
                <p className="ml-16 truncate text-sm font-medium text-gray-500">
                  {stat.name}
                </p>
              </dt>
              <dd className="ml-16 flex items-baseline">
                <p className="text-2xl font-semibold text-gray-900">
                  {stat.value}
                </p>
                <p className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                  {stat.change}
                </p>
              </dd>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="h-96 rounded-lg bg-white p-6 shadow">
          <h2 className="text-lg font-medium text-gray-900">Total Billed</h2>
          <div className="mt-4 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={totalBilledData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={formatCurrency} />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Line type="monotone" dataKey="amount" stroke="#3B82F6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="h-96 rounded-lg bg-white p-6 shadow">
          <h2 className="text-lg font-medium text-gray-900">New Revenue</h2>
          <div className="mt-4 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={newBilledData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={formatCurrency} />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Bar dataKey="amount" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="h-96 rounded-lg bg-white p-6 shadow">
          <h2 className="text-lg font-medium text-gray-900">Total Customers</h2>
          <div className="mt-4 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={totalCustomersData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="customers" stroke="#3B82F6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="h-96 rounded-lg bg-white p-6 shadow">
          <h2 className="text-lg font-medium text-gray-900">New Customers</h2>
          <div className="mt-4 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={newCustomersData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="customers" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="h-96 rounded-lg bg-white p-6 shadow lg:col-span-2">
          <h2 className="text-lg font-medium text-gray-900">Customer Segmentation</h2>
          <div className="mt-4 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={segmentationData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {segmentationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}