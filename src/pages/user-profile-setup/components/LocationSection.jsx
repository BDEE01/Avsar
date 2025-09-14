import React from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const LocationSection = ({ data, onChange, errors, isExpanded, onToggle }) => {
  const stateOptions = [
    { value: 'andhra-pradesh', label: 'Andhra Pradesh / आंध्र प्रदेश' },
    { value: 'bihar', label: 'Bihar / बिहार' },
    { value: 'delhi', label: 'Delhi / दिल्ली' },
    { value: 'gujarat', label: 'Gujarat / गुजरात' },
    { value: 'haryana', label: 'Haryana / हरियाणा' },
    { value: 'karnataka', label: 'Karnataka / कर्नाटक' },
    { value: 'kerala', label: 'Kerala / केरल' },
    { value: 'maharashtra', label: 'Maharashtra / महाराष्ट्र' },
    { value: 'punjab', label: 'Punjab / पंजाब' },
    { value: 'rajasthan', label: 'Rajasthan / राजस्थान' },
    { value: 'tamil-nadu', label: 'Tamil Nadu / तमिल नाडु' },
    { value: 'uttar-pradesh', label: 'Uttar Pradesh / उत्तर प्रदेश' },
    { value: 'west-bengal', label: 'West Bengal / पश्चिम बंगाल' }
  ];

  const cityOptions = {
    'delhi': [
      { value: 'new-delhi', label: 'New Delhi / नई दिल्ली' },
      { value: 'gurgaon', label: 'Gurgaon / गुड़गांव' },
      { value: 'noida', label: 'Noida / नोएडा' }
    ],
    'maharashtra': [
      { value: 'mumbai', label: 'Mumbai / मुंबई' },
      { value: 'pune', label: 'Pune / पुणे' },
      { value: 'nagpur', label: 'Nagpur / नागपुर' }
    ],
    'karnataka': [
      { value: 'bangalore', label: 'Bangalore / बैंगलोर' },
      { value: 'mysore', label: 'Mysore / मैसूर' },
      { value: 'hubli', label: 'Hubli / हुबली' }
    ],
    'default': [
      { value: 'other', label: 'Other / अन्य' }
    ]
  };

  const radiusOptions = [
    { value: '5', label: '5 km - Walking distance / पैदल दूरी' },
    { value: '10', label: '10 km - Bicycle distance / साइकिल दूरी' },
    { value: '25', label: '25 km - Local transport / स्थानीय परिवहन' },
    { value: '50', label: '50 km - Regional area / क्षेत्रीय क्षेत्र' },
    { value: '100', label: '100 km - Extended area / विस्तृत क्षेत्र' },
    { value: 'any', label: 'Anywhere in state / राज्य में कहीं भी' }
  ];

  const handleChange = (field, value) => {
    if (field === 'state') {
      onChange('location', { ...data, [field]: value, city: '' });
    } else {
      onChange('location', { ...data, [field]: value });
    }
  };

  const availableCities = data?.state ? (cityOptions?.[data?.state] || cityOptions?.default) : cityOptions?.default;

  return (
    <div className="bg-card rounded-lg shadow-soft border border-border">
      <div
        className="flex items-center justify-between p-6 cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
            <Icon name="MapPin" size={20} className="text-success" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Location Preferences</h3>
            <p className="text-sm text-text-secondary">स्थान प्राथमिकताएं</p>
          </div>
        </div>
        <Icon
          name={isExpanded ? 'ChevronUp' : 'ChevronDown'}
          size={20}
          className="text-text-secondary"
        />
      </div>
      {isExpanded && (
        <div className="px-6 pb-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Preferred State / पसंदीदा राज्य"
              options={stateOptions}
              value={data?.state}
              onChange={(value) => handleChange('state', value)}
              placeholder="Select state"
              error={errors?.state}
              required
              searchable
            />

            <Select
              label="Preferred City / पसंदीदा शहर"
              options={availableCities}
              value={data?.city}
              onChange={(value) => handleChange('city', value)}
              placeholder="Select city"
              error={errors?.city}
              disabled={!data?.state}
            />
          </div>

          <Input
            label="Current Address / वर्तमान पता"
            type="text"
            value={data?.address}
            onChange={(e) => handleChange('address', e?.target?.value)}
            placeholder="Enter your current address"
            error={errors?.address}
          />

          <Select
            label="Travel Radius / यात्रा त्रिज्या"
            options={radiusOptions}
            value={data?.radius}
            onChange={(value) => handleChange('radius', value)}
            placeholder="How far can you travel?"
            error={errors?.radius}
            required
          />

          {/* Visual Radius Indicator */}
          {data?.radius && data?.radius !== 'any' && (
            <div className="bg-muted rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Navigation" size={16} className="text-primary" />
                <span className="text-sm font-medium text-text-primary">
                  Travel Range: {data?.radius} km
                </span>
              </div>
              <div className="w-full bg-border rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-smooth"
                  style={{ width: `${Math.min((parseInt(data?.radius) / 100) * 100, 100)}%` }}
                />
              </div>
              <p className="text-xs text-text-secondary mt-2">
                This helps us find internships within your preferred travel distance
              </p>
            </div>
          )}

          {/* Location Flexibility Options */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-text-primary">
              Flexibility Options / लचीलेपन के विकल्प
            </h4>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={data?.remoteWork || false}
                  onChange={(e) => handleChange('remoteWork', e?.target?.checked)}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                />
                <span className="text-sm text-text-secondary">
                  Open to remote work / रिमोट वर्क के लिए तैयार
                </span>
              </label>
              
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={data?.relocation || false}
                  onChange={(e) => handleChange('relocation', e?.target?.checked)}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                />
                <span className="text-sm text-text-secondary">
                  Willing to relocate / स्थानांतरित होने को तैयार
                </span>
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationSection;