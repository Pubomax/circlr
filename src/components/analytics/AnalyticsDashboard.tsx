import React from 'react';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  MessageSquare, 
  AlertTriangle,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export function AnalyticsDashboard() {
  // Mock data - replace with real API calls
  const customerGrowth = [
    { month: 'Jan', customers: 120 },
    { month: 'Feb', customers: 150 },
    { month: 'Mar', customers: 200 },
    { month: 'Apr', customers: 180 },
    { month: 'May', customers: 220 },
    { month: 'Jun', customers: 250 },
  ];

  const activeUsers = [
    { month: 'Jan', users: 800 },
    { month: 'Feb', users: 950 },
    { month: 'Mar', users: 1100 },
    { month: 'Apr', users: 1250 },
    { month: 'May', users: 1400 },
    { month: 'Jun', users: 1600 },
  ];

  const newUsers = [
    { month: 'Jan', users: 120 },
    { month: 'Feb', users: 150 },
    { month: 'Mar', users: 180 },
    { month: 'Apr', users: 140 },
    { month: 'May', users: 200 },
    { month: 'Jun', users: 220 },
  ];

  const totalBilled = [
    { month: 'Jan', amount: 25000 },
    { month: 'Feb', amount: 30000 },
    { month: 'Mar', amount: 35000 },
    { month: 'Apr', amount: 32000 },
    { month: 'May', amount: 40000 },
    { month: 'Jun', amount: 45000 },
  ];

  const newBilled = [
    { month: 'Jan', amount: 5000 },
    { month: 'Feb', amount: 6000 },
    { month: 'Mar', amount: 7500 },
    { month: 'Apr', amount: 6000 },
    { month: 'May', amount: 8000 },
    { month: 'Jun', amount: 9000 },
  ];

  const customerSegments = [
    { name: 'Enterprise', value: 30 },
    { name: 'Mid-Market', value: 45 },
    { name: 'SMB', value: 85 },
    { name: 'Startup', value: 40 },
  ];

  const metrics = [
    {
      title: 'Total Revenue',
      value: '$125,200',
      change: '+12.5%',
      trend: 'up',
      icon: TrendingUp,
    },
    {
      title: 'Active Users',
      value: '1,240',
      change: '+5.2%',
      trend: 'up',
      icon: Users,
    },
    {
      title: 'Response Time',
      value: '2.4h',
      change: '-8.1%',
      trend: 'down',
      icon: MessageSquare,
    },
    {
      title: 'Churn Rate',
      value: '2.1%',
      change: '+0.3%',
      trend: 'up',
      icon: AlertTriangle,
    },
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
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div
              key={metric.title}
              className="relative overflow-hidden rounded-lg bg-white p-6 shadow"
            >
              <dt>
                <div className="absolute rounded-md bg-blue-100 p-3">
                  <Icon className="h-6 w-6 text-blue-600" />
                </div>
                <p className="ml-16 truncate text-sm font-medium text-gray-500">
                  {metric.title}
                </p>
              </dt>
              <dd className="ml-16 flex items-baseline">
                <p className="text-2xl font-semibold text-gray-900">
                  {metric.value}
                </p>
                <p className={`ml-2 flex items-baseline text-sm font-semibold ${
                  metric.trend === 'up' 
                    ? metric.title === 'Churn Rate' 
                      ? 'text-red-600' 
                      : 'text-green-600'
                    : metric.title === 'Churn Rate'
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}>
                  {metric.trend === 'up' ? (
                    <ArrowUp className="h-4 w-4" />
                  ) : (
                    <ArrowDown className="h-4 w-4" />
                  )}
                  {metric.change}
                </p>
              </dd>
            </div>
          );
        })}
      </div>

      {/* User Metrics */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Active Users */}
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-lg font-medium text-gray-900">Active Users</h3>
          <div className="mt-6 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={activeUsers}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="users" 
                  name="Active Users"
                  stroke="#3B82F6" 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* New Users */}
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-lg font-medium text-gray-900">New Users</h3>
          <div className="mt-6 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={newUsers}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar 
                  dataKey="users" 
                  name="New Users"
                  fill="#4F46E5"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Billing Metrics */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Total Billed */}
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-lg font-medium text-gray-900">Total Billed</h3>
          <div className="mt-6 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={totalBilled}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={formatCurrency} />
                <Tooltip formatter={(value) => formatCurrency(value as number)} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="amount" 
                  name="Total Billed"
                  stroke="#059669" 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* New Billed */}
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-lg font-medium text-gray-900">New Revenue</h3>
          <div className="mt-6 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={newBilled}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={formatCurrency} />
                <Tooltip formatter={(value) => formatCurrency(value as number)} />
                <Legend />
                <Bar 
                  dataKey="amount" 
                  name="New Revenue"
                  fill="#0D9488"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Additional Insights */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Customer Growth */}
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-lg font-medium text-gray-900">Customer Growth</h3>
          <div className="mt-6 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={customerGrowth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="customers" 
                  name="Total Customers"
                  stroke="#3B82F6" 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Customer Segments */}
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-lg font-medium text-gray-900">Customer Segments</h3>
          <div className="mt-6 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={customerSegments}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {customerSegments.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}