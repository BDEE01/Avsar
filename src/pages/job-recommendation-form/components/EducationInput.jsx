import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const EducationInput = ({ 
  value = '', 
  onChange, 
  error = null,
  disabled = false 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(value);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  const educationSuggestions = [
    // Engineering Degrees
    { id: 'btech_cs', name: 'B.Tech Computer Science', category: 'Engineering', level: 'Bachelor' },
    { id: 'btech_it', name: 'B.Tech Information Technology', category: 'Engineering', level: 'Bachelor' },
    { id: 'btech_ece', name: 'B.Tech Electronics & Communication', category: 'Engineering', level: 'Bachelor' },
    { id: 'btech_ee', name: 'B.Tech Electrical Engineering', category: 'Engineering', level: 'Bachelor' },
    { id: 'btech_me', name: 'B.Tech Mechanical Engineering', category: 'Engineering', level: 'Bachelor' },
    { id: 'btech_ce', name: 'B.Tech Civil Engineering', category: 'Engineering', level: 'Bachelor' },
    { id: 'be_cs', name: 'BE Computer Science', category: 'Engineering', level: 'Bachelor' },
    { id: 'be_it', name: 'BE Information Technology', category: 'Engineering', level: 'Bachelor' },
    
    // Master's Engineering
    { id: 'mtech_cs', name: 'M.Tech Computer Science', category: 'Engineering', level: 'Master' },
    { id: 'mtech_it', name: 'M.Tech Information Technology', category: 'Engineering', level: 'Master' },
    { id: 'me_cs', name: 'ME Computer Science', category: 'Engineering', level: 'Master' },
    
    // Computer Applications
    { id: 'bca', name: 'BCA (Bachelor of Computer Applications)', category: 'Computer Applications', level: 'Bachelor' },
    { id: 'mca', name: 'MCA (Master of Computer Applications)', category: 'Computer Applications', level: 'Master' },
    
    // Science Degrees
    { id: 'bsc_cs', name: 'B.Sc Computer Science', category: 'Science', level: 'Bachelor' },
    { id: 'bsc_it', name: 'B.Sc Information Technology', category: 'Science', level: 'Bachelor' },
    { id: 'bsc_math', name: 'B.Sc Mathematics', category: 'Science', level: 'Bachelor' },
    { id: 'bsc_physics', name: 'B.Sc Physics', category: 'Science', level: 'Bachelor' },
    { id: 'msc_cs', name: 'M.Sc Computer Science', category: 'Science', level: 'Master' },
    { id: 'msc_it', name: 'M.Sc Information Technology', category: 'Science', level: 'Master' },
    
    // Business & Management
    { id: 'bba', name: 'BBA (Bachelor of Business Administration)', category: 'Business', level: 'Bachelor' },
    { id: 'mba', name: 'MBA (Master of Business Administration)', category: 'Business', level: 'Master' },
    { id: 'mba_it', name: 'MBA Information Technology', category: 'Business', level: 'Master' },
    { id: 'bcom', name: 'B.Com (Bachelor of Commerce)', category: 'Commerce', level: 'Bachelor' },
    { id: 'mcom', name: 'M.Com (Master of Commerce)', category: 'Commerce', level: 'Master' },
    
    // Arts & Humanities
    { id: 'ba', name: 'BA (Bachelor of Arts)', category: 'Arts', level: 'Bachelor' },
    { id: 'ma', name: 'MA (Master of Arts)', category: 'Arts', level: 'Master' },
    
    // Diploma & Certificates
    { id: 'diploma_cs', name: 'Diploma in Computer Science', category: 'Diploma', level: 'Diploma' },
    { id: 'diploma_it', name: 'Diploma in Information Technology', category: 'Diploma', level: 'Diploma' },
    { id: 'polytechnic', name: 'Polytechnic Diploma', category: 'Diploma', level: 'Diploma' },
    
    // Higher Education
    { id: 'phd_cs', name: 'PhD Computer Science', category: 'Doctorate', level: 'Doctorate' },
    { id: 'phd_it', name: 'PhD Information Technology', category: 'Doctorate', level: 'Doctorate' },
    
    // Professional Courses
    { id: 'ca', name: 'CA (Chartered Accountant)', category: 'Professional', level: 'Professional' },
    { id: 'cs', name: 'CS (Company Secretary)', category: 'Professional', level: 'Professional' },
    { id: 'cma', name: 'CMA (Cost & Management Accountant)', category: 'Professional', level: 'Professional' },
    
    // 12th & Below
    { id: '12th_science', name: '12th Science', category: 'School', level: 'Higher Secondary' },
    { id: '12th_commerce', name: '12th Commerce', category: 'School', level: 'Higher Secondary' },
    { id: '12th_arts', name: '12th Arts', category: 'School', level: 'Higher Secondary' },
    { id: '10th', name: '10th Standard', category: 'School', level: 'Secondary' }
  ];

  const filteredEducation = educationSuggestions?.filter(education =>
    education?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    education?.category?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    education?.level?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  const groupedEducation = filteredEducation?.reduce((acc, education) => {
    if (!acc?.[education?.level]) {
      acc[education.level] = [];
    }
    acc?.[education?.level]?.push(education);
    return acc;
  }, {});

  const levelOrder = ['Doctorate', 'Master', 'Bachelor', 'Professional', 'Diploma', 'Higher Secondary', 'Secondary'];

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

  const handleEducationSelect = (education) => {
    setSearchTerm(education?.name);
    onChange(education?.name);
    setIsOpen(false);
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const getLevelIcon = (level) => {
    switch (level) {
      case 'Doctorate':
        return 'GraduationCap';
      case 'Master':
        return 'BookOpen';
      case 'Bachelor':
        return 'Book';
      case 'Professional':
        return 'Award';
      case 'Diploma':
        return 'FileText';
      case 'Higher Secondary':
        return 'School';
      case 'Secondary':
        return 'School';
      default:
        return 'Book';
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-foreground">
        Education Qualification / शैक्षणिक योग्यता <span className="text-error">*</span>
      </label>
      <div className="relative" ref={dropdownRef}>
        <div className="relative">
          <Icon 
            name="GraduationCap" 
            size={18} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" 
          />
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            placeholder="Enter your highest qualification / अपनी उच्चतम योग्यता दर्ज करें"
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
        {isOpen && Object.keys(groupedEducation)?.length > 0 && (
          <div className="absolute z-50 w-full mt-1 bg-background border border-border rounded-lg shadow-elevated max-h-80 overflow-y-auto">
            {levelOrder?.filter(level => groupedEducation?.[level])?.map((level) => (
              <div key={level} className="p-2">
                <div className="flex items-center space-x-2 px-2 py-1 text-xs font-medium text-text-secondary uppercase tracking-wide">
                  <Icon name={getLevelIcon(level)} size={14} />
                  <span>{level}</span>
                </div>
                {groupedEducation?.[level]?.map((education) => (
                  <button
                    key={education?.id}
                    type="button"
                    onClick={() => handleEducationSelect(education)}
                    className="w-full text-left px-4 py-2 hover:bg-muted transition-smooth flex items-center space-x-3 rounded-md"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-foreground truncate">
                        {education?.name}
                      </div>
                      <div className="text-xs text-text-secondary truncate">
                        {education?.category}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
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
        Enter your highest educational qualification or select from suggestions / अपनी उच्चतम शैक्षणिक योग्यता दर्ज करें या सुझावों से चुनें
      </p>
    </div>
  );
};

export default EducationInput;