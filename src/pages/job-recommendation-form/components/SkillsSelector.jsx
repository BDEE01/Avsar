import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const SkillsSelector = ({ 
  selectedSkills = [], 
  onSkillsChange, 
  error = null,
  disabled = false 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  const skillsData = [
    { id: 'javascript', label: 'JavaScript', category: 'Programming' },
    { id: 'python', label: 'Python', category: 'Programming' },
    { id: 'java', label: 'Java', category: 'Programming' },
    { id: 'react', label: 'React.js', category: 'Frontend' },
    { id: 'nodejs', label: 'Node.js', category: 'Backend' },
    { id: 'angular', label: 'Angular', category: 'Frontend' },
    { id: 'vue', label: 'Vue.js', category: 'Frontend' },
    { id: 'express', label: 'Express.js', category: 'Backend' },
    { id: 'mongodb', label: 'MongoDB', category: 'Database' },
    { id: 'mysql', label: 'MySQL', category: 'Database' },
    { id: 'postgresql', label: 'PostgreSQL', category: 'Database' },
    { id: 'aws', label: 'AWS', category: 'Cloud' },
    { id: 'azure', label: 'Microsoft Azure', category: 'Cloud' },
    { id: 'docker', label: 'Docker', category: 'DevOps' },
    { id: 'kubernetes', label: 'Kubernetes', category: 'DevOps' },
    { id: 'git', label: 'Git', category: 'Tools' },
    { id: 'html', label: 'HTML5', category: 'Frontend' },
    { id: 'css', label: 'CSS3', category: 'Frontend' },
    { id: 'sass', label: 'SASS/SCSS', category: 'Frontend' },
    { id: 'tailwind', label: 'Tailwind CSS', category: 'Frontend' },
    { id: 'bootstrap', label: 'Bootstrap', category: 'Frontend' },
    { id: 'typescript', label: 'TypeScript', category: 'Programming' },
    { id: 'php', label: 'PHP', category: 'Programming' },
    { id: 'laravel', label: 'Laravel', category: 'Backend' },
    { id: 'django', label: 'Django', category: 'Backend' },
    { id: 'flask', label: 'Flask', category: 'Backend' },
    { id: 'spring', label: 'Spring Boot', category: 'Backend' },
    { id: 'redis', label: 'Redis', category: 'Database' },
    { id: 'elasticsearch', label: 'Elasticsearch', category: 'Database' },
    { id: 'graphql', label: 'GraphQL', category: 'API' },
    { id: 'rest', label: 'REST APIs', category: 'API' },
    { id: 'jenkins', label: 'Jenkins', category: 'DevOps' },
    { id: 'terraform', label: 'Terraform', category: 'DevOps' },
    { id: 'linux', label: 'Linux', category: 'System' },
    { id: 'nginx', label: 'Nginx', category: 'System' },
    { id: 'apache', label: 'Apache', category: 'System' },
    { id: 'figma', label: 'Figma', category: 'Design' },
    { id: 'photoshop', label: 'Adobe Photoshop', category: 'Design' },
    { id: 'illustrator', label: 'Adobe Illustrator', category: 'Design' },
    { id: 'sketch', label: 'Sketch', category: 'Design' },
    { id: 'xd', label: 'Adobe XD', category: 'Design' },
    { id: 'unity', label: 'Unity', category: 'Game Development' },
    { id: 'unreal', label: 'Unreal Engine', category: 'Game Development' },
    { id: 'flutter', label: 'Flutter', category: 'Mobile' },
    { id: 'react-native', label: 'React Native', category: 'Mobile' },
    { id: 'swift', label: 'Swift', category: 'Mobile' },
    { id: 'kotlin', label: 'Kotlin', category: 'Mobile' },
    { id: 'android', label: 'Android Development', category: 'Mobile' },
    { id: 'ios', label: 'iOS Development', category: 'Mobile' }
  ];

  const filteredSkills = skillsData?.filter(skill =>
    skill?.label?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    skill?.category?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  const groupedSkills = filteredSkills?.reduce((acc, skill) => {
    if (!acc?.[skill?.category]) {
      acc[skill.category] = [];
    }
    acc?.[skill?.category]?.push(skill);
    return acc;
  }, {});

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSkillToggle = (skillId) => {
    const skill = skillsData?.find(s => s?.id === skillId);
    if (!skill) return;

    const isSelected = selectedSkills?.some(s => s?.id === skillId);
    
    if (isSelected) {
      onSkillsChange(selectedSkills?.filter(s => s?.id !== skillId));
    } else {
      onSkillsChange([...selectedSkills, skill]);
    }
  };

  const handleRemoveSkill = (skillId) => {
    onSkillsChange(selectedSkills?.filter(s => s?.id !== skillId));
  };

  const handleClearAll = () => {
    onSkillsChange([]);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-foreground">
        Skills / कौशल <span className="text-error">*</span>
      </label>
      <div className="relative" ref={dropdownRef}>
        {/* Selected Skills Display */}
        <div 
          className={`
            min-h-[44px] w-full px-3 py-2 border rounded-lg bg-input cursor-pointer transition-smooth
            focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2
            ${error ? 'border-error' : 'border-border hover:border-primary'}
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
          onClick={() => !disabled && setIsOpen(!isOpen)}
        >
          <div className="flex flex-wrap gap-2 min-h-[28px] items-center">
            {selectedSkills?.length > 0 ? (
              selectedSkills?.map((skill) => (
                <span
                  key={skill?.id}
                  className="inline-flex items-center px-2 py-1 bg-primary text-primary-foreground text-xs rounded-md"
                >
                  {skill?.label}
                  <button
                    type="button"
                    onClick={(e) => {
                      e?.stopPropagation();
                      handleRemoveSkill(skill?.id);
                    }}
                    className="ml-1 hover:bg-primary/80 rounded-full p-0.5 transition-smooth"
                    disabled={disabled}
                  >
                    <Icon name="X" size={12} />
                  </button>
                </span>
              ))
            ) : (
              <span className="text-text-secondary text-sm">
                Select your skills / अपने कौशल चुनें
              </span>
            )}
            
            <div className="ml-auto flex items-center space-x-1">
              {selectedSkills?.length > 0 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e?.stopPropagation();
                    handleClearAll();
                  }}
                  className="text-text-secondary hover:text-foreground p-1 transition-smooth"
                  disabled={disabled}
                >
                  <Icon name="X" size={16} />
                </button>
              )}
              <Icon 
                name={isOpen ? "ChevronUp" : "ChevronDown"} 
                size={16} 
                className="text-text-secondary" 
              />
            </div>
          </div>
        </div>

        {/* Dropdown */}
        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-background border border-border rounded-lg shadow-elevated max-h-80 overflow-hidden">
            {/* Search Input */}
            <div className="p-3 border-b border-border">
              <div className="relative">
                <Icon 
                  name="Search" 
                  size={16} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" 
                />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search skills... / कौशल खोजें..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e?.target?.value)}
                  className="w-full pl-10 pr-3 py-2 text-sm border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                />
              </div>
            </div>

            {/* Skills List */}
            <div className="max-h-60 overflow-y-auto">
              {Object.keys(groupedSkills)?.length > 0 ? (
                Object.entries(groupedSkills)?.map(([category, skills]) => (
                  <div key={category} className="p-2">
                    <div className="text-xs font-medium text-text-secondary uppercase tracking-wide px-2 py-1">
                      {category}
                    </div>
                    {skills?.map((skill) => {
                      const isSelected = selectedSkills?.some(s => s?.id === skill?.id);
                      return (
                        <button
                          key={skill?.id}
                          type="button"
                          onClick={() => handleSkillToggle(skill?.id)}
                          className={`
                            w-full text-left px-3 py-2 text-sm rounded-md transition-smooth
                            flex items-center justify-between
                            ${isSelected 
                              ? 'bg-primary text-primary-foreground' 
                              : 'hover:bg-muted text-foreground'
                            }
                          `}
                        >
                          <span>{skill?.label}</span>
                          {isSelected && (
                            <Icon name="Check" size={16} className="text-primary-foreground" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-text-secondary text-sm">
                  No skills found / कोई कौशल नहीं मिला
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      {/* Selected Count */}
      {selectedSkills?.length > 0 && (
        <div className="text-xs text-text-secondary">
          {selectedSkills?.length} skill{selectedSkills?.length !== 1 ? 's' : ''} selected / {selectedSkills?.length} कौशल चुने गए
        </div>
      )}
      {/* Error Message */}
      {error && (
        <div className="flex items-center space-x-1 text-sm text-error">
          <Icon name="AlertCircle" size={16} />
          <span>{error}</span>
        </div>
      )}
      {/* Description */}
      <p className="text-xs text-text-secondary">
        Select multiple skills that match your expertise / अपनी विशेषज्ञता से मेल खाने वाले कई कौशल चुनें
      </p>
    </div>
  );
};

export default SkillsSelector;