
import React from 'react';
import Layout from '@/components/layout/Layout';
import InvoiceExtractor from '@/components/invoice/InvoiceExtractor';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { FileUp, Plus } from 'lucide-react';

const InvoicesPage = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Invoice Processing</h1>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              className="flex items-center"
            >
              <FileUp className="h-4 w-4 mr-2" />
              Upload Invoice
            </Button>
            <Button 
              className="bg-invoice-navy hover:bg-invoice-navy/90 flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Manually
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="extraction">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="extraction">AI Extraction</TabsTrigger>
            <TabsTrigger value="history">Processing History</TabsTrigger>
          </TabsList>
          <TabsContent value="extraction" className="mt-4 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-md">
                <CardHeader className="bg-invoice-navy text-white">
                  <CardTitle className="flex items-center">
                    Manual Upload
                  </CardTitle>
                </CardHeader>
                <CardContent className="py-6">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                    <div className="mx-auto h-12 w-12 text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    <div className="mt-4">
                      <span className="mt-2 block text-sm font-medium text-gray-900">
                        Drag and drop PDF invoices here, or click to browse
                      </span>
                      <p className="mt-1 text-xs text-gray-500">
                        PDF files up to 10MB
                      </p>
                    </div>
                    <Button className="mt-4">Choose File</Button>
                  </div>
                </CardContent>
              </Card>
              
              <InvoiceExtractor />
            </div>
          </TabsContent>
          <TabsContent value="history" className="mt-4">
            <Card className="shadow-md">
              <CardHeader className="bg-invoice-navy text-white">
                <CardTitle className="flex items-center">
                  Processing History
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className="p-4 hover:bg-gray-50">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-medium">Invoice #{Math.floor(1000 + Math.random() * 9000)}</h3>
                        <span className="text-xs text-gray-500">
                          {index === 0 ? 'Today' : `${index} day${index > 1 ? 's' : ''} ago`}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {['Acme Corp', 'TechServices Inc.', 'Global Supplies', 'Office Solutions', 'Marketing Agency'][index]}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">
                          ${(Math.random() * 1000 + 100).toFixed(2)}
                        </div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          index % 3 === 0 
                            ? 'bg-green-100 text-green-800' 
                            : index % 3 === 1 
                              ? 'bg-yellow-100 text-yellow-800' 
                              : 'bg-blue-100 text-blue-800'
                        }`}>
                          {index % 3 === 0 ? 'Matched' : index % 3 === 1 ? 'Pending' : 'New Entry'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default InvoicesPage;
