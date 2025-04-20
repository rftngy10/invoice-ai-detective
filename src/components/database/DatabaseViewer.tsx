
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Database, Search, Filter, RefreshCw, Plus } from 'lucide-react';

// Mock invoice database records
const mockInvoices = [
  {
    id: 1,
    invoiceNumber: 'INV-2025-4321',
    vendor: 'TechCorp Solutions',
    amount: 2499.99,
    currency: 'USD',
    issueDate: '2025-04-10',
    dueDate: '2025-05-10',
    status: 'paid'
  },
  {
    id: 2,
    invoiceNumber: 'INV-2025-3854',
    vendor: 'Office Supplies Inc.',
    amount: 875.50,
    currency: 'USD',
    issueDate: '2025-04-05',
    dueDate: '2025-05-05',
    status: 'pending'
  },
  {
    id: 3,
    invoiceNumber: 'INV-2025-9876',
    vendor: 'Acme Consulting',
    amount: 3750.00,
    currency: 'USD',
    issueDate: '2025-03-28',
    dueDate: '2025-04-28',
    status: 'paid'
  },
  {
    id: 4,
    invoiceNumber: 'INV-2025-6543',
    vendor: 'Global Logistics Ltd.',
    amount: 1250.75,
    currency: 'USD',
    issueDate: '2025-03-15',
    dueDate: '2025-04-15',
    status: 'overdue'
  },
  {
    id: 5,
    invoiceNumber: 'INV-2025-7890',
    vendor: 'Marketing Experts Co.',
    amount: 5000.00,
    currency: 'USD',
    issueDate: '2025-03-01',
    dueDate: '2025-04-01',
    status: 'paid'
  }
];

const DatabaseViewer = () => {
  const [invoices, setInvoices] = useState(mockInvoices);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRefresh = () => {
    setIsLoading(true);
    // Simulate database refresh
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const filteredInvoices = invoices.filter(invoice => 
    invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.vendor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="shadow-md">
      <CardHeader className="bg-invoice-navy text-white flex flex-row items-center justify-between py-4">
        <CardTitle className="flex items-center text-lg">
          <Database className="mr-2" size={20} />
          Invoice Database
        </CardTitle>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            className="text-white border-white hover:bg-invoice-navy/80"
          >
            <Plus size={16} className="mr-1" />
            Add New
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-white hover:bg-invoice-navy/80"
            onClick={handleRefresh}
            disabled={isLoading}
          >
            <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="py-3 flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search invoices..." 
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter size={16} />
          </Button>
        </div>
        
        <div className="rounded-md border overflow-hidden mt-3">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Invoice #
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vendor
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Issue Date
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Due Date
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredInvoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                      {invoice.invoiceNumber}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                      {invoice.vendor}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                      {invoice.amount.toLocaleString('en-US', {
                        style: 'currency',
                        currency: invoice.currency
                      })}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                      {new Date(invoice.issueDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                      {new Date(invoice.dueDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(invoice.status)}`}>
                        {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredInvoices.length === 0 && (
            <div className="py-20 text-center text-gray-500">
              <Database className="h-10 w-10 mx-auto text-gray-300 mb-2" />
              <p>No invoices found matching your search criteria</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DatabaseViewer;
