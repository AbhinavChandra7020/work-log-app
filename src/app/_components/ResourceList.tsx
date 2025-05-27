import React from 'react';
import DraggableItem from './DraggableItem';

interface ResourceItem {
  id: number;
  content: string;
  source?: string;
}

interface ResourceListProps {
  resources: ResourceItem[];
  onDelete: (id: number) => void;
  setResources: (newResources: ResourceItem[]) => void;
}

const ResourceList: React.FC<ResourceListProps> = ({
  resources,
  onDelete,
  setResources,
}) => {
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');

    try {
      const droppedItem = JSON.parse(data);

      // only handle items from kanban (don't duplicate resources)
      if (droppedItem.source === 'kanban') {
        const alreadyExists = resources.some((r) => r.content === droppedItem.content);
        if (!alreadyExists) {
          const newItem = {
            ...droppedItem,
            id: Date.now() + Math.random(),
            source: 'resources',
          };
          setResources([...resources, newItem]);
        }
      }
    } catch (error) {
      console.error('Error parsing dropped data:', error);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {resources.map((resource) => (
        <DraggableItem
          key={resource.id}
          item={resource}
          onDelete={onDelete}
          source="resources"
        />
      ))}
    </div>
  );
};

export default ResourceList;