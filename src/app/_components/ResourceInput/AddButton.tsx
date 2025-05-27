import React from 'react';
import { Plus, Sparkles } from 'lucide-react';

interface AddButtonProps {
  onClick: () => void;
}

const AddButton: React.FC<AddButtonProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="flex flex-col items-center space-y-4 text-gray-600 hover:text-blue-700 transition-all duration-300 group relative"
  >
    {/* main icon container */}
    <div className="relative">
      <div className="w-20 h-20 bg-gradient-to-br from-blue-100 via-sky-50 to-blue-100 rounded-3xl flex items-center justify-center group-hover:from-blue-200 group-hover:via-sky-100 group-hover:to-blue-200 transition-all duration-300 shadow-lg group-hover:shadow-xl group-hover:scale-110">
        <Plus className="w-10 h-10 group-hover:text-blue-600 transition-all duration-300 group-hover:rotate-90" />
      </div>
      
      <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Sparkles className="w-5 h-5 text-blue-500 animate-pulse" />
      </div>
    </div>
    
    {/* text content */}
    <div className="text-center space-y-1">
      <p className="font-bold text-lg group-hover:text-blue-700 transition-colors duration-300">
        Create Resource
      </p>
      <p className="text-sm text-gray-400 group-hover:text-blue-500 transition-colors duration-300 max-w-[200px]">
        Add links, notes, images & more to your collection
      </p>
    </div>
    
    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-400/0 via-sky-400/0 to-blue-400/0 group-hover:from-blue-400/20 group-hover:via-sky-400/20 group-hover:to-blue-400/20 transition-all duration-500 -z-10"></div>
  </button>
);

export default AddButton;