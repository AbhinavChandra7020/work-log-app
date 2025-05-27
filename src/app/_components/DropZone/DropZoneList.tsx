import React from 'react';
import DraggableItem from '../DraggableItem';
import { handleDrop } from '../../_utils/handleDrop'; 

interface Item {
  id: number;
  content: string;
  source?: string;
}

interface DropZoneListProps {
  items: Item[];
  setItems: (newItems: Item[]) => void;
  onDeleteItem: (id: number) => void;
  onRemoveFromSource?: (source: string, itemId: number) => void;
}

const DropZoneList: React.FC<DropZoneListProps> = ({
  items,
  setItems,
  onDeleteItem,
  onRemoveFromSource,
}) => {
  const handleDropEvent = (e: React.DragEvent<HTMLDivElement>) => {
    handleDrop({
      event: e,
      currentList: items,
      sourceKey: 'kanban',
      onUpdate: setItems,
      onRemoveFromSource,
    });
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
   <div
  className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4 auto-rows-auto"
  onDrop={handleDropEvent}
  onDragOver={handleDragOver}
>

      {items.map((item) => (
        <DraggableItem
          key={item.id}
          item={item}
          compact={false} 
          showActions={true}
          onDelete={onDeleteItem}
          source="kanban"
        />
      ))}
    </div>
  );
};

export default DropZoneList;
