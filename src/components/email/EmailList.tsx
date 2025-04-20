
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Search, Filter, RefreshCw, Paperclip, FileText } from 'lucide-react';
import { useToast } from '@/components/ui/toast';

// Mock email data
const mockEmails = [
  {
    id: 1,
    sender: 'invoices@acmesupplies.com',
    subject: 'Invoice #AC-2023-04589 for April Supplies',
    date: '2025-04-15T10:45:00',
    hasAttachment: true,
    isRead: false,
    isProcessed: false
  },
  {
    id: 2,
    sender: 'billing@techcorp.com',
    subject: 'Your TechCorp Invoice #TC-9876',
    date: '2025-04-14T08:30:00',
    hasAttachment: true,
    isRead: true,
    isProcessed: true
  },
  {
    id: 3,
    sender: 'payments@officedepot.com',
    subject: 'Office Depot: Payment Reminder for Invoice #OD-123456',
    date: '2025-04-12T14:20:00',
    hasAttachment: true,
    isRead: true,
    isProcessed: false
  },
  {
    id: 4,
    sender: 'accounting@globalservices.net',
    subject: 'Monthly Service Invoice - April 2025',
    date: '2025-04-10T11:15:00',
    hasAttachment: true,
    isRead: false,
    isProcessed: false
  },
  {
    id: 5,
    sender: 'noreply@salesforce.com',
    subject: 'Salesforce Subscription: Invoice #SF-20250408-776',
    date: '2025-04-08T09:00:00',
    hasAttachment: true,
    isRead: true,
    isProcessed: true
  }
];

interface EmailListProps {
  onSelectEmail: (email: any) => void;
}

const EmailList: React.FC<EmailListProps> = ({ onSelectEmail }) => {
  const { toast } = useToast();
  const [emails, setEmails] = useState(mockEmails);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleRefresh = () => {
    setIsLoading(true);
    // Simulate fetching new emails
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Success",
        description: "Email list refreshed successfully",
      });
    }, 1500);
  };

  const filteredEmails = emails.filter(email => 
    email.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    email.sender.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric'
    });
  };

  return (
    <Card className="shadow-md h-full">
      <CardHeader className="bg-invoice-navy text-white flex flex-row items-center justify-between py-4">
        <CardTitle className="flex items-center text-lg">
          <Mail className="mr-2" size={20} />
          Invoice Emails
        </CardTitle>
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-white hover:bg-invoice-navy/80"
            onClick={handleRefresh}
            disabled={isLoading}
          >
            <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-invoice-navy/80">
            <Filter size={16} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="p-3 border-b">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search emails..." 
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="divide-y max-h-[400px] overflow-y-auto">
          {filteredEmails.length > 0 ? (
            filteredEmails.map((email) => (
              <div 
                key={email.id} 
                className={`p-3 hover:bg-gray-50 cursor-pointer transition-colors ${!email.isRead ? 'bg-blue-50' : ''}`}
                onClick={() => onSelectEmail(email)}
              >
                <div className="flex justify-between items-start mb-1">
                  <div className="font-medium text-gray-800 truncate max-w-[70%]">{email.sender}</div>
                  <div className="text-xs text-gray-500">{formatDate(email.date)}</div>
                </div>
                <div className="text-sm text-gray-600 mb-1 truncate">{email.subject}</div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {email.hasAttachment && (
                      <span className="flex items-center text-xs text-gray-500">
                        <Paperclip size={12} className="mr-1" />
                        PDF
                      </span>
                    )}
                  </div>
                  {email.isProcessed && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                      <FileText size={10} className="mr-1" />
                      Processed
                    </span>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="p-6 text-center text-gray-500">
              No emails found matching your search
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EmailList;
