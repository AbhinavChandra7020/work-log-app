import React from 'react';
import { X } from 'lucide-react';

interface Props {
  isEditing: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

const DraggableItemActions: React.FC<Props> = ({ isEditing, onEdit, onDelete }) => (
  <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-200">
    {onEdit && (
      <button
        onClick={onEdit}
        className="text-blue-500 hover:text-blue-700 text-sm px-3 py-1 rounded-full bg-blue-50 hover:bg-blue-100 transition-colors duration-200 font-medium"
      >
        {isEditing ? 'Save' : 'Edit'}
      </button>
    )}
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
