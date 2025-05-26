import React from 'react';
import { Plus } from 'lucide-react';

interface DropZoneEmptyProps {
  isDragOver: boolean;
}

const DropZoneEmpty: React.FC<DropZoneEmptyProps> = ({ isDragOver }) => {
  const baseClasses = 'w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center';
  return (
    <div className="text-center py-12">
      {isDragOver ? (
        <div className="text-blue-600">
          <div className={`${baseClasses} bg-blue-100`}>
            <Plus className="w-8 h-8" />
          </div>
          <p className="font-medium text-lg">Drop item here</p>
        </div>
      ) : (
        <div className="text-gray-400">
          <div className={`${baseClasses} bg-gray-100`}>
            <Plus className="w-8 h-8" />
          </div>
          <p className="font-medium">Drag items here</p>
          <p className="text-sm mt-1">No items yet</p>
        </div>
      )}
    </div>
  );
};

export default DropZoneEmpty;
