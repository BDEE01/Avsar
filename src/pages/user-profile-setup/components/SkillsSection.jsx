import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SkillsSection = ({ data, onChange, errors, isExpanded, onToggle }) => {
  const [skillInput, setSkillInput] = useState('');
  const [isListening, setIsListening] = useState(false);

  const predefinedSkills = [
    'JavaScript', 'Python', 'Java', 'React', 'Node.js', 'HTML/CSS',
    'Data Analysis', 'Digital Marketing', 'Content Writing', 'Graphic Design',
    'Project Management', 'Communication', 'Leadership', 'Problem Solving',
    'Microsoft Office', 'Excel', 'PowerPoint', 'Photoshop', 'AutoCAD',
    'Accounting', 'Finance', 'Sales', 'Customer Service', 'Research'
  ];

  const handleAddSkill = () => {
    if (skillInput?.trim() && !data?.skills?.includes(skillInput?.trim())) {
      const newSkills = [...data?.skills, skillInput?.trim()];
      onChange('skills', { ...data, skills: newSkills });
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    const newSkills = data?.skills?.filter(skill => skill !== skillToRemove);
    onChange('skills', { ...data, skills: newSkills });
  };

  const handlePredefinedSkillClick = (skill) => {
    if (!data?.skills?.includes(skill)) {
      const newSkills = [...data?.skills, skill];
      onChange('skills', { ...data, skills: newSkills });
    }
  };

  const handleVoiceInput = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      setIsListening(true);
      recognition?.start();

      recognition.onresult = (event) => {
        const transcript = event?.results?.[0]?.[0]?.transcript;
        setSkillInput(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };
    }
  };

  return (
    <div className="bg-card rounded-lg shadow-soft border border-border">
      <div
        className="flex items-center justify-between p-6 cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
            <Icon name="Code" size={20} className="text-secondary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Skills & Abilities</h3>
            <p className="text-sm text-text-secondary">कौशल और क्षमताएं</p>
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
          <div className="flex space-x-2">
            <div className="flex-1">
              <Input
                label="Add Skills / कौशल जोड़ें"
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e?.target?.value)}
                placeholder="Type a skill and press Add"
                onKeyPress={(e) => e?.key === 'Enter' && handleAddSkill()}
              />
            </div>
            <div className="flex space-x-2 pt-6">
              <Button
                variant="outline"
                size="icon"
                iconName="Mic"
                onClick={handleVoiceInput}
                disabled={isListening}
                className={isListening ? 'bg-destructive/10 text-destructive' : ''}
              />
              <Button
                variant="default"
                iconName="Plus"
                onClick={handleAddSkill}
                disabled={!skillInput?.trim()}
              >
                Add
              </Button>
            </div>
          </div>

          {errors?.skills && (
            <p className="text-sm text-destructive">{errors?.skills}</p>
          )}

          {/* Selected Skills */}
          {data?.skills?.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-text-primary mb-2">Your Skills:</h4>
              <div className="flex flex-wrap gap-2">
                {data?.skills?.map((skill, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                  >
                    <span>{skill}</span>
                    <button
                      onClick={() => handleRemoveSkill(skill)}
                      className="hover:bg-primary/20 rounded-full p-0.5"
                    >
                      <Icon name="X" size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Suggested Skills */}
          <div>
            <h4 className="text-sm font-medium text-text-primary mb-2">Suggested Skills:</h4>
            <div className="flex flex-wrap gap-2">
              {predefinedSkills?.filter(skill => !data?.skills?.includes(skill))?.slice(0, 12)?.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => handlePredefinedSkillClick(skill)}
                    className="px-3 py-1 text-sm bg-muted text-text-secondary rounded-full hover:bg-primary/10 hover:text-primary transition-smooth"
                  >
                    {skill}
                  </button>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillsSection;