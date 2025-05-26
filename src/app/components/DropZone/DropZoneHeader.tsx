import React from 'react';

interface DropZoneHeaderProps {
  icon: React.ReactNode;
  title: string;
  count: number;
}

const DropZoneHeader: React.FC<DropZoneHeaderProps> = ({ icon, title, count }) => (
  <div className="flex items-center space-x-3 mb-6">
    {icon}
    <h3 className="font-bold text-xl text-gray-800">{title}</h3>
    <span className="bg-gray-200 text-gray-600 text-sm px-3 py-1 rounded-full font-medium">
      {count}
    </span>
  </div>
);

export default DropZoneHeader;
