'use client';
import React, { useRef, useState } from 'react';
import ResourcesHeader from './ui/ResourcesHeader';
import ResourceList from './ResourceList';
import ResourceInput from './ResourceInput';

interface ResourceItem {
  id: number;
  content: string;
  source?: string;
}

interface ResourcesGridProps {
  resources: ResourceItem[];
  onAddResource: (content: string) => void;
  onDeleteResource: (id: number) => void;
  onDropToResources: (item: ResourceItem) => void;
  setResources: (newResources: ResourceItem[]) => void;
}

const ResourcesGrid: React.FC<ResourcesGridProps> = ({
  resources,
  onAddResource,
  onDeleteResource,
  onDropToResources,
  setResources,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [newResource, setNewResource] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null!);

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
      const item = JSON.parse(data);
      if (item.source === 'kanban') {
        onDropToResources(item);
      }
    } catch (error) {
      console.error('Error parsing dropped data:', error);
    }
  };

  return (
    <div
      className={`bg-gradient-to-br from-white/80 to-blue-50/80 backdrop-blur-xl rounded-3xl border shadow-2xl p-8 transition-all duration-500 ${
        isDragOver
          ? 'border-blue-400 bg-gradient-to-br from-blue-50/90 to-sky-50/90 shadow-blue-200/50 scale-[1.02] rotate-1'
          : 'border-blue-200/50 hover:shadow-xl hover:border-blue-300/70'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <ResourcesHeader count={resources.length} />

      <ResourceList
        resources={resources}
        onDelete={onDeleteResource}
        setResources={setResources}
      />

      <ResourceInput
        inputRef={inputRef}
        showInput={showInput}
        setShowInput={setShowInput}
        newResource={newResource}
        setNewResource={setNewResource}
        onAddResource={onAddResource}
      />
    </div>
  );
};

export default ResourcesGrid;
