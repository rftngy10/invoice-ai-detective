
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Database, Check, X, ArrowRight } from 'lucide-react';
import { useToast } from '@/components/ui/toast';

interface InvoiceData {
  invoiceNumber: string;
  date: string;
  dueDate: string;
  vendor: string;
  amount: number;
  currency: string;
  items: { description: string; quantity: number; unitPrice: number; total: number }[];
  status: 'pending' | 'matched' | 'unmatched';
}

interface InvoiceExtractorProps {
  invoiceData?: InvoiceData | null;
}

const mockInvoiceData: InvoiceData = {
  invoiceNumber: 'INV-2025-4862',
  date: '2025-04-15',
  dueDate: '2025-05-15',
  vendor: 'Acme Supplies Inc.',
  amount: 1250.75,
  currency: 'USD',
  items: [
    { description: 'Office Supplies - Paper', quantity: 10, unitPrice: 45.50, total: 455.00 },
    { description: 'Printer Toner', quantity: 2, unitPrice: 120.00, total: 240.00 },
    { description: 'Desk Organizers', quantity: 5, unitPrice: 35.75, total: 178.75 },
    { description: 'Shipping & Handling', quantity: 1, unitPrice: 75.00, total: 75.00 }
  ],
  status: 'pending'
};

const InvoiceExtractor: React.FC<InvoiceExtractorProps> = ({ invoiceData = null }) => {
  const { toast } = useToast();
  const [extractedData, setExtractedData] = useState<InvoiceData | null>(invoiceData || mockInvoiceData);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<'matched' | 'unmatched' | null>(null);

  const handleSearchDatabase = () => {
    if (!extractedData) return;
    
    setIsSearching(true);
    
    // Simulate database search
    setTimeout(() => {
      // Randomly decide if we found a match (for demo purposes)
      const found = Math.random() > 0.5;
      setSearchResult(found ? 'matched' : 'unmatched');
      
      setExtractedData({
        ...extractedData,
        status: found ? 'matched' : 'unmatched'
      });
      
      setIsSearching(false);
      
      toast({
        title: found ? "Match Found" : "No Match Found",
        description: found 
          ? "Invoice matched successfully in the database."
          : "No matching invoice found in the database.",
        variant: found ? "default" : "destructive",
      });
    }, 2000);
  };

  if (!extractedData) {
    return (
      <Card className="shadow-md">
        <CardHeader className="bg-invoice-navy text-white">
          <CardTitle className="flex items-center">
            <FileText className="mr-2" />
            Invoice Extraction
          </CardTitle>
        </CardHeader>
        <CardContent className="py-12">
          <div className="text-center">
            <FileText className="h-12 w-12 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">No invoice data to process</p>
            <p className="text-sm text-gray-400 mt-2">
              Process an email to extract invoice data
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-md">
      <CardHeader className="bg-invoice-navy text-white">
        <CardTitle className="flex items-center">
          <FileText className="mr-2" />
          Invoice Data Extraction
        </CardTitle>
      </CardHeader>
      <CardContent className="divide-y divide-gray-200">
        <div className="py-4">
          <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mb-4">
            <p className="text-blue-800 font-medium flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              AI-Extracted Invoice Data
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-500">Invoice Number</p>
              <p className="font-medium">{extractedData.invoiceNumber}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Vendor</p>
              <p className="font-medium">{extractedData.vendor}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Date</p>
              <p className="font-medium">{new Date(extractedData.date).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Due Date</p>
              <p className="font-medium">{new Date(extractedData.dueDate).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Amount</p>
              <p className="font-medium">{extractedData.amount.toLocaleString('en-US', {
                style: 'currency',
                currency: extractedData.currency
              })}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <div className="flex items-center mt-1">
                {extractedData.status === 'matched' ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <Check className="h-3 w-3 mr-1" />
                    Matched
                  </span>
                ) : extractedData.status === 'unmatched' ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    <X className="h-3 w-3 mr-1" />
                    Not Found
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    Pending
                  </span>
                )}
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-md border p-3">
            <h3 className="font-medium mb-2">Line Items</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Qty
                    </th>
                    <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Unit Price
                    </th>
                    <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {extractedData.items.map((item, index) => (
                    <tr key={index}>
                      <td className="px-3 py-2 whitespace-nowrap">
                        {item.description}
                      </td>
                      <td className="px-3 py-2 text-right whitespace-nowrap">
                        {item.quantity}
                      </td>
                      <td className="px-3 py-2 text-right whitespace-nowrap">
                        {item.unitPrice.toLocaleString('en-US', {
                          style: 'currency',
                          currency: extractedData.currency
                        })}
                      </td>
                      <td className="px-3 py-2 text-right whitespace-nowrap">
                        {item.total.toLocaleString('en-US', {
                          style: 'currency',
                          currency: extractedData.currency
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-50">
                  <tr>
                    <td colSpan={3} className="px-3 py-2 text-right font-medium">
                      Total
                    </td>
                    <td className="px-3 py-2 text-right font-medium">
                      {extractedData.amount.toLocaleString('en-US', {
                        style: 'currency',
                        currency: extractedData.currency
                      })}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
        
        <div className="py-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium flex items-center">
                <Database className="h-4 w-4 mr-2" />
                Database Matching
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Check if this invoice exists in the database
              </p>
            </div>
            <Button
              onClick={handleSearchDatabase}
              disabled={isSearching || extractedData.status !== 'pending'}
              className="bg-invoice-teal hover:bg-invoice-teal/90"
            >
              {isSearching ? (
                <>
                  <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                  Searching...
                </>
              ) : extractedData.status !== 'pending' ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Already Processed
                </>
              ) : (
                <>
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Check Database
                </>
              )}
            </Button>
          </div>
          
          {searchResult && (
            <div className={`mt-4 p-3 rounded-md ${
              searchResult === 'matched' 
                ? 'bg-green-50 border border-green-200' 
                : 'bg-red-50 border border-red-200'
            }`}>
              {searchResult === 'matched' ? (
                <div className="flex items-center text-green-800">
                  <Check className="h-5 w-5 mr-2" />
                  <div>
                    <p className="font-medium">Invoice found in database</p>
                    <p className="text-sm">Invoice #{extractedData.invoiceNumber} matches a record in your system</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center text-red-800">
                  <X className="h-5 w-5 mr-2" />
                  <div>
                    <p className="font-medium">No matching invoice found</p>
                    <p className="text-sm">This invoice doesn't exist in your database yet</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default InvoiceExtractor;
