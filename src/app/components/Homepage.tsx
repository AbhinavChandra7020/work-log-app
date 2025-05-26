'use client';
import React, { useState } from 'react';
import KanbanBoard from './KahanBoard';
import ResourcesGrid from './ResourcesGrid';

interface ResourceItem {
  id: number;
  content: string;
  source?: string;
  sourceColumn?: 'todo' | 'inProgress' | 'completed';
}

export default function Homepage() {
  const [resources, setResources] = useState<ResourceItem[]>([
    { id: 1, content: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
    { id: 2, content: 'https://github.com/vercel/next.js' },
    { id: 3, content: 'Review project requirements and create initial wireframes for the new dashboard interface' },
  ]);

  const [todoItems, setTodoItems] = useState<ResourceItem[]>([]);
  const [inProgressItems, setInProgressItems] = useState<ResourceItem[]>([]);
  const [completedItems, setCompletedItems] = useState<ResourceItem[]>([]);

  const generateId = () => Date.now() + Math.random();

  const addResource = (content: string) => {
    setResources([...resources, { id: generateId(), content }]);
  };

  const deleteResource = (id: number) => {
    setResources(resources.filter(resource => resource.id !== id));
  };

  const editResource = (id: number, newContent: string) => {
    setResources(resources.map(resource =>
      resource.id === id ? { ...resource, content: newContent } : resource
    ));
  };

  const moveToTodo = (item: ResourceItem) => {
    if (item.source === 'kanban') removeFromKanban(item);
    setTodoItems([...todoItems, { ...item, id: generateId(), source: 'kanban', sourceColumn: 'todo' }]);
  };

  const moveToInProgress = (item: ResourceItem) => {
    if (item.source === 'kanban') removeFromKanban(item);
    setInProgressItems([...inProgressItems, { ...item, id: generateId(), source: 'kanban', sourceColumn: 'inProgress' }]);
  };

  const moveToCompleted = (item: ResourceItem) => {
    if (item.source === 'kanban') removeFromKanban(item);
    setCompletedItems([...completedItems, { ...item, id: generateId(), source: 'kanban', sourceColumn: 'completed' }]);
  };

  const moveToResources = (item: ResourceItem) => {
    const alreadyExists = resources.some(resource => resource.content === item.content);
    if (alreadyExists) {
      // Return it to its original column
      if (item.source === 'kanban') {
        returnToOriginalKanbanColumn(item);
      }
      return;
    }

    removeFromKanban(item);
    setResources([...resources, { ...item, id: generateId() }]);
  };

  const returnToOriginalKanbanColumn = (item: ResourceItem) => {
  const newItem = { ...item, id: generateId(), source: 'kanban' };

  switch (item.sourceColumn) {
    case 'todo':
      if (!todoItems.some(i => i.content === item.content)) {
        setTodoItems([...todoItems, newItem]);
      }
      break;
    case 'inProgress':
      if (!inProgressItems.some(i => i.content === item.content)) {
        setInProgressItems([...inProgressItems, newItem]);
      }
      break;
    case 'completed':
      if (!completedItems.some(i => i.content === item.content)) {
        setCompletedItems([...completedItems, newItem]);
      }
      break;
    default:
      if (!todoItems.some(i => i.content === item.content)) {
        setTodoItems([...todoItems, newItem]);
      }
      break;
  }
};


  const removeFromKanban = (item: ResourceItem) => {
    setTodoItems(todoItems.filter(todo => todo.id !== item.id));
    setInProgressItems(inProgressItems.filter(progress => progress.id !== item.id));
    setCompletedItems(completedItems.filter(done => done.id !== item.id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 p-6">
      <div className="w-full px-6 space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
            Work Log
          </h1>
          <p className="text-gray-600 text-lg">Organize your resources and track your progress</p>
        </div>

        {/* Kanban Board */}
        <KanbanBoard
          todoItems={todoItems}
          inProgressItems={inProgressItems}
          completedItems={completedItems}
          onMoveToTodo={moveToTodo}
          onMoveToInProgress={moveToInProgress}
          onMoveToCompleted={moveToCompleted}
          onDeleteFromTodo={(id) => setTodoItems(todoItems.filter(item => item.id !== id))}
          onDeleteFromInProgress={(id) => setInProgressItems(inProgressItems.filter(item => item.id !== id))}
          onDeleteFromCompleted={(id) => setCompletedItems(completedItems.filter(item => item.id !== id))}
        />

        {/* Resources Section */}
        <ResourcesGrid
          resources={resources}
          onAddResource={addResource}
          onDeleteResource={deleteResource}
          onEditResource={editResource}
          onDropToResources={moveToResources}
        />
      </div>
    </div>
  );
}
