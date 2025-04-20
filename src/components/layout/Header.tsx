
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Bell, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 py-4">
      <div className="container flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-invoice-navy rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-lg">ID</span>
          </div>
          <h1 className="text-xl font-bold text-invoice-navy">Invoice Detective</h1>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5 text-gray-500" />
          </Button>
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5 text-gray-500" />
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5 text-gray-500" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
