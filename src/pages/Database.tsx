
import React from 'react';
import Layout from '@/components/layout/Layout';
import DatabaseViewer from '@/components/database/DatabaseViewer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link2, Database, Settings } from 'lucide-react';

const DatabasePage = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Database Management</h1>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              className="flex items-center"
            >
              <Settings className="h-4 w-4 mr-2" />
              Configure
            </Button>
            <Button 
              className="bg-invoice-navy hover:bg-invoice-navy/90 flex items-center"
            >
              <Link2 className="h-4 w-4 mr-2" />
              Connect Database
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card className="shadow-md">
              <CardHeader className="bg-invoice-navy text-white">
                <CardTitle className="flex items-center">
                  <Database className="mr-2" />
                  Database Connection
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="bg-green-50 p-3 rounded-md border border-green-200 flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-green-800">Connected to Database</span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Connection Type</span>
                      <span className="font-medium">SQL Database</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Host</span>
                      <span className="font-medium">db.example.com</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Database</span>
                      <span className="font-medium">invoice_system</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Status</span>
                      <span className="text-green-600 font-medium">Online</span>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <Button variant="outline" className="w-full">
                      Test Connection
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-md mt-6">
              <CardHeader className="bg-invoice-navy text-white">
                <CardTitle className="flex items-center">
                  Database Statistics
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-md border">
                      <p className="text-xs text-gray-500">Total Records</p>
                      <p className="text-xl font-bold">257</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-md border">
                      <p className="text-xs text-gray-500">Total Tables</p>
                      <p className="text-xl font-bold">12</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Storage Usage</h3>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div className="h-2 bg-invoice-navy rounded-full w-[35%]"></div>
                    </div>
                    <div className="text-xs text-gray-500 flex justify-between">
                      <span>35% used</span>
                      <span>18.7 MB / 50 MB</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-2">
            <DatabaseViewer />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DatabasePage;
