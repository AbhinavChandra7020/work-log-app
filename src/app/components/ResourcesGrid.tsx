'use client';
import React, { useRef, useState } from 'react';
import ResourcesHeader from './ResourcesHeader';
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
  onEditResource: (id: number, content: string) => void;
  onDropToResources: (item: any) => void;
}

const ResourcesGrid: React.FC<ResourcesGridProps> = ({
  resources,
  onAddResource,
  onDeleteResource,
  onEditResource,
  onDropToResources,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [newResource, setNewResource] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);

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
      className={`bg-white rounded-2xl border shadow-lg p-8 transition-all duration-300 ${
        isDragOver ? 'border-blue-400 bg-blue-50 shadow-xl' : 'border-gray-200'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <ResourcesHeader count={resources.length} />

      <ResourceList
        resources={resources}
        onDelete={onDeleteResource}
        onEdit={onEditResource}
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
