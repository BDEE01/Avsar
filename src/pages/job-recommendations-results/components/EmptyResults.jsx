import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyResults = ({ onNewSearch, onRefineSearch }) => {
  return (
    <div className="max-w-2xl mx-auto text-center py-12">
      <div className="flex items-center justify-center w-20 h-20 bg-muted rounded-full mx-auto mb-6">
        <Icon name="Search" size={32} className="text-text-secondary" />
      </div>
      <h2 className="text-2xl font-bold text-foreground mb-4">
        No Job Matches Found / कोई नौकरी मैच नहीं मिला
      </h2>
      <p className="text-text-secondary mb-8 leading-relaxed">
        We couldn't find any jobs that match your current criteria. 
        Try adjusting your preferences or search with different skills and location.
        <br />
        <span className="text-sm mt-2 block">
          हमें आपके वर्तमान मानदंडों से मेल खाने वाली कोई नौकरी नहीं मिली। 
          अपनी प्राथमिकताओं को समायोजित करने या विभिन्न कौशल और स्थान के साथ खोज करने का प्रयास करें।
        </span>
      </p>
      <div className="space-y-4">
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="font-semibold text-foreground mb-3">
            Suggestions to improve your search:
          </h3>
          <ul className="text-left space-y-2 text-sm text-text-secondary">
            <li className="flex items-start space-x-2">
              <Icon name="CheckCircle" size={16} className="text-primary mt-0.5 flex-shrink-0" />
              <span>Try broader skill categories or related technologies</span>
            </li>
            <li className="flex items-start space-x-2">
              <Icon name="CheckCircle" size={16} className="text-primary mt-0.5 flex-shrink-0" />
              <span>Consider expanding your location preferences</span>
            </li>
            <li className="flex items-start space-x-2">
              <Icon name="CheckCircle" size={16} className="text-primary mt-0.5 flex-shrink-0" />
              <span>Include both technical and soft skills in your profile</span>
            </li>
            <li className="flex items-start space-x-2">
              <Icon name="CheckCircle" size={16} className="text-primary mt-0.5 flex-shrink-0" />
              <span>Update your education details with specific qualifications</span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            variant="default"
            onClick={onNewSearch}
            iconName="RotateCcw"
            iconPosition="left"
            size="lg"
          >
            Start New Search / नई खोज शुरू करें
          </Button>
          
          <Button
            variant="outline"
            onClick={onRefineSearch}
            iconName="Settings"
            iconPosition="left"
            size="lg"
          >
            Refine Criteria / मानदंड सुधारें
          </Button>
        </div>
      </div>
      {/* Popular Skills Suggestion */}
      <div className="mt-8 bg-surface border border-border rounded-lg p-6">
        <h4 className="font-medium text-foreground mb-3">
          Popular Skills in Demand:
        </h4>
        <div className="flex flex-wrap gap-2 justify-center">
          {[
            'React', 'Node.js', 'Python', 'Java', 'JavaScript', 
            'AWS', 'Docker', 'MongoDB', 'SQL', 'Git'
          ]?.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full font-medium cursor-pointer hover:bg-primary/20 transition-smooth"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmptyResults;