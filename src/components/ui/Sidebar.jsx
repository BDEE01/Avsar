import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = ({ isCollapsed = false, onToggle }) => {
  const location = useLocation();

  const navigationItems = [
    {
      name: 'Profile Setup',
      path: '/user-profile-setup',
      icon: 'User',
      description: 'Complete your profile'
    },
    {
      name: 'Recommendations',
      path: '/internship-recommendations',
      icon: 'Target',
      description: 'AI-powered matches'
    },
    {
      name: 'Data Management',
      path: '/data-upload-management',
      icon: 'Database',
      description: 'Upload and manage data'
    },
    {
      name: 'History',
      path: '/recommendation-history',
      icon: 'History',
      description: 'View past recommendations'
    },
    {
      name: 'Authentication',
      path: '/authentication-portal',
      icon: 'Shield',
      description: 'Security settings'
    },
  ];

  const isActivePath = (path) => location?.pathname === path;

  return (
    <aside
      className={`fixed left-0 top-16 bottom-0 z-70 bg-surface border-r border-border transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Toggle Button */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          {!isCollapsed && (
            <h2 className="text-sm font-semibold text-text-primary">Navigation</h2>
          )}
          <Button
            variant="ghost"
            size="icon"
            iconName={isCollapsed ? 'ChevronRight' : 'ChevronLeft'}
            onClick={onToggle}
            className="ml-auto"
          />
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4 space-y-2">
          {navigationItems?.map((item) => (
            <Link
              key={item?.path}
              to={item?.path}
              className={`group flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium transition-smooth ${
                isActivePath(item?.path)
                  ? 'bg-primary text-primary-foreground shadow-soft'
                  : 'text-text-secondary hover:text-text-primary hover:bg-muted'
              }`}
              title={isCollapsed ? item?.name : ''}
            >
              <Icon
                name={item?.icon}
                size={20}
                className={`flex-shrink-0 ${
                  isActivePath(item?.path) ? 'text-primary-foreground' : ''
                }`}
              />
              
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{item?.name}</div>
                  <div className="text-xs opacity-75 truncate">{item?.description}</div>
                </div>
              )}
              
              {!isCollapsed && isActivePath(item?.path) && (
                <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0" />
              )}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          {!isCollapsed ? (
            <div className="text-xs text-text-secondary">
              <div className="font-medium mb-1">Avsar AI Platform</div>
              <div>Government Internship Portal</div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Zap" size={16} className="text-primary-foreground" />
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;