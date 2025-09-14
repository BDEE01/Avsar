import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const InterestsSection = ({ data, onChange, errors, isExpanded, onToggle }) => {
  const sectorOptions = [
    {
      id: 'technology',
      name: 'Technology / प्रौद्योगिकी',
      icon: 'Laptop',
      image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Software, IT, Digital Innovation'
    },
    {
      id: 'healthcare',
      name: 'Healthcare / स्वास्थ्य सेवा',
      icon: 'Heart',
      image: 'https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Medical, Nursing, Public Health'
    },
    {
      id: 'education',
      name: 'Education / शिक्षा',
      icon: 'BookOpen',
      image: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Teaching, Training, Research'
    },
    {
      id: 'finance',
      name: 'Finance / वित्त',
      icon: 'TrendingUp',
      image: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Banking, Investment, Accounting'
    },
    {
      id: 'manufacturing',
      name: 'Manufacturing / विनिर्माण',
      icon: 'Settings',
      image: 'https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Production, Quality Control, Operations'
    },
    {
      id: 'agriculture',
      name: 'Agriculture / कृषि',
      icon: 'Leaf',
      image: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Farming, Food Processing, Rural Development'
    },
    {
      id: 'government',
      name: 'Government / सरकारी',
      icon: 'Building',
      image: 'https://images.pexels.com/photos/8112199/pexels-photo-8112199.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Public Service, Administration, Policy'
    },
    {
      id: 'media',
      name: 'Media & Arts / मीडिया और कला',
      icon: 'Camera',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Journalism, Design, Entertainment'
    }
  ];

  const handleSectorToggle = (sectorId) => {
    const currentInterests = data?.sectors || [];
    const newInterests = currentInterests?.includes(sectorId)
      ? currentInterests?.filter(id => id !== sectorId)
      : [...currentInterests, sectorId];
    
    onChange('interests', { ...data, sectors: newInterests });
  };

  return (
    <div className="bg-card rounded-lg shadow-soft border border-border">
      <div
        className="flex items-center justify-between p-6 cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="Target" size={20} className="text-accent" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Sector Interests</h3>
            <p className="text-sm text-text-secondary">क्षेत्रीय रुचियां</p>
          </div>
        </div>
        <Icon
          name={isExpanded ? 'ChevronUp' : 'ChevronDown'}
          size={20}
          className="text-text-secondary"
        />
      </div>
      {isExpanded && (
        <div className="px-6 pb-6">
          <p className="text-sm text-text-secondary mb-4">
            Select sectors you're interested in working with (choose multiple):
          </p>
          
          {errors?.sectors && (
            <p className="text-sm text-destructive mb-4">{errors?.sectors}</p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sectorOptions?.map((sector) => (
              <div
                key={sector?.id}
                onClick={() => handleSectorToggle(sector?.id)}
                className={`relative cursor-pointer rounded-lg border-2 transition-smooth overflow-hidden ${
                  data?.sectors?.includes(sector?.id)
                    ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                }`}
              >
                <div className="aspect-video relative">
                  <Image
                    src={sector?.image}
                    alt={sector?.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="absolute top-2 right-2">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        data?.sectors?.includes(sector?.id)
                          ? 'bg-primary border-primary' :'bg-white border-white'
                      }`}
                    >
                      {data?.sectors?.includes(sector?.id) && (
                        <Icon name="Check" size={14} className="text-white" />
                      )}
                    </div>
                  </div>
                  <div className="absolute bottom-2 left-2">
                    <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                      <Icon name={sector?.icon} size={16} className="text-white" />
                    </div>
                  </div>
                </div>
                
                <div className="p-3">
                  <h4 className="font-medium text-text-primary text-sm mb-1">
                    {sector?.name}
                  </h4>
                  <p className="text-xs text-text-secondary">
                    {sector?.description}
                  </p>
                </div>

                {/* Government Scheme Badge */}
                <div className="absolute top-2 left-2">
                  <div className="bg-success text-success-foreground px-2 py-1 rounded text-xs font-medium">
                    PM Scheme
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 text-sm text-text-secondary">
            Selected: {data?.sectors?.length || 0} sectors
          </div>
        </div>
      )}
    </div>
  );
};

export default InterestsSection;