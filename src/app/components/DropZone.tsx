'use client';
import React, { useState } from 'react';
import DropZoneHeader from './DropZone/DropZoneHeader';
import DropZoneEmpty from './DropZone/DropZoneEmpty';
import DropZoneList from './DropZone/DropZoneList';

interface Item {
  id: number;
  content: string;
  source?: string;
}

interface DropZoneProps {
  title: string;
  items: Item[];
  onDrop: (item: Item) => void;
  bgColor?: string;
  icon: React.ReactNode;
  onDeleteItem: (id: number) => void;
}

const DropZone: React.FC<DropZoneProps> = ({
  title,
  items,
  onDrop,
  bgColor = 'bg-gray-50',
  icon,
  onDeleteItem,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const data = e.dataTransfer.getData('text/plain');
    try {
      const item: Item = JSON.parse(data);
      onDrop(item);
    } catch (error) {
      console.error('Error parsing dropped data:', error);
    }
  };

  return (
    <div
      className={`${bgColor} rounded-2xl p-6 min-h-[300px] transition-all duration-300 ${
        isDragOver
          ? 'bg-blue-100 border-2 border-blue-400 border-dashed shadow-lg scale-102'
          : 'border border-gray-200 shadow-sm'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <DropZoneHeader icon={icon} title={title} count={items.length} />
      {items.length > 0 ? (
        <DropZoneList items={items} onDeleteItem={onDeleteItem} />
      ) : (
        <DropZoneEmpty isDragOver={isDragOver} />
      )}
    </div>
  );
};

export default DropZone;
