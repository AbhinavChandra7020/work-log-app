import React from 'react';
import { X } from 'lucide-react';

interface Props {
  onDelete?: () => void;
}

const DraggableItemActions: React.FC<Props> = ({ onDelete }) => (
  <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-200">
    {onDelete && (
      <button
        onClick={onDelete}
        className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition-colors duration-200"
      >
        <X className="w-4 h-4" />
      </button>
    )}
  </div>
);

export default DraggableItemActions;