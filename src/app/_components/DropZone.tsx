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
  setItems: (newItems: Item[]) => void;
  onRemoveFromSource?: (source: string, itemId: number) => void;
  theme?: 'red' | 'yellow' | 'green' | 'blue';
}

const DropZone: React.FC<DropZoneProps> = ({
  title,
  items,
  onDrop,
  bgColor = 'bg-gradient-to-br from-white/80 to-gray-50/80',
  icon,
  onDeleteItem,
  setItems,
  onRemoveFromSource,
  theme = 'blue',
}) => {
  const [isDragOver, setIsDragOver] = useState(false);

  // Theme configurations
  const themeConfig = {
    red: {
      dragOver: 'border-red-400 bg-gradient-to-br from-red-50/90 to-rose-50/90 shadow-red-200/50',
      hover: 'hover:border-red-300/70'
    },
    yellow: {
      dragOver: 'border-yellow-400 bg-gradient-to-br from-yellow-50/90 to-amber-50/90 shadow-yellow-200/50',
      hover: 'hover:border-yellow-300/70'
    },
    green: {
      dragOver: 'border-green-400 bg-gradient-to-br from-green-50/90 to-emerald-50/90 shadow-green-200/50',
      hover: 'hover:border-green-300/70'
    },
    blue: {
      dragOver: 'border-blue-400 bg-gradient-to-br from-blue-50/90 to-indigo-50/90 shadow-blue-200/50',
      hover: 'hover:border-blue-300/70'
    }
  };

  const currentTheme = themeConfig[theme];

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
      className={`${bgColor} backdrop-blur-xl rounded-3xl border shadow-2xl p-8 min-h-[400px] transition-all duration-500 ${
        isDragOver
          ? `${currentTheme.dragOver} scale-[1.02] -rotate-1`
          : `border-gray-200/50 hover:shadow-xl ${currentTheme.hover}`
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <DropZoneHeader icon={icon} title={title} count={items.length} theme={theme} />
      {items.length > 0 ? (
        <DropZoneList 
          items={items} 
          setItems={setItems}
          onDeleteItem={onDeleteItem}
          onRemoveFromSource={onRemoveFromSource}
        />
      ) : (
        <DropZoneEmpty isDragOver={isDragOver} theme={theme} />
      )}
    </div>
  );
};

export default DropZone;