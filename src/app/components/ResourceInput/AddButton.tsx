import React from 'react';
import { Plus } from 'lucide-react';

interface AddButtonProps {
  onClick: () => void;
}

const AddButton: React.FC<AddButtonProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="flex flex-col items-center space-y-3 text-gray-500 hover:text-gray-700 transition-all duration-200 group"
  >
    <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center group-hover:from-blue-50 group-hover:to-blue-100 transition-all duration-200">
      <Plus className="w-8 h-8 group-hover:text-blue-500 transition-colors duration-200" />
    </div>
    <div className="text-center">
      <p className="font-semibold">Add Resource</p>
      <p className="text-sm text-gray-400">Click to create new</p>
    </div>
  </button>
);

export default AddButton;
