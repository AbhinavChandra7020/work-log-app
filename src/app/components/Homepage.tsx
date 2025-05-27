'use client';
import React, { useEffect, useState } from 'react';
import KanbanBoard from './KahanBoard';
import ResourcesGrid from './ResourcesGrid';
import AppHeader from './AppHeader';
import { Trash2 } from 'lucide-react';
import {
  saveToIndexedDB,
  loadAllFromIndexedDB,
  deleteFromIndexedDB,
  clearAllFromIndexedDB,
} from '../utils/indexedDbUtils';

interface ResourceItem {
  id: number;
  content: string;
  source?: string;
  sourceColumn?: 'todo' | 'inProgress' | 'completed';
}

export default function Homepage() {
  const [resources, setResources] = useState<ResourceItem[]>([]);
  const [todoItems, setTodoItems] = useState<ResourceItem[]>([]);
  const [inProgressItems, setInProgressItems] = useState<ResourceItem[]>([]);
  const [completedItems, setCompletedItems] = useState<ResourceItem[]>([]);

  const generateId = () => Date.now() + Math.random();

  useEffect(() => {
    const loadResources = async () => {
      const loaded = await loadAllFromIndexedDB();
      setResources(loaded.map(({ id, content }) => ({ id, content })));
    };
    loadResources();
  }, []);

  const addResource = async (content: string) => {
    const id = generateId();
    setResources((prev) => [...prev, { id, content }]);
    if (!content.startsWith('__blob__')) {
      await saveToIndexedDB({ id, content });
    }
  };

  const deleteResource = async (id: number) => {
    setResources((prev) => prev.filter((r) => r.id !== id));
    await deleteFromIndexedDB(id);
  };

  const editResource = (id: number, newContent: string) => {
    setResources((prev) =>
      prev.map((r) => (r.id === id ? { ...r, content: newContent } : r))
    );
  };

  const moveToTodo = (item: ResourceItem) => {
    if (item.source === 'kanban') removeFromKanban(item);
    setTodoItems([
      ...todoItems,
      { ...item, id: generateId(), source: 'kanban', sourceColumn: 'todo' },
    ]);
  };

  const moveToInProgress = (item: ResourceItem) => {
    if (item.source === 'kanban') removeFromKanban(item);
    setInProgressItems([
      ...inProgressItems,
      {
        ...item,
        id: generateId(),
        source: 'kanban',
        sourceColumn: 'inProgress',
      },
    ]);
  };

  const moveToCompleted = (item: ResourceItem) => {
    if (item.source === 'kanban') removeFromKanban(item);
    setCompletedItems([
      ...completedItems,
      {
        ...item,
        id: generateId(),
        source: 'kanban',
        sourceColumn: 'completed',
      },
    ]);
  };

  const moveToResources = async (item: ResourceItem) => {
    const alreadyExists = resources.some((r) => r.content === item.content);
    if (alreadyExists) {
      if (item.source === 'kanban') returnToOriginalKanbanColumn(item);
      return;
    }

    removeFromKanban(item);
    const newItem = { ...item, id: generateId() };
    setResources((prev) => [...prev, newItem]);

    await saveToIndexedDB(newItem);
  };

  const returnToOriginalKanbanColumn = (item: ResourceItem) => {
    const newItem = { ...item, id: generateId(), source: 'kanban' };
    switch (item.sourceColumn) {
      case 'todo':
        if (!todoItems.some((i) => i.content === item.content)) {
          setTodoItems((prev) => [...prev, newItem]);
        }
        break;
      case 'inProgress':
        if (!inProgressItems.some((i) => i.content === item.content)) {
          setInProgressItems((prev) => [...prev, newItem]);
        }
        break;
      case 'completed':
        if (!completedItems.some((i) => i.content === item.content)) {
          setCompletedItems((prev) => [...prev, newItem]);
        }
        break;
      default:
        setTodoItems((prev) => [...prev, newItem]);
        break;
    }
  };

  const removeFromKanban = (item: ResourceItem) => {
    setTodoItems((prev) => prev.filter((t) => t.id !== item.id));
    setInProgressItems((prev) => prev.filter((p) => p.id !== item.id));
    setCompletedItems((prev) => prev.filter((c) => c.id !== item.id));
  };

  const handleClearAll = async () => {
    const confirmClear = window.confirm(
      "Are you sure you want to clear all data? This action cannot be undone."
    );
    
    if (confirmClear) {
      setResources([]);
      setTodoItems([]);
      setInProgressItems([]);
      setCompletedItems([]);
      await clearAllFromIndexedDB();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
      {/* Full width container */}
      <div className="w-full px-6 py-6 space-y-8">
        
        {/* Header Section */}
        <div className="relative">
          <AppHeader />
          
          {/* Clear All Button - positioned absolutely in top right */}
          <button
            onClick={handleClearAll}
            className="absolute top-0 right-0 group flex items-center space-x-2 px-4 py-2 text-sm font-medium text-red-600 bg-white/80 backdrop-blur-sm hover:bg-red-50 border border-red-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
          >
            <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
            <span>Clear All</span>
          </button>
        </div>

        {/* Kanban Board Section */}
        <section>
          <KanbanBoard
            todoItems={todoItems}
            inProgressItems={inProgressItems}
            completedItems={completedItems}
            onMoveToTodo={moveToTodo}
            onMoveToInProgress={moveToInProgress}
            onMoveToCompleted={moveToCompleted}
            onDeleteFromTodo={(id) =>
              setTodoItems((prev) => prev.filter((i) => i.id !== id))
            }
            onDeleteFromInProgress={(id) =>
              setInProgressItems((prev) => prev.filter((i) => i.id !== id))
            }
            onDeleteFromCompleted={(id) =>
              setCompletedItems((prev) => prev.filter((i) => i.id !== id))
            }
          />
        </section>

        {/* Resources Section */}
        <section>
          <ResourcesGrid
            resources={resources}
            onAddResource={addResource}
            onDeleteResource={deleteResource}
            onEditResource={editResource}
            onDropToResources={moveToResources}
          />
        </section>
        
        {/* Footer spacer */}
        <div className="h-8"></div>
      </div>
    </div>
  );
}