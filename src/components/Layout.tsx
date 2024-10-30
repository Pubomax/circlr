import React from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { Users, MessageSquare, BarChart3, Settings, Menu, Bell, Search, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  const navigation = [
    { name: 'Dashboard', href: '/', icon: BarChart3 },
    { name: 'Customers', href: '/customers', icon: Users },
    { name: 'Communications', href: '/communications', icon: MessageSquare },
    { name: 'Automations', href: '/automations', icon: Zap },
    { name: 'Settings', href: '/settings', icon: Settings }
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-white shadow-lg transition-transform duration-200 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="flex h-16 items-center justify-between px-4">
          <span className="text-xl font-semibold text-blue-600">Circlr</span>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
            <Menu className="h-6 w-6" />
          </button>
        </div>
        <nav className="mt-4">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(item.href);
                }}
                className={`flex items-center px-4 py-3 text-sm ${
                  location.pathname === item.href
                    ? 'bg-gray-100 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className="mr-3 h-5 w-5" />
                {item.name}
              </a>
            );
          })}
        </nav>
      </div>

      {/* Main content */}
      <div className={`lg:pl-64 flex flex-col min-h-screen`}>
        {/* Top navigation */}
        <header className="sticky top-0 z-40 bg-white shadow">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
            
            <div className="flex flex-1 items-center justify-end gap-x-4">
              <div className="relative max-w-md">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>
              
              <button className="relative rounded-full bg-white p-2 hover:bg-gray-50">
                <Bell className="h-5 w-5 text-gray-500" />
                <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500"></span>
              </button>
              
              <div className="relative">
                <button
                  className="flex items-center space-x-2"
                  onClick={handleLogout}
                >
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-600">
                      {user?.name?.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <span className="text-sm text-gray-700">{user?.name}</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}