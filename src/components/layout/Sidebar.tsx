
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, Mail, FileText, Database, Settings, 
  BarChart, Calendar, HelpCircle 
} from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { icon: <Home size={20} />, label: 'Dashboard', path: '/' },
    { icon: <Mail size={20} />, label: 'Emails', path: '/emails' },
    { icon: <FileText size={20} />, label: 'Invoices', path: '/invoices' },
    { icon: <Database size={20} />, label: 'Database', path: '/database' },
    { icon: <BarChart size={20} />, label: 'Reports', path: '/reports' },
    { icon: <Calendar size={20} />, label: 'Calendar', path: '/calendar' },
    { icon: <Settings size={20} />, label: 'Settings', path: '/settings' },
    { icon: <HelpCircle size={20} />, label: 'Help', path: '/help' },
  ];

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-200">
      <div className="py-6 px-4">
        <div className="flex flex-col space-y-6">
          <nav>
            <ul className="space-y-2">
              {navItems.map((item, index) => (
                <li key={index}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center px-4 py-3 text-gray-700 rounded-md hover:bg-gray-100 transition-colors ${
                        isActive ? 'bg-invoice-light text-invoice-navy font-medium' : ''
                      }`
                    }
                  >
                    <span className="mr-3">{item.icon}</span>
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
