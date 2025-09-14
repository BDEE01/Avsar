import React from 'react';
import Icon from '../../../components/AppIcon';

const RecommendationStats = ({ totalRecommendations, averageMatch, topSector, lastUpdated }) => {
  const stats = [
    {
      label: 'Total Matches',
      value: totalRecommendations,
      icon: 'Target',
      color: 'text-primary bg-blue-50'
    },
    {
      label: 'Average Match',
      value: `${averageMatch}%`,
      icon: 'TrendingUp',
      color: 'text-success bg-green-50'
    },
    {
      label: 'Top Sector',
      value: topSector,
      icon: 'Building',
      color: 'text-secondary bg-purple-50'
    },
    {
      label: 'Last Updated',
      value: lastUpdated,
      icon: 'Clock',
      color: 'text-accent bg-amber-50'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats?.map((stat, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-4 shadow-soft">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${stat?.color}`}>
              <Icon name={stat?.icon} size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-text-secondary truncate">{stat?.label}</p>
              <p className="text-lg font-semibold text-text-primary truncate">{stat?.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecommendationStats;