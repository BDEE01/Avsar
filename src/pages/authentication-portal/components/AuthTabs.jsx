import React from 'react';
import Icon from '../../../components/AppIcon';

const AuthTabs = ({ activeTab, onTabChange, language }) => {
  const labels = {
    en: {
      login: 'Sign In',
      register: 'Register'
    },
    hi: {
      login: 'साइन इन',
      register: 'पंजीकरण'
    }
  };

  const t = labels?.[language] || labels?.en;

  const tabs = [
    { id: 'login', label: t?.login, icon: 'LogIn' },
    { id: 'register', label: t?.register, icon: 'UserPlus' }
  ];

  return (
    <div className="flex bg-muted rounded-lg p-1 mb-8">
      {tabs?.map((tab) => (
        <button
          key={tab?.id}
          onClick={() => onTabChange(tab?.id)}
          className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
            activeTab === tab?.id
              ? 'bg-surface text-text-primary shadow-soft'
              : 'text-text-secondary hover:text-text-primary hover:bg-surface/50'
          }`}
        >
          <Icon name={tab?.icon} size={18} />
          <span>{tab?.label}</span>
        </button>
      ))}
    </div>
  );
};

export default AuthTabs;