import React from 'react';
import Icon from '../../../components/AppIcon';


const ValidationResults = ({ results, isVisible }) => {
  if (!isVisible || !results) return null;

  const { totalRecords, validRecords, errors, duplicates, warnings, qualityScore } = results;

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-success';
    if (score >= 70) return 'text-warning';
    return 'text-destructive';
  };

  const getScoreBg = (score) => {
    if (score >= 90) return 'bg-success/10';
    if (score >= 70) return 'bg-warning/10';
    return 'bg-destructive/10';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-text-primary mb-2">Validation Results</h3>
        <p className="text-text-secondary">Data quality assessment and processing recommendations</p>
      </div>
      {/* Quality Score */}
      <div className={`rounded-lg p-4 mb-6 ${getScoreBg(qualityScore)}`}>
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-text-primary mb-1">Data Quality Score</h4>
            <p className="text-sm text-text-secondary">Overall assessment of data completeness and accuracy</p>
          </div>
          <div className="text-right">
            <div className={`text-3xl font-bold ${getScoreColor(qualityScore)}`}>
              {qualityScore}%
            </div>
            <div className="text-sm text-text-secondary">
              {qualityScore >= 90 ? 'Excellent' : qualityScore >= 70 ? 'Good' : 'Needs Improvement'}
            </div>
          </div>
        </div>
      </div>
      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="FileText" size={20} className="text-primary" />
            </div>
            <div>
              <div className="text-2xl font-bold text-text-primary">{totalRecords}</div>
              <div className="text-sm text-text-secondary">Total Records</div>
            </div>
          </div>
        </div>

        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name="CheckCircle" size={20} className="text-success" />
            </div>
            <div>
              <div className="text-2xl font-bold text-text-primary">{validRecords}</div>
              <div className="text-sm text-text-secondary">Valid Records</div>
            </div>
          </div>
        </div>

        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-destructive/10 rounded-lg flex items-center justify-center">
              <Icon name="XCircle" size={20} className="text-destructive" />
            </div>
            <div>
              <div className="text-2xl font-bold text-text-primary">{errors?.length}</div>
              <div className="text-sm text-text-secondary">Errors Found</div>
            </div>
          </div>
        </div>

        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
              <Icon name="Copy" size={20} className="text-warning" />
            </div>
            <div>
              <div className="text-2xl font-bold text-text-primary">{duplicates}</div>
              <div className="text-sm text-text-secondary">Duplicates</div>
            </div>
          </div>
        </div>
      </div>
      {/* Error Details */}
      {errors?.length > 0 && (
        <div className="mb-6">
          <h4 className="font-medium text-text-primary mb-3 flex items-center space-x-2">
            <Icon name="AlertTriangle" size={16} className="text-destructive" />
            <span>Validation Errors</span>
          </h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {errors?.slice(0, 10)?.map((error, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-destructive/5 rounded-lg">
                <Icon name="AlertCircle" size={16} className="text-destructive mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-text-primary">Row {error?.row}</div>
                  <div className="text-sm text-text-secondary">{error?.message}</div>
                  {error?.suggestion && (
                    <div className="text-sm text-primary mt-1">Suggestion: {error?.suggestion}</div>
                  )}
                </div>
              </div>
            ))}
            {errors?.length > 10 && (
              <div className="text-sm text-text-secondary text-center py-2">
                And {errors?.length - 10} more errors...
              </div>
            )}
          </div>
        </div>
      )}
      {/* Warnings */}
      {warnings?.length > 0 && (
        <div className="mb-6">
          <h4 className="font-medium text-text-primary mb-3 flex items-center space-x-2">
            <Icon name="AlertTriangle" size={16} className="text-warning" />
            <span>Warnings</span>
          </h4>
          <div className="space-y-2">
            {warnings?.slice(0, 5)?.map((warning, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-warning/5 rounded-lg">
                <Icon name="Info" size={16} className="text-warning mt-0.5 flex-shrink-0" />
                <div className="text-sm text-text-secondary">{warning}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Recommendations */}
      <div className="bg-primary/5 rounded-lg p-4">
        <h4 className="font-medium text-text-primary mb-3 flex items-center space-x-2">
          <Icon name="Lightbulb" size={16} className="text-primary" />
          <span>Recommendations</span>
        </h4>
        <div className="space-y-2 text-sm text-text-secondary">
          {qualityScore < 70 && (
            <div className="flex items-start space-x-2">
              <Icon name="ArrowRight" size={14} className="mt-0.5 flex-shrink-0" />
              <span>Fix validation errors before processing to improve recommendation accuracy</span>
            </div>
          )}
          {duplicates > 0 && (
            <div className="flex items-start space-x-2">
              <Icon name="ArrowRight" size={14} className="mt-0.5 flex-shrink-0" />
              <span>Remove duplicate entries to prevent skewed recommendations</span>
            </div>
          )}
          <div className="flex items-start space-x-2">
            <Icon name="ArrowRight" size={14} className="mt-0.5 flex-shrink-0" />
            <span>Ensure skills_en, sector_en, and description_en columns have detailed information for better TF-IDF processing</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValidationResults;