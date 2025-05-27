import React from 'react';
import { Calendar, Clock, CheckCircle2 } from 'lucide-react';
import DropZone from '../DropZone';

interface Item {
  id: number;
  content: string;
  source?: string;
}

interface KanbanBoardProps {
  todoItems: Item[];
  inProgressItems: Item[];
  completedItems: Item[];
  onMoveToTodo: (item: Item) => void;
  onMoveToInProgress: (item: Item) => void;
  onMoveToCompleted: (item: Item) => void;
  onDeleteFromTodo: (id: number) => void;
  onDeleteFromInProgress: (id: number) => void;
  onDeleteFromCompleted: (id: number) => void;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({
  todoItems,
  inProgressItems,
  completedItems,
  onMoveToTodo,
  onMoveToInProgress,
  onMoveToCompleted,
  onDeleteFromTodo,
  onDeleteFromInProgress,
  onDeleteFromCompleted,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <DropZone
        title="To Do"
        items={todoItems}
        onDrop={onMoveToTodo}
        onDeleteItem={onDeleteFromTodo}
        setItems={(newItems) => {
          // This is a placeholder - you'll need to pass the actual setter from Homepage
          console.log('setItems called for todoItems:', newItems);
        }}
        bgColor="bg-gradient-to-br from-red-50 to-pink-50"
        icon={<Calendar className="w-6 h-6 text-red-500" />}
        theme="red"
      />
      <DropZone
        title="In Progress"
        items={inProgressItems}
        onDrop={onMoveToInProgress}
        onDeleteItem={onDeleteFromInProgress}
        setItems={(newItems) => {
          // This is a placeholder - you'll need to pass the actual setter from Homepage
          console.log('setItems called for inProgressItems:', newItems);
        }}
        bgColor="bg-gradient-to-br from-yellow-50 to-orange-50"
        icon={<Clock className="w-6 h-6 text-yellow-600" />}
        theme="yellow"
      />
      <DropZone
        title="Completed"
        items={completedItems}
        onDrop={onMoveToCompleted}
        onDeleteItem={onDeleteFromCompleted}
        setItems={(newItems) => {
          // This is a placeholder - you'll need to pass the actual setter from Homepage
          console.log('setItems called for completedItems:', newItems);
        }}
        bgColor="bg-gradient-to-br from-green-50 to-emerald-50"
        icon={<CheckCircle2 className="w-6 h-6 text-green-500" />}
        theme="green"
      />
    </div>
  );
};

export default KanbanBoard;