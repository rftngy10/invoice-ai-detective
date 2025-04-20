
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, Download, FileText, AlertCircle, CheckCircle, Loader } from 'lucide-react';
import { useToast } from '@/components/ui/toast';

interface EmailDetailsProps {
  email: any | null;
  onProcess: (email: any) => void;
}

const EmailDetails: React.FC<EmailDetailsProps> = ({ email, onProcess }) => {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleProcessEmail = () => {
    if (!email) return;

    setIsProcessing(true);
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      onProcess(email);
      toast({
        title: "Success",
        description: "Email processed successfully. Invoice data extracted.",
      });
    }, 2500);
  };

  if (!email) {
    return (
      <Card className="shadow-md h-full flex items-center justify-center">
        <div className="text-center p-8 text-gray-500">
          <FileText className="mx-auto h-12 w-12 opacity-50 mb-4" />
          <p>Select an email to view details</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="shadow-md h-full flex flex-col">
      <CardHeader className="bg-invoice-navy text-white">
        <CardTitle className="text-lg truncate">{email.subject}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto py-4">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">From</p>
              <p className="font-medium">{email.sender}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Date</p>
              <p>{new Date(email.date).toLocaleString()}</p>
            </div>
          </div>

          <hr className="my-4" />

          <div className="space-y-2">
            <p className="text-sm text-gray-500">Attachments</p>
            <div className="bg-gray-50 p-3 rounded-md border flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-red-100 rounded flex items-center justify-center mr-3">
                  <FileText className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="font-medium">Invoice.pdf</p>
                  <p className="text-xs text-gray-500">245 KB</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button size="sm" variant="ghost">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-3 mt-6">
            <h3 className="font-medium">Email Content</h3>
            <div className="bg-gray-50 p-4 rounded-md border text-sm">
              <p>Dear Customer,</p>
              <br />
              <p>Please find attached the invoice for your recent purchase.</p>
              <br />
              <p>Invoice Number: INV-{Math.floor(1000 + Math.random() * 9000)}</p>
              <p>Due Date: {new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
              <br />
              <p>If you have any questions, please don't hesitate to contact us.</p>
              <br />
              <p>Best regards,</p>
              <p>Accounting Department</p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t bg-gray-50">
        <div className="w-full flex items-center justify-between">
          {email.isProcessed ? (
            <div className="flex items-center text-green-600">
              <CheckCircle className="h-4 w-4 mr-2" />
              <span>Invoice already processed</span>
            </div>
          ) : (
            <>
              <div className="flex items-center text-amber-600">
                <AlertCircle className="h-4 w-4 mr-2" />
                <span>Invoice needs processing</span>
              </div>
              <Button 
                onClick={handleProcessEmail}
                disabled={isProcessing}
                className="bg-invoice-teal hover:bg-invoice-teal/90"
              >
                {isProcessing ? (
                  <>
                    <Loader className="h-4 w-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <FileText className="h-4 w-4 mr-2" />
                    Process Invoice
                  </>
                )}
              </Button>
            </>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default EmailDetails;
