
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import EmailConnector from '@/components/email/EmailConnector';
import EmailList from '@/components/email/EmailList';
import EmailDetails from '@/components/email/EmailDetails';
import InvoiceExtractor from '@/components/invoice/InvoiceExtractor';
import { Button } from '@/components/ui/button';
import { Plus, RefreshCw } from 'lucide-react';

const EmailsPage = () => {
  const [selectedEmail, setSelectedEmail] = useState<any | null>(null);
  const [isProcessed, setIsProcessed] = useState(false);

  const handleEmailSelect = (email: any) => {
    setSelectedEmail(email);
    setIsProcessed(email.isProcessed);
  };

  const handleProcessEmail = (email: any) => {
    setIsProcessed(true);
    // Update the email in the list to show as processed
    setSelectedEmail({
      ...email,
      isProcessed: true
    });
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Email Processing</h1>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              className="flex items-center"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button 
              className="bg-invoice-navy hover:bg-invoice-navy/90 flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Connection
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <div className="space-y-6">
              <EmailConnector />
              <EmailList onSelectEmail={handleEmailSelect} />
            </div>
          </div>
          
          <div className="md:col-span-2">
            <div className="space-y-6">
              <EmailDetails 
                email={selectedEmail} 
                onProcess={handleProcessEmail} 
              />
              
              {isProcessed && (
                <InvoiceExtractor />
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EmailsPage;
