import React from 'react';
import { Sparkles, Archive } from 'lucide-react';

const ResourcesHeader: React.FC<{ count: number }> = ({ count }) => (
  <div className="flex items-center justify-between mb-10">
    <div className="flex items-center space-x-4">
      <div className="relative">
        <div className="w-14 h-14 bg-gradient-to-br from-blue-500 via-sky-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25">
          <Archive className="w-7 h-7 text-white" />
        </div>
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-blue-400 to-sky-400 rounded-full flex items-center justify-center">
          <Sparkles className="w-3 h-3 text-white" />
        </div>
      </div>
      <div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-950 via-blue-700 to-blue-400 bg-clip-text text-transparent">
          Resources
        </h2>
        <p className="text-blue-600/70 font-medium mt-1">
          Your creative collection • Drag items here to save
        </p>
      </div>
    </div>
    <div className="flex items-center space-x-3">
      <div className="bg-gradient-to-r from-blue-100 to-sky-100 text-blue-700 text-sm px-5 py-3 rounded-2xl font-bold shadow-sm border border-blue-200/50">
        {count} {count === 1 ? 'item' : 'items'}
      </div>
    </div>
  </div>
);

export default ResourcesHeader;