import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const LocationInput = ({ 
  value = '', 
  onChange, 
  error = null,
  disabled = false 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(value);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  const locationSuggestions = [
    { id: 'bangalore', name: 'Bangalore', state: 'Karnataka', type: 'city' },
    { id: 'mumbai', name: 'Mumbai', state: 'Maharashtra', type: 'city' },
    { id: 'delhi', name: 'Delhi', state: 'Delhi', type: 'city' },
    { id: 'gurgaon', name: 'Gurgaon', state: 'Haryana', type: 'city' },
    { id: 'noida', name: 'Noida', state: 'Uttar Pradesh', type: 'city' },
    { id: 'pune', name: 'Pune', state: 'Maharashtra', type: 'city' },
    { id: 'hyderabad', name: 'Hyderabad', state: 'Telangana', type: 'city' },
    { id: 'chennai', name: 'Chennai', state: 'Tamil Nadu', type: 'city' },
    { id: 'kolkata', name: 'Kolkata', state: 'West Bengal', type: 'city' },
    { id: 'ahmedabad', name: 'Ahmedabad', state: 'Gujarat', type: 'city' },
    { id: 'jaipur', name: 'Jaipur', state: 'Rajasthan', type: 'city' },
    { id: 'lucknow', name: 'Lucknow', state: 'Uttar Pradesh', type: 'city' },
    { id: 'kochi', name: 'Kochi', state: 'Kerala', type: 'city' },
    { id: 'indore', name: 'Indore', state: 'Madhya Pradesh', type: 'city' },
    { id: 'chandigarh', name: 'Chandigarh', state: 'Chandigarh', type: 'city' },
    { id: 'coimbatore', name: 'Coimbatore', state: 'Tamil Nadu', type: 'city' },
    { id: 'vadodara', name: 'Vadodara', state: 'Gujarat', type: 'city' },
    { id: 'nagpur', name: 'Nagpur', state: 'Maharashtra', type: 'city' },
    { id: 'visakhapatnam', name: 'Visakhapatnam', state: 'Andhra Pradesh', type: 'city' },
    { id: 'bhubaneswar', name: 'Bhubaneswar', state: 'Odisha', type: 'city' },
    { id: 'remote', name: 'Remote Work', state: 'Work from anywhere', type: 'remote' },
    { id: 'hybrid', name: 'Hybrid Work', state: 'Flexible location', type: 'hybrid' },
    { id: 'anywhere', name: 'Open to Relocate', state: 'Any location in India', type: 'flexible' }
  ];

  const filteredLocations = locationSuggestions?.filter(location =>
    location?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    location?.state?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setSearchTerm(value);
  }, [value]);

  const handleInputChange = (e) => {
    const newValue = e?.target?.value;
    setSearchTerm(newValue);
    onChange(newValue);
    setIsOpen(true);
  };

  const handleLocationSelect = (location) => {
    const locationText = location?.type === 'city' 
      ? `${location?.name}, ${location?.state}`
      : location?.name;
    
    setSearchTerm(locationText);
    onChange(locationText);
    setIsOpen(false);
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const getLocationIcon = (type) => {
    switch (type) {
      case 'remote':
        return 'Wifi';
      case 'hybrid':
        return 'MapPin';
      case 'flexible':
        return 'Globe';
      default:
        return 'MapPin';
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-foreground">
        Preferred Location / पसंदीदा स्थान <span className="text-error">*</span>
      </label>
      <div className="relative" ref={dropdownRef}>
        <div className="relative">
          <Icon 
            name="MapPin" 
            size={18} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" 
          />
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            placeholder="Enter city, state or work preference / शहर, राज्य या कार्य प्राथमिकता दर्ज करें"
            disabled={disabled}
            className={`
              w-full pl-10 pr-10 py-3 border rounded-lg bg-input transition-smooth
              focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
              ${error ? 'border-error' : 'border-border hover:border-primary'}
              ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          />
          {searchTerm && !disabled && (
            <button
              type="button"
              onClick={() => {
                setSearchTerm('');
                onChange('');
                inputRef?.current?.focus();
              }}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-foreground transition-smooth"
            >
              <Icon name="X" size={16} />
            </button>
          )}
        </div>

        {/* Dropdown Suggestions */}
        {isOpen && filteredLocations?.length > 0 && (
          <div className="absolute z-50 w-full mt-1 bg-background border border-border rounded-lg shadow-elevated max-h-60 overflow-y-auto">
            {filteredLocations?.map((location) => (
              <button
                key={location?.id}
                type="button"
                onClick={() => handleLocationSelect(location)}
                className="w-full text-left px-4 py-3 hover:bg-muted transition-smooth flex items-center space-x-3 border-b border-border last:border-b-0"
              >
                <Icon 
                  name={getLocationIcon(location?.type)} 
                  size={16} 
                  className="text-text-secondary flex-shrink-0" 
                />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-foreground truncate">
                    {location?.name}
                  </div>
                  <div className="text-xs text-text-secondary truncate">
                    {location?.state}
                  </div>
                </div>
                {location?.type !== 'city' && (
                  <span className={`
                    px-2 py-1 text-xs rounded-full flex-shrink-0
                    ${location?.type === 'remote' ? 'bg-accent/10 text-accent' : 
                      location?.type === 'hybrid'? 'bg-warning/10 text-warning' : 'bg-success/10 text-success'}
                  `}>
                    {location?.type === 'remote' ? 'Remote' : 
                     location?.type === 'hybrid' ? 'Hybrid' : 'Flexible'}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
      {/* Error Message */}
      {error && (
        <div className="flex items-center space-x-1 text-sm text-error">
          <Icon name="AlertCircle" size={16} />
          <span>{error}</span>
        </div>
      )}
      {/* Description */}
      <p className="text-xs text-text-secondary">
        Enter your preferred work location or select from suggestions / अपना पसंदीदा कार्य स्थान दर्ज करें या सुझावों से चुनें
      </p>
    </div>
  );
};

export default LocationInput;