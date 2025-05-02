import React from 'react';
import { Star, FileText } from 'lucide-react';

interface ActivityItem {
  id: number;
  title: string;
  template: string;
  time: string;
  rating: number;
}

interface ActivityCardProps {
  activities: ActivityItem[];
}

export function ActivityCard({ activities }: ActivityCardProps) {
  return (
    <div className="card mt-6">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
      </div>
      <div className="divide-y divide-gray-200">
        {activities.map((activity) => (
          <div 
            key={activity.id} 
            className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors animate-fade-in"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center group-hover:bg-primary-100 transition-colors">
                <FileText className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 group-hover:text-primary-600 transition-colors">
                  {activity.title}
                </h4>
                <p className="text-sm text-gray-500">Template: {activity.template}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < activity.rating
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">{activity.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}