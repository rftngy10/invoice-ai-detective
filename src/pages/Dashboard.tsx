
import React from 'react';
import Layout from '@/components/layout/Layout';
import StatCards from '@/components/widgets/StatCards';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Mail, Database, Search } from 'lucide-react';

const Dashboard = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        
        <StatCards />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-md">
            <CardHeader className="bg-invoice-navy text-white">
              <CardTitle className="flex items-center text-lg">
                <Mail className="mr-2" />
                Recent Email Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="p-4">
                <div className="space-y-4">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="flex items-center space-x-3 p-3 rounded-md hover:bg-gray-50">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Mail className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">Invoice #{Math.floor(1000 + Math.random() * 9000)} from Vendor {item}</p>
                        <p className="text-xs text-gray-500">Processed {item} hour{item !== 1 ? 's' : ''} ago</p>
                      </div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Matched
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-md">
            <CardHeader className="bg-invoice-navy text-white">
              <CardTitle className="flex items-center text-lg">
                <Database className="mr-2" />
                Database Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-md border">
                    <p className="text-sm text-gray-500">Total Invoices</p>
                    <p className="text-2xl font-bold mt-1">257</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-md border">
                    <p className="text-sm text-gray-500">Total Amount</p>
                    <p className="text-2xl font-bold mt-1">$428,950</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md border">
                  <div className="mb-2 flex justify-between items-center">
                    <p className="text-sm font-medium">Invoice Status</p>
                  </div>
                  <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div className="flex h-full">
                      <div className="bg-green-500 h-full w-[65%]"></div>
                      <div className="bg-yellow-500 h-full w-[20%]"></div>
                      <div className="bg-red-500 h-full w-[15%]"></div>
                    </div>
                  </div>
                  <div className="flex justify-between mt-2 text-xs">
                    <span className="flex items-center">
                      <span className="h-2 w-2 bg-green-500 rounded-full mr-1"></span>
                      Paid (65%)
                    </span>
                    <span className="flex items-center">
                      <span className="h-2 w-2 bg-yellow-500 rounded-full mr-1"></span>
                      Pending (20%)
                    </span>
                    <span className="flex items-center">
                      <span className="h-2 w-2 bg-red-500 rounded-full mr-1"></span>
                      Overdue (15%)
                    </span>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md border">
                  <div className="mb-2 flex justify-between items-center">
                    <p className="text-sm font-medium">Top Vendors</p>
                  </div>
                  <div className="space-y-2">
                    {['Acme Supplies', 'TechCorp', 'Office Depot'].map((vendor, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-sm">{vendor}</span>
                        <span className="text-sm font-medium">${(Math.random() * 10000).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card className="shadow-md">
          <CardHeader className="bg-invoice-navy text-white">
            <CardTitle className="flex items-center text-lg">
              <Search className="mr-2" />
              Quick Access
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-invoice-light p-6 rounded-md border border-invoice-teal/20 hover:shadow-md transition-shadow cursor-pointer">
                <div className="w-12 h-12 bg-invoice-teal rounded-full flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-medium mb-1">Process Invoices</h3>
                <p className="text-sm text-gray-600">Scan and extract invoice data</p>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-md border border-blue-200/20 hover:shadow-md transition-shadow cursor-pointer">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mb-4">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-medium mb-1">Email Integration</h3>
                <p className="text-sm text-gray-600">Configure email settings</p>
              </div>
              
              <div className="bg-purple-50 p-6 rounded-md border border-purple-200/20 hover:shadow-md transition-shadow cursor-pointer">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mb-4">
                  <Database className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-medium mb-1">Database Connection</h3>
                <p className="text-sm text-gray-600">Configure database settings</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;
