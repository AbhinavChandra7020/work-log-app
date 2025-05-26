import React from 'react';
import { Plus } from 'lucide-react';

const ResourcesHeader: React.FC<{ count: number }> = ({ count }) => (
  <div className="flex items-center justify-between mb-8">
    <div className="flex items-center space-x-3">
      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
        <Plus className="w-5 h-5 text-white" />
      </div>
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Resources</h2>
        <p className="text-gray-600">Drag items here to save them</p>
      </div>
    </div>
    <span className="bg-purple-100 text-purple-700 text-sm px-4 py-2 rounded-full font-semibold">
      {count} items
    </span>
  </div>
);

export default ResourcesHeader;
