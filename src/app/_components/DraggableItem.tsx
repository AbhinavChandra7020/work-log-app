'use client';
import React from 'react';
import { GripVertical } from 'lucide-react';
import DraggableItemContent from './DraggableItem/DraggableItemContent';
import DraggableItemActions from './DraggableItem/DraggableItemActions';

interface DraggableItemProps {
  item: { id: number; content: string };
  onDelete?: (id: number) => void;
  showActions?: boolean;
  compact?: boolean;
  source?: string;
}

const DraggableItem: React.FC<DraggableItemProps> = ({
  item,
  onDelete,
  showActions = true,
  compact = false,
  source = 'resources',
}) => {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({ ...item, source }));
    e.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className={`${
        compact
          ? 'bg-white border border-gray-200 rounded-xl p-4 cursor-move hover:shadow-lg hover:border-gray-300'
          : 'bg-white border border-gray-200 rounded-2xl p-6 cursor-move hover:shadow-xl hover:border-gray-300'
      } transition-all duration-200 group backdrop-blur-sm ${!compact ? 'hover:-translate-y-1' : ''}`}
    >
      <div className="flex items-start justify-between mb-2">
        <GripVertical className={`text-gray-400 ${compact ? 'w-4 h-4 mt-1' : 'w-5 h-5 mt-1'} flex-shrink-0`} />
        {showActions && (
          <DraggableItemActions
            onDelete={onDelete ? () => onDelete(item.id) : undefined}
          />
        )}
      </div>

      <DraggableItemContent content={item.content} compact={compact} />
    </div>
  );
};

export default DraggableItem;
