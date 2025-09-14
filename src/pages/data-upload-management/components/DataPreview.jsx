import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DataPreview = ({ data, isVisible }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  if (!isVisible || !data || data?.length === 0) return null;

  const totalPages = Math.ceil(data?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data?.slice(startIndex, endIndex);

  const highlightedColumns = ['skills_en', 'sector_en', 'description_en'];

  const truncateText = (text, maxLength = 50) => {
    if (!text) return '';
    return text?.length > maxLength ? `${text?.substring(0, maxLength)}...` : text;
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary mb-1">Data Preview</h3>
          <p className="text-sm text-text-secondary">
            Showing {startIndex + 1}-{Math.min(endIndex, data?.length)} of {data?.length} records
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="ChevronLeft"
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          />
          <span className="text-sm text-text-secondary px-2">
            {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            iconName="ChevronRight"
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
          />
        </div>
      </div>
      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-3 text-sm font-medium text-text-secondary">ID</th>
              <th className="text-left p-3 text-sm font-medium text-text-secondary">Company</th>
              <th className="text-left p-3 text-sm font-medium text-text-secondary">Position</th>
              <th className="text-left p-3 text-sm font-medium text-text-secondary bg-primary/5">Skills</th>
              <th className="text-left p-3 text-sm font-medium text-text-secondary bg-primary/5">Sector</th>
              <th className="text-left p-3 text-sm font-medium text-text-secondary bg-primary/5">Description</th>
              <th className="text-left p-3 text-sm font-medium text-text-secondary">Location</th>
              <th className="text-left p-3 text-sm font-medium text-text-secondary">Salary</th>
            </tr>
          </thead>
          <tbody>
            {currentData?.map((row, index) => (
              <tr key={index} className="border-b border-border hover:bg-muted/50">
                <td className="p-3 text-sm text-text-primary">{row?.id}</td>
                <td className="p-3 text-sm text-text-primary">{truncateText(row?.company_name, 20)}</td>
                <td className="p-3 text-sm text-text-primary">{truncateText(row?.position, 25)}</td>
                <td className="p-3 text-sm text-text-primary bg-primary/5">
                  <div className="flex flex-wrap gap-1">
                    {row?.skills_en?.split(',')?.slice(0, 2)?.map((skill, i) => (
                      <span key={i} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                        {skill?.trim()}
                      </span>
                    ))}
                    {row?.skills_en?.split(',')?.length > 2 && (
                      <span className="text-xs text-text-secondary">+{row?.skills_en?.split(',')?.length - 2}</span>
                    )}
                  </div>
                </td>
                <td className="p-3 text-sm text-text-primary bg-primary/5">{row?.sector_en}</td>
                <td className="p-3 text-sm text-text-primary bg-primary/5">{truncateText(row?.description_en, 40)}</td>
                <td className="p-3 text-sm text-text-primary">{row?.location}</td>
                <td className="p-3 text-sm text-text-primary">{row?.salary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4">
        {currentData?.map((row, index) => (
          <div key={index} className="border border-border rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-medium text-text-primary">{row?.position}</h4>
                <p className="text-sm text-text-secondary">{row?.company_name}</p>
              </div>
              <span className="text-xs bg-muted px-2 py-1 rounded">ID: {row?.id}</span>
            </div>
            
            <div className="space-y-2">
              <div className="bg-primary/5 p-2 rounded">
                <div className="text-xs font-medium text-primary mb-1">Skills (Algorithm Input)</div>
                <div className="flex flex-wrap gap-1">
                  {row?.skills_en?.split(',')?.slice(0, 3)?.map((skill, i) => (
                    <span key={i} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                      {skill?.trim()}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-text-secondary">Sector:</span>
                  <div className="font-medium text-text-primary">{row?.sector_en}</div>
                </div>
                <div>
                  <span className="text-text-secondary">Location:</span>
                  <div className="font-medium text-text-primary">{row?.location}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-muted rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Info" size={16} className="text-primary" />
          <span className="text-sm font-medium text-text-primary">Algorithm Processing Columns</span>
        </div>
        <p className="text-sm text-text-secondary">
          Highlighted columns (Skills, Sector, Description) are processed using TF-IDF vectorization for recommendation matching.
        </p>
      </div>
    </div>
  );
};

export default DataPreview;