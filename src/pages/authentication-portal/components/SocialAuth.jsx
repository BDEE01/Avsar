import React from 'react';
import Button from '../../../components/ui/Button';


const SocialAuth = ({ language, onSocialLogin }) => {
  const labels = {
    en: {
      divider: 'Or continue with',
      aadhaar: 'Sign in with Aadhaar',
      digilocker: 'Sign in with DigiLocker',
      mobile: 'Sign in with Mobile OTP'
    },
    hi: {
      divider: 'या इसके साथ जारी रखें',
      aadhaar: 'आधार के साथ साइन इन करें',
      digilocker: 'डिजिलॉकर के साथ साइन इन करें',
      mobile: 'मोबाइल ओटीपी के साथ साइन इन करें'
    }
  };

  const t = labels?.[language] || labels?.en;

  const socialOptions = [
    {
      id: 'aadhaar',
      label: t?.aadhaar,
      icon: 'CreditCard',
      color: 'bg-blue-600 hover:bg-blue-700 text-white'
    },
    {
      id: 'digilocker',
      label: t?.digilocker,
      icon: 'Folder',
      color: 'bg-green-600 hover:bg-green-700 text-white'
    },
    {
      id: 'mobile',
      label: t?.mobile,
      icon: 'Smartphone',
      color: 'bg-orange-600 hover:bg-orange-700 text-white'
    }
  ];

  return (
    <div className="mt-8">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-surface text-text-secondary">
            {t?.divider}
          </span>
        </div>
      </div>
      <div className="mt-6 space-y-3">
        {socialOptions?.map((option) => (
          <Button
            key={option?.id}
            variant="outline"
            size="lg"
            iconName={option?.icon}
            iconPosition="left"
            fullWidth
            onClick={() => onSocialLogin(option?.id)}
            className="justify-center"
          >
            {option?.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SocialAuth;