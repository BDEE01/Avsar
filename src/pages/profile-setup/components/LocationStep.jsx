import React from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const LocationStep = ({ 
  formData, 
  errors, 
  onChange, 
  currentLanguage = 'en' 
}) => {
  const getLabel = (en, hi) => {
    return currentLanguage === 'hi' ? hi : en;
  };

  const handleInputChange = (field, value) => {
    onChange('location', field, value);
  };

  const states = [
    { value: 'andhra-pradesh', label: getLabel('Andhra Pradesh', 'आंध्र प्रदेश') },
    { value: 'arunachal-pradesh', label: getLabel('Arunachal Pradesh', 'अरुणाचल प्रदेश') },
    { value: 'assam', label: getLabel('Assam', 'असम') },
    { value: 'bihar', label: getLabel('Bihar', 'बिहार') },
    { value: 'chhattisgarh', label: getLabel('Chhattisgarh', 'छत्तीसगढ़') },
    { value: 'delhi', label: getLabel('Delhi', 'दिल्ली') },
    { value: 'goa', label: getLabel('Goa', 'गोवा') },
    { value: 'gujarat', label: getLabel('Gujarat', 'गुजरात') },
    { value: 'haryana', label: getLabel('Haryana', 'हरियाणा') },
    { value: 'himachal-pradesh', label: getLabel('Himachal Pradesh', 'हिमाचल प्रदेश') },
    { value: 'jharkhand', label: getLabel('Jharkhand', 'झारखंड') },
    { value: 'karnataka', label: getLabel('Karnataka', 'कर्नाटक') },
    { value: 'kerala', label: getLabel('Kerala', 'केरल') },
    { value: 'madhya-pradesh', label: getLabel('Madhya Pradesh', 'मध्य प्रदेश') },
    { value: 'maharashtra', label: getLabel('Maharashtra', 'महाराष्ट्र') },
    { value: 'manipur', label: getLabel('Manipur', 'मणिपुर') },
    { value: 'meghalaya', label: getLabel('Meghalaya', 'मेघालय') },
    { value: 'mizoram', label: getLabel('Mizoram', 'मिजोरम') },
    { value: 'nagaland', label: getLabel('Nagaland', 'नागालैंड') },
    { value: 'odisha', label: getLabel('Odisha', 'ओडिशा') },
    { value: 'punjab', label: getLabel('Punjab', 'पंजाब') },
    { value: 'rajasthan', label: getLabel('Rajasthan', 'राजस्थान') },
    { value: 'sikkim', label: getLabel('Sikkim', 'सिक्किम') },
    { value: 'tamil-nadu', label: getLabel('Tamil Nadu', 'तमिल नाडु') },
    { value: 'telangana', label: getLabel('Telangana', 'तेलंगाना') },
    { value: 'tripura', label: getLabel('Tripura', 'त्रिपुरा') },
    { value: 'uttar-pradesh', label: getLabel('Uttar Pradesh', 'उत्तर प्रदेश') },
    { value: 'uttarakhand', label: getLabel('Uttarakhand', 'उत्तराखंड') },
    { value: 'west-bengal', label: getLabel('West Bengal', 'पश्चिम बंगाल') }
  ];

  const majorCities = [
    { value: 'mumbai', label: getLabel('Mumbai', 'मुंबई') },
    { value: 'delhi', label: getLabel('Delhi', 'दिल्ली') },
    { value: 'bangalore', label: getLabel('Bangalore', 'बैंगलोर') },
    { value: 'hyderabad', label: getLabel('Hyderabad', 'हैदराबाद') },
    { value: 'ahmedabad', label: getLabel('Ahmedabad', 'अहमदाबाद') },
    { value: 'chennai', label: getLabel('Chennai', 'चेन्नई') },
    { value: 'kolkata', label: getLabel('Kolkata', 'कोलकाता') },
    { value: 'surat', label: getLabel('Surat', 'सूरत') },
    { value: 'pune', label: getLabel('Pune', 'पुणे') },
    { value: 'jaipur', label: getLabel('Jaipur', 'जयपुर') },
    { value: 'lucknow', label: getLabel('Lucknow', 'लखनऊ') },
    { value: 'kanpur', label: getLabel('Kanpur', 'कानपुर') },
    { value: 'nagpur', label: getLabel('Nagpur', 'नागपुर') },
    { value: 'indore', label: getLabel('Indore', 'इंदौर') },
    { value: 'thane', label: getLabel('Thane', 'ठाणे') },
    { value: 'bhopal', label: getLabel('Bhopal', 'भोपाल') },
    { value: 'visakhapatnam', label: getLabel('Visakhapatnam', 'विशाखापत्तनम') },
    { value: 'pimpri-chinchwad', label: getLabel('Pimpri-Chinchwad', 'पिंपरी-चिंचवड') },
    { value: 'patna', label: getLabel('Patna', 'पटना') },
    { value: 'vadodara', label: getLabel('Vadodara', 'वडोदरा') }
  ];

  const workModes = [
    { value: 'remote', label: getLabel('Remote Work', 'रिमोट वर्क') },
    { value: 'office', label: getLabel('Office Work', 'ऑफिस वर्क') },
    { value: 'hybrid', label: getLabel('Hybrid (Remote + Office)', 'हाइब्रिड (रिमोट + ऑफिस)') }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          {getLabel('Location Preferences', 'स्थान प्राथमिकताएं')}
        </h2>
        <p className="text-muted-foreground">
          {getLabel('Tell us where you\'d like to work', 'बताएं कि आप कहां काम करना चाहते हैं')}
        </p>
      </div>
      {/* Current Location */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-medium text-foreground mb-4 flex items-center">
          <Icon name="MapPin" size={20} className="mr-2 text-primary" />
          {getLabel('Current Location', 'वर्तमान स्थान')}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label={getLabel('State', 'राज्य')}
            options={states}
            value={formData?.currentState || ''}
            onChange={(value) => handleInputChange('currentState', value)}
            error={errors?.['location.currentState']}
            placeholder={getLabel('Select your state', 'अपना राज्य चुनें')}
            searchable
            required
          />
          
          <Input
            label={getLabel('City', 'शहर')}
            type="text"
            value={formData?.currentCity || ''}
            onChange={(e) => handleInputChange('currentCity', e?.target?.value)}
            error={errors?.['location.currentCity']}
            placeholder={getLabel('Enter your city', 'अपना शहर दर्ज करें')}
            required
          />
        </div>

        <Input
          label={getLabel('Pin Code', 'पिन कोड')}
          type="text"
          value={formData?.pinCode || ''}
          onChange={(e) => handleInputChange('pinCode', e?.target?.value)}
          error={errors?.['location.pinCode']}
          placeholder={getLabel('Enter 6-digit pin code', '6 अंकों का पिन कोड दर्ज करें')}
          className="mt-4"
        />
      </div>
      {/* Work Preferences */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-medium text-foreground mb-4 flex items-center">
          <Icon name="Briefcase" size={20} className="mr-2 text-primary" />
          {getLabel('Work Mode Preferences', 'कार्य मोड प्राथमिकताएं')}
        </h3>
        
        <div className="space-y-3">
          {workModes?.map((mode) => (
            <Checkbox
              key={mode?.value}
              label={mode?.label}
              checked={(formData?.workModes || [])?.includes(mode?.value)}
              onChange={(e) => {
                const currentModes = formData?.workModes || [];
                let updatedModes;
                
                if (e?.target?.checked) {
                  updatedModes = [...currentModes, mode?.value];
                } else {
                  updatedModes = currentModes?.filter(m => m !== mode?.value);
                }
                
                handleInputChange('workModes', updatedModes);
              }}
            />
          ))}
        </div>
      </div>
      {/* Preferred Cities for Work */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-medium text-foreground mb-4 flex items-center">
          <Icon name="Target" size={20} className="mr-2 text-primary" />
          {getLabel('Preferred Cities for Internships', 'इंटर्नशिप के लिए पसंदीदा शहर')}
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          {getLabel('Select cities where you\'d like to find internships', 'उन शहरों का चयन करें जहां आप इंटर्नशिप खोजना चाहते हैं')}
        </p>
        
        <Select
          options={majorCities}
          value={formData?.preferredCities || []}
          onChange={(value) => handleInputChange('preferredCities', value)}
          placeholder={getLabel('Select preferred cities', 'पसंदीदा शहर चुनें')}
          multiple
          searchable
          clearable
        />
      </div>
      {/* Travel Willingness */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-medium text-foreground mb-4 flex items-center">
          <Icon name="Plane" size={20} className="mr-2 text-primary" />
          {getLabel('Travel & Relocation', 'यात्रा और स्थानांतरण')}
        </h3>
        
        <div className="space-y-4">
          <Checkbox
            label={getLabel('Willing to relocate for internship', 'इंटर्नशिप के लिए स्थानांतरित होने को तैयार')}
            checked={formData?.willingToRelocate || false}
            onChange={(e) => handleInputChange('willingToRelocate', e?.target?.checked)}
            description={getLabel('Check if you can move to another city for the right opportunity', 'सही अवसर के लिए दूसरे शहर जाने की तैयारी है तो चेक करें')}
          />
          
          <Checkbox
            label={getLabel('Open to travel for work', 'काम के लिए यात्रा के लिए तैयार')}
            checked={formData?.openToTravel || false}
            onChange={(e) => handleInputChange('openToTravel', e?.target?.checked)}
            description={getLabel('Check if you can travel occasionally for work purposes', 'काम के लिए कभी-कभार यात्रा कर सकते हैं तो चेक करें')}
          />
        </div>
      </div>
      {/* Location Summary */}
      {(formData?.currentCity || formData?.preferredCities?.length > 0) && (
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
          <h4 className="font-medium text-foreground mb-2 flex items-center">
            <Icon name="MapPin" size={16} className="mr-2 text-primary" />
            {getLabel('Location Summary', 'स्थान सारांश')}
          </h4>
          <div className="text-sm text-muted-foreground space-y-1">
            {formData?.currentCity && (
              <p>
                <span className="font-medium">{getLabel('Current:', 'वर्तमान:')}</span> {formData?.currentCity}
                {formData?.currentState && `, ${states?.find(s => s?.value === formData?.currentState)?.label}`}
              </p>
            )}
            {formData?.preferredCities?.length > 0 && (
              <p>
                <span className="font-medium">{getLabel('Preferred:', 'पसंदीदा:')}</span> {formData?.preferredCities?.length} {getLabel('cities selected', 'शहर चुने गए')}
              </p>
            )}
            {formData?.workModes?.length > 0 && (
              <p>
                <span className="font-medium">{getLabel('Work Mode:', 'कार्य मोड:')}</span> {formData?.workModes?.length} {getLabel('options selected', 'विकल्प चुने गए')}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationStep;