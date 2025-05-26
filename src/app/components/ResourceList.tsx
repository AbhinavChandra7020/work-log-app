import React from 'react';
import DraggableItem from './DraggableItem';
import { handleDrop } from '../utils/handleDrop'; // Adjust path as needed

interface ResourceItem {
  id: number;
  content: string;
  source?: string;
}

interface ResourceListProps {
  resources: ResourceItem[];
  onDelete: (id: number) => void;
  onEdit: (id: number, content: string) => void;
  setResources: (newResources: ResourceItem[]) => void; // <-- New prop
}

const ResourceList: React.FC<ResourceListProps> = ({
  resources,
  onDelete,
  onEdit,
  setResources,
}) => {
  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    handleDrop({
      event: e,
      currentList: resources,
      sourceKey: 'resources',
      onUpdate: setResources,
    });
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      {resources.map((resource) => (
        <DraggableItem
          key={resource.id}
          item={resource}
          onDelete={onDelete}
          onEdit={onEdit}
          source="resources"
        />
      ))}
    </div>
  );
};

export default ResourceList;
