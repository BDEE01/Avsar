import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import UploadZone from './components/UploadZone';
import ProcessingProgress from './components/ProcessingProgress';
import DataPreview from './components/DataPreview';
import ValidationResults from './components/ValidationResults';
import ColumnMapping from './components/ColumnMapping';
import ProcessingActions from './components/ProcessingActions';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const DataUploadManagement = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [csvData, setCsvData] = useState([]);
  const [csvHeaders, setCsvHeaders] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState('');
  const [processingProgress, setProcessingProgress] = useState(0);
  const [validationResults, setValidationResults] = useState(null);
  const [columnMappings, setColumnMappings] = useState({});
  const [processingResults, setProcessingResults] = useState(null);
  const [activeTab, setActiveTab] = useState('upload');

  // Mock CSV data for demonstration
  const mockCsvData = [
    {
      id: "1",
      company_name: "Tech Solutions Ltd",
      position: "Software Developer Intern",
      skills_en: "JavaScript,React,Node.js,MongoDB",
      sector_en: "Technology",
      description_en: "Develop web applications using modern frameworks and technologies. Work with senior developers on real projects and learn industry best practices.",
      location: "Mumbai",
      salary: "₹25,000",
      job_type: "Full-time",
      duration: "6 months"
    },
    {
      id: "2",
      company_name: "Green Energy Corp",
      position: "Environmental Research Intern",
      skills_en: "Data Analysis,Research,Sustainability,Python",
      sector_en: "Environment",
      description_en: "Conduct research on renewable energy solutions and environmental impact assessment. Analyze data and prepare reports on sustainability initiatives.",
      location: "Delhi",
      salary: "₹20,000",
      job_type: "Part-time",
      duration: "3 months"
    },
    {
      id: "3",
      company_name: "FinTech Innovations",
      position: "Data Analyst Intern",
      skills_en: "Python,SQL,Excel,Statistics,Machine Learning",
      sector_en: "Finance",
      description_en: "Analyze financial data and create reports for investment decisions. Learn about fintech products and work with big data technologies.",
      location: "Bangalore",
      salary: "₹30,000",
      job_type: "Full-time",
      duration: "4 months"
    },
    {
      id: "4",
      company_name: "Healthcare Plus",
      position: "Medical Research Assistant",
      skills_en: "Research,Data Entry,Medical Knowledge,Communication",
      sector_en: "Healthcare",
      description_en: "Assist in medical research projects and clinical trials. Maintain patient databases and help with research documentation.",
      location: "Chennai",
      salary: "₹22,000",
      job_type: "Full-time",
      duration: "5 months"
    },
    {
      id: "5",
      company_name: "EduTech Solutions",
      position: "Content Development Intern",
      skills_en: "Content Writing,Video Editing,Graphic Design,Education",
      sector_en: "Education",
      description_en: "Create educational content for online learning platforms. Develop interactive materials and assist in curriculum design.",
      location: "Pune",
      salary: "₹18,000",
      job_type: "Part-time",
      duration: "4 months"
    }
  ];

  const mockValidationResults = {
    totalRecords: 5,
    validRecords: 4,
    errors: [
      {
        row: 3,
        message: "Missing required field: description_en",
        suggestion: "Add detailed job description for better matching"
      }
    ],
    duplicates: 1,
    warnings: [
      "Some salary values are not in standard format",
      "Consider adding more detailed skill descriptions"
    ],
    qualityScore: 85
  };

  const handleFileUpload = (file) => {
    setUploadedFile(file);
    setActiveTab('preview');
    
    // Simulate CSV parsing
    setTimeout(() => {
      setCsvData(mockCsvData);
      setCsvHeaders(Object.keys(mockCsvData?.[0]));
      setValidationResults(mockValidationResults);
    }, 1000);
  };

  const handleProcessData = () => {
    setIsProcessing(true);
    setProcessingProgress(0);
    setActiveTab('processing');

    const steps = ['parsing', 'validation', 'vectorization', 'indexing', 'complete'];
    let currentStepIndex = 0;

    const processStep = () => {
      if (currentStepIndex < steps?.length) {
        setProcessingStep(steps?.[currentStepIndex]);
        setProcessingProgress((currentStepIndex + 1) * 20);
        
        setTimeout(() => {
          currentStepIndex++;
          if (currentStepIndex < steps?.length) {
            processStep();
          } else {
            setIsProcessing(false);
            setProcessingResults({
              processedRecords: mockCsvData?.length,
              vectorsGenerated: mockCsvData?.length * 3,
              processingTime: '2m 34s',
              completedAt: new Date()?.toLocaleString()
            });
            setActiveTab('results');
          }
        }, 2000);
      }
    };

    processStep();
  };

  const handleExportReport = () => {
    const reportData = {
      uploadedFile: uploadedFile?.name,
      uploadDate: new Date()?.toISOString(),
      validationResults,
      processingResults,
      columnMappings
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = window.URL?.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `data_processing_report_${new Date()?.toISOString()?.split('T')?.[0]}.json`;
    document.body?.appendChild(a);
    a?.click();
    document.body?.removeChild(a);
    window.URL?.revokeObjectURL(url);
  };

  const tabs = [
    { id: 'upload', label: 'Upload', icon: 'Upload' },
    { id: 'preview', label: 'Preview', icon: 'Eye' },
    { id: 'mapping', label: 'Mapping', icon: 'GitBranch' },
    { id: 'validation', label: 'Validation', icon: 'CheckCircle' },
    { id: 'processing', label: 'Processing', icon: 'Zap' },
    { id: 'results', label: 'Results', icon: 'BarChart' }
  ];

  const canProcess = validationResults && validationResults?.qualityScore >= 70 && validationResults?.errors?.length === 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar isCollapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <main className={`pt-16 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <div className="p-6">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Database" size={24} className="text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-text-primary">Data Upload Management</h1>
                <p className="text-text-secondary">Process CSV internship databases for the AI recommendation engine</p>
              </div>
            </div>

            {/* Status Banner */}
            {uploadedFile && (
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Icon name="FileText" size={20} className="text-primary" />
                    <div>
                      <div className="font-medium text-text-primary">File: {uploadedFile?.name}</div>
                      <div className="text-sm text-text-secondary">
                        {csvData?.length} records • Quality Score: {validationResults?.qualityScore}%
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {processingResults && (
                      <span className="px-3 py-1 bg-success/10 text-success text-sm rounded-full">
                        Processed
                      </span>
                    )}
                    {isProcessing && (
                      <span className="px-3 py-1 bg-warning/10 text-warning text-sm rounded-full">
                        Processing...
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Tabs */}
          <div className="mb-8">
            <div className="border-b border-border">
              <nav className="flex space-x-8 overflow-x-auto">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                      activeTab === tab?.id
                        ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary hover:border-border'
                    }`}
                  >
                    <Icon name={tab?.icon} size={16} />
                    <span>{tab?.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="space-y-8">
            {/* Upload Tab */}
            {activeTab === 'upload' && (
              <UploadZone 
                onFileUpload={handleFileUpload}
                isProcessing={isProcessing}
              />
            )}

            {/* Preview Tab */}
            {activeTab === 'preview' && (
              <DataPreview 
                data={csvData}
                isVisible={csvData?.length > 0}
              />
            )}

            {/* Mapping Tab */}
            {activeTab === 'mapping' && (
              <ColumnMapping
                csvHeaders={csvHeaders}
                onMappingChange={setColumnMappings}
                isVisible={csvHeaders?.length > 0}
              />
            )}

            {/* Validation Tab */}
            {activeTab === 'validation' && (
              <ValidationResults
                results={validationResults}
                isVisible={validationResults !== null}
              />
            )}

            {/* Processing Tab */}
            {activeTab === 'processing' && (
              <div className="space-y-8">
                <ProcessingProgress
                  progress={processingProgress}
                  currentStep={processingStep}
                  isVisible={isProcessing || processingResults}
                />
                
                <ProcessingActions
                  canProcess={canProcess}
                  isProcessing={isProcessing}
                  onProcess={handleProcessData}
                  onExportReport={handleExportReport}
                  processingResults={processingResults}
                  validationResults={validationResults}
                />
              </div>
            )}

            {/* Results Tab */}
            {activeTab === 'results' && processingResults && (
              <div className="bg-card rounded-lg border border-border p-6">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-text-primary mb-2">Processing Complete</h3>
                  <p className="text-text-secondary">Data has been successfully processed and integrated into the recommendation engine</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-success/5 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-success mb-2">{processingResults?.processedRecords}</div>
                    <div className="text-sm text-text-secondary">Records Processed</div>
                  </div>
                  <div className="bg-primary/5 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-primary mb-2">{processingResults?.vectorsGenerated}</div>
                    <div className="text-sm text-text-secondary">TF-IDF Vectors Generated</div>
                  </div>
                  <div className="bg-accent/5 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-accent mb-2">{processingResults?.processingTime}</div>
                    <div className="text-sm text-text-secondary">Processing Time</div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    variant="default"
                    iconName="Download"
                    iconPosition="left"
                    onClick={handleExportReport}
                    className="flex-1"
                  >
                    Download Report
                  </Button>
                  <Button
                    variant="outline"
                    iconName="RotateCcw"
                    iconPosition="left"
                    onClick={() => {
                      setActiveTab('upload');
                      setUploadedFile(null);
                      setCsvData([]);
                      setValidationResults(null);
                      setProcessingResults(null);
                    }}
                    className="flex-1"
                  >
                    Process New File
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DataUploadManagement;