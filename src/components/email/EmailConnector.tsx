
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Mail, Lock, RefreshCw } from 'lucide-react';
import { useToast } from '@/components/ui/toast';

const EmailConnector = () => {
  const { toast } = useToast();
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleConnect = () => {
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please enter both email and password",
        variant: "destructive",
      });
      return;
    }

    setIsConnecting(true);
    
    // Simulate connection
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
      toast({
        title: "Success",
        description: "Connected to Outlook successfully",
      });
    }, 2000);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setEmail('');
    setPassword('');
    toast({
      title: "Disconnected",
      description: "Outlook connection has been removed",
    });
  };

  return (
    <Card className="shadow-md">
      <CardHeader className="bg-invoice-navy text-white">
        <CardTitle className="flex items-center">
          <Mail className="mr-2" />
          Outlook Connection
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        {isConnected ? (
          <div className="space-y-4">
            <div className="bg-green-50 p-3 rounded-md border border-green-200 flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <span className="text-green-800">Connected to Outlook</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Connected Account</p>
                <p className="font-medium">{email}</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex items-center">
                  <RefreshCw className="h-4 w-4 mr-1" />
                  Refresh
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={handleDisconnect}
                >
                  Disconnect
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="text-gray-500" size={18} />
                <Input
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Lock className="text-gray-500" size={18} />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <Button 
              className="w-full bg-invoice-navy hover:bg-invoice-navy/90"
              onClick={handleConnect}
              disabled={isConnecting}
            >
              {isConnecting ? (
                <>
                  <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                  Connecting...
                </>
              ) : (
                "Connect to Outlook"
              )}
            </Button>
            <p className="text-xs text-gray-500 text-center">
              Connects to your Outlook account to scan for invoice emails
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EmailConnector;
