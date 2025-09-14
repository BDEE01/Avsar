import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProcessingActions = ({ 
  canProcess, 
  isProcessing, 
  onProcess, 
  onExportReport, 
  processingResults,
  validationResults 
}) => {
  const getProcessButtonText = () => {
    if (isProcessing) return 'Processing Data...';
    if (processingResults) return 'Reprocess Data';
    return 'Process Data';
  };

  const getProcessButtonIcon = () => {
    if (isProcessing) return 'Loader';
    if (processingResults) return 'RefreshCw';
    return 'Play';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-text-primary mb-2">Processing Actions</h3>
        <p className="text-text-secondary">
          Execute data processing and generate reports for recommendation engine updates
        </p>
      </div>
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <Button
          variant="default"
          size="lg"
          iconName={getProcessButtonIcon()}
          iconPosition="left"
          onClick={onProcess}
          disabled={!canProcess || isProcessing}
          loading={isProcessing}
          className="flex-1"
        >
          {getProcessButtonText()}
        </Button>

        <Button
          variant="outline"
          size="lg"
          iconName="Download"
          iconPosition="left"
          onClick={onExportReport}
          disabled={!validationResults && !processingResults}
          className="flex-1 sm:flex-none"
        >
          Export Report
        </Button>
      </div>
      {/* Processing Requirements */}
      <div className="space-y-4">
        <div className="p-4 bg-muted rounded-lg">
          <h4 className="font-medium text-text-primary mb-3 flex items-center space-x-2">
            <Icon name="CheckSquare" size={16} className="text-primary" />
            <span>Processing Requirements</span>
          </h4>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <Icon 
                name={validationResults ? "Check" : "X"} 
                size={16} 
                className={validationResults ? "text-success" : "text-text-secondary"} 
              />
              <span className={`text-sm ${validationResults ? "text-text-primary" : "text-text-secondary"}`}>
                CSV file uploaded and validated
              </span>
            </div>
            
            <div className="flex items-center space-x-3">
              <Icon 
                name={validationResults?.qualityScore >= 70 ? "Check" : "X"} 
                size={16} 
                className={validationResults?.qualityScore >= 70 ? "text-success" : "text-text-secondary"} 
              />
              <span className={`text-sm ${validationResults?.qualityScore >= 70 ? "text-text-primary" : "text-text-secondary"}`}>
                Data quality score ≥ 70%
              </span>
            </div>
            
            <div className="flex items-center space-x-3">
              <Icon 
                name={validationResults?.errors?.length === 0 ? "Check" : "X"} 
                size={16} 
                className={validationResults?.errors?.length === 0 ? "text-success" : "text-text-secondary"} 
              />
              <span className={`text-sm ${validationResults?.errors?.length === 0 ? "text-text-primary" : "text-text-secondary"}`}>
                No critical validation errors
              </span>
            </div>
          </div>
        </div>

        {/* Processing Impact */}
        <div className="p-4 bg-primary/5 rounded-lg">
          <h4 className="font-medium text-text-primary mb-3 flex items-center space-x-2">
            <Icon name="Zap" size={16} className="text-primary" />
            <span>Processing Impact</span>
          </h4>
          
          <div className="space-y-2 text-sm text-text-secondary">
            <div className="flex items-start space-x-2">
              <Icon name="ArrowRight" size={14} className="mt-0.5 flex-shrink-0" />
              <span>TF-IDF vectorization will be performed on skills_en, sector_en, and description_en columns</span>
            </div>
            <div className="flex items-start space-x-2">
              <Icon name="ArrowRight" size={14} className="mt-0.5 flex-shrink-0" />
              <span>Cosine similarity matrices will be updated for improved recommendation accuracy</span>
            </div>
            <div className="flex items-start space-x-2">
              <Icon name="ArrowRight" size={14} className="mt-0.5 flex-shrink-0" />
              <span>Existing user recommendations will be refreshed with new data</span>
            </div>
            <div className="flex items-start space-x-2">
              <Icon name="ArrowRight" size={14} className="mt-0.5 flex-shrink-0" />
              <span>Processing time: ~2-5 minutes depending on dataset size</span>
            </div>
          </div>
        </div>

        {/* Processing Results Summary */}
        {processingResults && (
          <div className="p-4 bg-success/5 rounded-lg">
            <h4 className="font-medium text-text-primary mb-3 flex items-center space-x-2">
              <Icon name="CheckCircle" size={16} className="text-success" />
              <span>Last Processing Results</span>
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-success">{processingResults?.processedRecords}</div>
                <div className="text-text-secondary">Records Processed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-success">{processingResults?.vectorsGenerated}</div>
                <div className="text-text-secondary">Vectors Generated</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-success">{processingResults?.processingTime}</div>
                <div className="text-text-secondary">Processing Time</div>
              </div>
            </div>
            
            <div className="mt-3 text-sm text-text-secondary">
              Completed on: {processingResults?.completedAt}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProcessingActions;