import React from 'react';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const SkillsStep = ({ 
  formData, 
  errors, 
  onChange, 
  currentLanguage = 'en' 
}) => {
  const getLabel = (en, hi) => {
    return currentLanguage === 'hi' ? hi : en;
  };

  const handleSkillToggle = (skill, checked) => {
    const currentSkills = formData?.selectedSkills || [];
    let updatedSkills;
    
    if (checked) {
      updatedSkills = [...currentSkills, skill];
    } else {
      updatedSkills = currentSkills?.filter(s => s !== skill);
    }
    
    onChange('skills', 'selectedSkills', updatedSkills);
  };

  const technicalSkills = [
    { 
      value: 'web-development', 
      label: getLabel('Web Development', 'वेब डेवलपमेंट'),
      description: getLabel('HTML, CSS, JavaScript, React', 'एचटीएमएल, सीएसएस, जावास्क्रिप्ट, रिएक्ट'),
      icon: 'Code'
    },
    { 
      value: 'digital-marketing', 
      label: getLabel('Digital Marketing', 'डिजिटल मार्केटिंग'),
      description: getLabel('SEO, Social Media, Content Marketing', 'एसईओ, सोशल मीडिया, कंटेंट मार्केटिंग'),
      icon: 'TrendingUp'
    },
    { 
      value: 'ai-ml', 
      label: getLabel('AI/ML', 'एआई/एमएल'),
      description: getLabel('Machine Learning, Data Science, Python', 'मशीन लर्निंग, डेटा साइंस, पायथन'),
      icon: 'Brain'
    },
    { 
      value: 'graphic-design', 
      label: getLabel('Graphic Design', 'ग्राफिक डिज़ाइन'),
      description: getLabel('Photoshop, Illustrator, UI/UX', 'फोटोशॉप, इलस्ट्रेटर, यूआई/यूएक्स'),
      icon: 'Palette'
    },
    { 
      value: 'content-writing', 
      label: getLabel('Content Writing', 'कंटेंट राइटिंग'),
      description: getLabel('Blog Writing, Copywriting, Technical Writing', 'ब्लॉग राइटिंग, कॉपीराइटिंग, तकनीकी लेखन'),
      icon: 'PenTool'
    },
    { 
      value: 'data-analysis', 
      label: getLabel('Data Analysis', 'डेटा विश्लेषण'),
      description: getLabel('Excel, SQL, Tableau, Statistics', 'एक्सेल, एसक्यूएल, टैब्लो, सांख्यिकी'),
      icon: 'BarChart3'
    },
    { 
      value: 'mobile-development', 
      label: getLabel('Mobile Development', 'मोबाइल डेवलपमेंट'),
      description: getLabel('Android, iOS, React Native, Flutter', 'एंड्रॉइड, आईओएस, रिएक्ट नेटिव, फ्लटर'),
      icon: 'Smartphone'
    },
    { 
      value: 'video-editing', 
      label: getLabel('Video Editing', 'वीडियो एडिटिंग'),
      description: getLabel('Premiere Pro, After Effects, Final Cut', 'प्रीमियर प्रो, आफ्टर इफेक्ट्स, फाइनल कट'),
      icon: 'Video'
    }
  ];

  const softSkills = [
    { value: 'communication', label: getLabel('Communication', 'संचार') },
    { value: 'teamwork', label: getLabel('Teamwork', 'टीम वर्क') },
    { value: 'leadership', label: getLabel('Leadership', 'नेतृत्व') },
    { value: 'problem-solving', label: getLabel('Problem Solving', 'समस्या समाधान') },
    { value: 'creativity', label: getLabel('Creativity', 'रचनात्मकता') },
    { value: 'time-management', label: getLabel('Time Management', 'समय प्रबंधन') },
    { value: 'adaptability', label: getLabel('Adaptability', 'अनुकूलनशीलता') },
    { value: 'critical-thinking', label: getLabel('Critical Thinking', 'आलोचनात्मक सोच') }
  ];

  const languages = [
    { value: 'hindi', label: getLabel('Hindi', 'हिंदी') },
    { value: 'english', label: getLabel('English', 'अंग्रेजी') },
    { value: 'marathi', label: getLabel('Marathi', 'मराठी') },
    { value: 'tamil', label: getLabel('Tamil', 'तमिल') },
    { value: 'telugu', label: getLabel('Telugu', 'तेलुगु') },
    { value: 'bengali', label: getLabel('Bengali', 'बंगाली') },
    { value: 'gujarati', label: getLabel('Gujarati', 'गुजराती') },
    { value: 'punjabi', label: getLabel('Punjabi', 'पंजाबी') }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          {getLabel('Skills & Abilities', 'कौशल और क्षमताएं')}
        </h2>
        <p className="text-muted-foreground">
          {getLabel('Select your skills to get relevant internship recommendations', 'प्रासंगिक इंटर्नशिप सिफारिशें प्राप्त करने के लिए अपने कौशल चुनें')}
        </p>
      </div>
      {/* Technical Skills */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-foreground flex items-center">
          <Icon name="Code" size={20} className="mr-2 text-primary" />
          {getLabel('Technical Skills', 'तकनीकी कौशल')} *
        </h3>
        <p className="text-sm text-muted-foreground">
          {getLabel('Select the technical skills you have or are learning', 'उन तकनीकी कौशलों का चयन करें जो आपके पास हैं या जो आप सीख रहे हैं')}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {technicalSkills?.map((skill) => (
            <div
              key={skill?.value}
              className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 hover:shadow-soft ${
                (formData?.selectedSkills || [])?.includes(skill?.value)
                  ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
              }`}
              onClick={() => handleSkillToggle(skill?.value, !(formData?.selectedSkills || [])?.includes(skill?.value))}
            >
              <div className="flex items-start space-x-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  (formData?.selectedSkills || [])?.includes(skill?.value)
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  <Icon name={skill?.icon} size={20} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={(formData?.selectedSkills || [])?.includes(skill?.value)}
                      onChange={(e) => handleSkillToggle(skill?.value, e?.target?.checked)}
                    />
                    <h4 className="font-medium text-foreground">{skill?.label}</h4>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{skill?.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {errors?.['skills.selectedSkills'] && (
          <p className="text-sm text-error">{errors?.['skills.selectedSkills']}</p>
        )}
      </div>
      {/* Soft Skills */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-foreground flex items-center">
          <Icon name="Users" size={20} className="mr-2 text-primary" />
          {getLabel('Soft Skills', 'सॉफ्ट स्किल्स')}
        </h3>
        <p className="text-sm text-muted-foreground">
          {getLabel('Select your interpersonal and professional skills', 'अपने पारस्परिक और व्यावसायिक कौशल चुनें')}
        </p>
        
        <Select
          options={softSkills}
          value={formData?.softSkills || []}
          onChange={(value) => onChange('skills', 'softSkills', value)}
          placeholder={getLabel('Select soft skills', 'सॉफ्ट स्किल्स चुनें')}
          multiple
          searchable
          clearable
        />
      </div>
      {/* Languages */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-foreground flex items-center">
          <Icon name="Globe" size={20} className="mr-2 text-primary" />
          {getLabel('Languages', 'भाषाएं')}
        </h3>
        <p className="text-sm text-muted-foreground">
          {getLabel('Select languages you can speak fluently', 'उन भाषाओं का चयन करें जिन्हें आप धाराप्रवाह बोल सकते हैं')}
        </p>
        
        <Select
          options={languages}
          value={formData?.languages || []}
          onChange={(value) => onChange('skills', 'languages', value)}
          placeholder={getLabel('Select languages', 'भाषाएं चुनें')}
          multiple
          searchable
          clearable
        />
      </div>
      {/* Skills Summary */}
      {(formData?.selectedSkills || [])?.length > 0 && (
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
          <h4 className="font-medium text-foreground mb-2 flex items-center">
            <Icon name="CheckCircle" size={16} className="mr-2 text-primary" />
            {getLabel('Selected Skills Summary', 'चयनित कौशल सारांश')}
          </h4>
          <div className="flex flex-wrap gap-2">
            {(formData?.selectedSkills || [])?.map((skillValue) => {
              const skill = technicalSkills?.find(s => s?.value === skillValue);
              return skill ? (
                <span
                  key={skillValue}
                  className="px-3 py-1 bg-primary text-primary-foreground text-sm rounded-full"
                >
                  {skill?.label}
                </span>
              ) : null;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillsStep;