import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const DashboardSidebar = ({ 
  isCollapsed = false, 
  onToggleCollapse,
  userProfile = {},
  currentLanguage = 'en',
  onProfileRefresh
}) => {
  const location = useLocation();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const sidebarItems = [
    { 
      path: '/recommendations-dashboard', 
      label: 'Dashboard', 
      labelHi: 'डैशबोर्ड',
      icon: 'LayoutDashboard'
    },
    { 
      path: '/profile-setup', 
      label: 'Profile Setup', 
      labelHi: 'प्रोफाइल सेटअप',
      icon: 'UserPlus'
    },
    { 
      path: '/profile-management', 
      label: 'Manage Profile', 
      labelHi: 'प्रोफाइल प्रबंधन',
      icon: 'Settings'
    },
  ];

  const profileActions = [
    { 
      action: 'refresh', 
      label: 'Refresh Recommendations', 
      labelHi: 'सिफारिशें रीफ्रेश करें',
      icon: 'RefreshCw'
    },
    { 
      action: 'edit', 
      label: 'Edit Profile', 
      labelHi: 'प्रोफाइल संपादित करें',
      icon: 'Edit'
    },
  ];

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const getLabel = (item) => {
    return currentLanguage === 'hi' ? item?.labelHi : item?.label;
  };

  const handleProfileAction = (action) => {
    if (action === 'refresh' && onProfileRefresh) {
      onProfileRefresh();
    } else if (action === 'edit') {
      // Navigate to profile management
      window.location.href = '/profile-management';
    }
    setIsProfileMenuOpen(false);
  };

  const getProfileCompletionPercentage = () => {
    if (!userProfile) return 0;
    const fields = ['name', 'email', 'education', 'skills', 'experience'];
    const completedFields = fields?.filter(field => userProfile?.[field]);
    return Math.round((completedFields?.length / fields?.length) * 100);
  };

  const completionPercentage = getProfileCompletionPercentage();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-card border-r border-border z-1000 transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-72'
      } hidden lg:block`}>
        <div className="flex flex-col h-full">
          {/* Collapse Toggle */}
          <div className="p-4 border-b border-border">
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleCollapse}
              className="w-full justify-center"
            >
              <Icon name={isCollapsed ? 'ChevronRight' : 'ChevronLeft'} size={20} />
            </Button>
          </div>

          {/* Profile Summary */}
          {!isCollapsed && (
            <div className="p-4 border-b border-border">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name="User" size={20} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {userProfile?.name || (currentLanguage === 'hi' ? 'उपयोगकर्ता' : 'User')}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {userProfile?.email || (currentLanguage === 'hi' ? 'ईमेल नहीं' : 'No email')}
                  </p>
                </div>
              </div>
              
              {/* Profile Completion */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">
                    {currentLanguage === 'hi' ? 'प्रोफाइल पूर्णता' : 'Profile Completion'}
                  </span>
                  <span className="text-xs font-medium text-foreground">
                    {completionPercentage}%
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${completionPercentage}%` }}
                  ></div>
                </div>
              </div>

              {/* Profile Actions */}
              <div className="mt-3 space-y-1">
                {profileActions?.map((action) => (
                  <Button
                    key={action?.action}
                    variant="ghost"
                    size="sm"
                    onClick={() => handleProfileAction(action?.action)}
                    className="w-full justify-start text-xs"
                  >
                    <Icon name={action?.icon} size={14} className="mr-2" />
                    {getLabel(action)}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Items */}
          <nav className="flex-1 p-4 space-y-2">
            {sidebarItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-micro group ${
                  isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                } ${isCollapsed ? 'justify-center' : ''}`}
              >
                <Icon 
                  name={item?.icon} 
                  size={20} 
                  className={`${isCollapsed ? '' : 'mr-3'} flex-shrink-0`}
                />
                {!isCollapsed && (
                  <span className="truncate">{getLabel(item)}</span>
                )}
              </Link>
            ))}
          </nav>

          {/* Bottom Actions */}
          {!isCollapsed && (
            <div className="p-4 border-t border-border">
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => {
                  // Handle logout
                  console.log('Logout clicked');
                }}
              >
                <Icon name="LogOut" size={16} className="mr-2" />
                {currentLanguage === 'hi' ? 'लॉग आउट' : 'Logout'}
              </Button>
            </div>
          )}
        </div>
      </aside>
      {/* Mobile Sidebar Overlay */}
      <div className={`lg:hidden fixed inset-0 z-1100 ${isCollapsed ? 'pointer-events-none' : ''}`}>
        {/* Backdrop */}
        {!isCollapsed && (
          <div 
            className="absolute inset-0 bg-black/50 transition-opacity"
            onClick={onToggleCollapse}
          />
        )}
        
        {/* Sidebar */}
        <aside className={`absolute left-0 top-0 h-full w-72 bg-card border-r border-border transform transition-transform ${
          isCollapsed ? '-translate-x-full' : 'translate-x-0'
        }`}>
          <div className="flex flex-col h-full pt-16">
            {/* Close Button */}
            <div className="p-4 border-b border-border">
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggleCollapse}
                className="w-full justify-center"
              >
                <Icon name="X" size={20} />
              </Button>
            </div>

            {/* Profile Summary */}
            <div className="p-4 border-b border-border">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name="User" size={20} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {userProfile?.name || (currentLanguage === 'hi' ? 'उपयोगकर्ता' : 'User')}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {userProfile?.email || (currentLanguage === 'hi' ? 'ईमेल नहीं' : 'No email')}
                  </p>
                </div>
              </div>
              
              {/* Profile Completion */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">
                    {currentLanguage === 'hi' ? 'प्रोफाइल पूर्णता' : 'Profile Completion'}
                  </span>
                  <span className="text-xs font-medium text-foreground">
                    {completionPercentage}%
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${completionPercentage}%` }}
                  ></div>
                </div>
              </div>

              {/* Profile Actions */}
              <div className="mt-3 space-y-1">
                {profileActions?.map((action) => (
                  <Button
                    key={action?.action}
                    variant="ghost"
                    size="sm"
                    onClick={() => handleProfileAction(action?.action)}
                    className="w-full justify-start text-xs"
                  >
                    <Icon name={action?.icon} size={14} className="mr-2" />
                    {getLabel(action)}
                  </Button>
                ))}
              </div>
            </div>

            {/* Navigation Items */}
            <nav className="flex-1 p-4 space-y-2">
              {sidebarItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={onToggleCollapse}
                  className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-micro ${
                    isActivePath(item?.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={20} className="mr-3 flex-shrink-0" />
                  <span className="truncate">{getLabel(item)}</span>
                </Link>
              ))}
            </nav>

            {/* Bottom Actions */}
            <div className="p-4 border-t border-border">
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => {
                  // Handle logout
                  console.log('Logout clicked');
                }}
              >
                <Icon name="LogOut" size={16} className="mr-2" />
                {currentLanguage === 'hi' ? 'लॉग आउट' : 'Logout'}
              </Button>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
};

export default DashboardSidebar;