import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatsCardProps {
  icon: LucideIcon;
  title: string;
  value: string | number;
  trend: number;
  gradientClass: string;
}

export function StatsCard({ icon: Icon, title, value, trend, gradientClass }: StatsCardProps) {
  return (
    <div className="card hover-lift p-6 relative overflow-hidden group">
      <div className={`absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 rounded-full opacity-10 ${gradientClass}`} />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-2 rounded-lg ${gradientClass} bg-opacity-20`}>
            <Icon className={`w-5 h-5 ${gradientClass === 'gradient-primary' ? 'text-primary-600' : 'text-blue-600'}`} />
          </div>
          <div className={`text-sm font-medium ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {trend > 0 ? '+' : ''}{trend}%
          </div>
        </div>
        
        <h3 className="text-2xl font-bold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">
          {value}
        </h3>
        <p className="text-sm text-gray-500">{title}</p>
      </div>
    </div>
  );
}