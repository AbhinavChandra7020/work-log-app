import React from 'react';
import { Sparkles, Archive } from 'lucide-react';

const ResourcesHeader: React.FC<{ count: number }> = ({ count }) => (
  <div className="flex items-center justify-between mb-10">
    <div className="flex items-center space-x-4">
      <div className="relative">
        <div className="w-14 h-14 bg-gradient-to-br from-violet-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25">
          <Archive className="w-7 h-7 text-white" />
        </div>
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
          <Sparkles className="w-3 h-3 text-white" />
        </div>
      </div>
      <div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 via-purple-700 to-pink-600 bg-clip-text text-transparent">
          Resources
        </h2>
        <p className="text-gray-500 font-medium mt-1">
          Your creative collection • Drag items here to save
        </p>
      </div>
    </div>
    <div className="flex items-center space-x-3">
      <div className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-sm px-5 py-3 rounded-2xl font-bold shadow-sm border border-purple-200/50">
        {count} {count === 1 ? 'item' : 'items'}
      </div>
    </div>
  </div>
);

export default ResourcesHeader;