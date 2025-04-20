
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Mail, AlertTriangle, Clock } from 'lucide-react';

const StatCards = () => {
  const stats = [
    {
      title: 'Processed Invoices',
      value: '128',
      icon: <FileText className="h-5 w-5 text-invoice-teal" />,
      change: '+12% from last month',
      isPositive: true,
    },
    {
      title: 'Invoice Emails',
      value: '45',
      icon: <Mail className="h-5 w-5 text-invoice-navy" />,
      change: '8 unprocessed',
      isPositive: false,
    },
    {
      title: 'Database Matches',
      value: '92%',
      icon: <AlertTriangle className="h-5 w-5 text-amber-500" />,
      change: '8% requiring review',
      isPositive: false,
    },
    {
      title: 'Average Process Time',
      value: '1.4 min',
      icon: <Clock className="h-5 w-5 text-blue-500" />,
      change: '-20% from last month',
      isPositive: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
              <div className="w-8 h-8 rounded-md bg-gray-100 flex items-center justify-center">
                {stat.icon}
              </div>
            </div>
            <div className={`mt-2 text-xs ${stat.isPositive ? 'text-green-600' : 'text-gray-500'}`}>
              {stat.change}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatCards;
