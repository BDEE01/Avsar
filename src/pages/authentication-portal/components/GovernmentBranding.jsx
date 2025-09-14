import React from 'react';
import Icon from '../../../components/AppIcon';

const GovernmentBranding = ({ language }) => {
  const labels = {
    en: {
      scheme: 'PM Internship Scheme',
      tagline: 'Empowering Youth Through Skills & Opportunities',
      trust: 'Trusted by Government of India',
      secure: 'Secure & Verified Platform'
    },
    hi: {
      scheme: 'पीएम इंटर्नशिप योजना',
      tagline: 'कौशल और अवसरों के माध्यम से युवाओं को सशक्त बनाना',
      trust: 'भारत सरकार द्वारा विश्वसनीय',
      secure: 'सुरक्षित और सत्यापित प्लेटफॉर्म'
    }
  };

  const t = labels?.[language] || labels?.en;

  return (
    <div className="text-center mb-8">
      {/* Government Logo */}
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-green-600 rounded-full flex items-center justify-center shadow-elevated">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-white"
          >
            <path
              d="M12 2L2 7L12 12L22 7L12 2Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 17L12 22L22 17"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 12L12 17L22 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      {/* Scheme Title */}
      <h1 className="text-2xl font-bold text-text-primary mb-2">
        {t?.scheme}
      </h1>
      {/* Tagline */}
      <p className="text-text-secondary text-sm mb-6 max-w-md mx-auto">
        {t?.tagline}
      </p>
      {/* Trust Signals */}
      <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-xs text-text-secondary">
        <div className="flex items-center space-x-2">
          <Icon name="Shield" size={16} className="text-success" />
          <span>{t?.secure}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Award" size={16} className="text-primary" />
          <span>{t?.trust}</span>
        </div>
      </div>
    </div>
  );
};

export default GovernmentBranding;