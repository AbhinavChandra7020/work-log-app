'use client';
import React from 'react';
import AddButton from './ResourceInput/AddButton';
import ResourceForm from './ResourceInput/ResourceForm';
import { saveToIndexedDB } from '../_utils/indexedDbUtils';

interface ResourceInputProps {
  inputRef: React.RefObject<HTMLTextAreaElement>;
  showInput: boolean;
  setShowInput: (show: boolean) => void;
  newResource: string;
  setNewResource: (value: string) => void;
  onAddResource: (content: string) => void;
}

const ResourceInput: React.FC<ResourceInputProps> = ({
  inputRef,
  showInput,
  setShowInput,
  newResource,
  setNewResource,
  onAddResource,
}) => {
  const handleAdd = async (text: string, image?: File) => {
    const id = Date.now() + Math.random();
    const content = image ? `__blob__${id}` : text;

    if (image) {
      await saveToIndexedDB({ id, content, blob: image });
    }

    onAddResource(content);
    setNewResource('');
    setShowInput(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAdd(newResource);
    }
  };

  return (
    <div className="mt-12 w-full max-w-md mx-auto">
      <div
        className={`relative border-2 border-dashed rounded-3xl p-8 flex items-center justify-center min-h-[180px] transition-all duration-500 ${
          showInput
            ? 'border-blue-400 bg-gradient-to-br from-blue-50/80 to-sky-50/80 backdrop-blur-sm scale-105'
            : 'border-gray-300/60 hover:border-blue-400/70 hover:bg-gradient-to-br hover:from-blue-50/30 hover:to-sky-50/30 hover:scale-102'
        }`}
      >
        {/* floating decoration */}
        {!showInput && (
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-blue-400 to-sky-400 rounded-full opacity-20 animate-pulse"></div>
        )}
        
        {showInput ? (
          <ResourceForm
            inputRef={inputRef}
            value={newResource}
            onChange={setNewResource}
            onCancel={() => {
              setShowInput(false);
              setNewResource('');
            }}
            onSubmit={handleAdd}
            onKeyPress={handleKeyPress}
          />
        ) : (
          <AddButton onClick={() => setShowInput(true)} />
        )}
      </div>
    </div>
  );
};

export default ResourceInput;