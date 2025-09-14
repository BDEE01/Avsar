import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UploadZone = ({ onFileUpload, isProcessing }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e?.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e?.dataTransfer?.files);
    const csvFile = files?.find(file => file?.type === 'text/csv' || file?.name?.endsWith('.csv'));
    if (csvFile) {
      onFileUpload(csvFile);
    }
  };

  const handleFileSelect = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      onFileUpload(file);
    }
  };

  const downloadTemplate = () => {
    const csvContent = `id,company_name,position,skills_en,sector_en,description_en,location,salary,job_type,duration
1,Tech Solutions Ltd,Software Developer Intern,"JavaScript,React,Node.js",Technology,"Develop web applications using modern frameworks and technologies. Work with senior developers on real projects.",Mumbai,₹25000,Full-time,6 months 2,Green Energy Corp,Environmental Research Intern,"Data Analysis,Research,Sustainability",Environment,"Conduct research on renewable energy solutions and environmental impact assessment.",Delhi,₹20000,Part-time,3 months 3,FinTech Innovations,Data Analyst Intern,"Python,SQL,Excel,Statistics",Finance,"Analyze financial data and create reports for investment decisions. Learn about fintech products.",Bangalore,₹30000,Full-time,4 months`;
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL?.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'internship_template.csv';
    document.body?.appendChild(a);
    a?.click();
    document.body?.removeChild(a);
    window.URL?.revokeObjectURL(url);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-text-primary mb-2">Upload Internship Database</h2>
        <p className="text-text-secondary">Upload CSV files containing internship data for processing and recommendation engine updates.</p>
      </div>

      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
          isDragOver
            ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 hover:bg-muted/50'
        } ${isProcessing ? 'opacity-50 pointer-events-none' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={isProcessing}
        />
        
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="Upload" size={32} className="text-primary" />
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-text-primary mb-2">
              {isProcessing ? 'Processing...' : 'Drop CSV file here or click to browse'}
            </h3>
            <p className="text-sm text-text-secondary mb-4">
              Maximum file size: 50MB. Supported format: CSV
            </p>
          </div>

          <Button
            variant="outline"
            iconName="FileText"
            iconPosition="left"
            onClick={downloadTemplate}
            disabled={isProcessing}
          >
            Download Template
          </Button>
        </div>
      </div>

      <div className="mt-6 bg-muted rounded-lg p-4">
        <h4 className="font-medium text-text-primary mb-2">Required CSV Columns:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 text-sm">
          <div className="flex items-center space-x-2">
            <Icon name="Check" size={16} className="text-success" />
            <span className="text-text-secondary">id, company_name, position</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Check" size={16} className="text-success" />
            <span className="text-text-secondary">skills_en, sector_en</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Check" size={16} className="text-success" />
            <span className="text-text-secondary">description_en, location</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Check" size={16} className="text-success" />
            <span className="text-text-secondary">salary, job_type, duration</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadZone;