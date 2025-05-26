import React from 'react';
import AddButton from './ResourceInput/AddButton';
import ResourceForm from './ResourceInput/ResourceForm';

interface ResourceListProps {
  resources: ResourceItem[];
  setResources: (newResources: ResourceItem[]) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, content: string) => void;
  onRemoveFromSource?: (source: string, itemId: number) => void; // ✅ new
}


const ResourceInput: React.FC<ResourceInputProps> = ({
  inputRef,
  showInput,
  setShowInput,
  newResource,
  setNewResource,
  onAddResource,
}) => {
  const handleAdd = () => {
    if (newResource.trim()) {
      onAddResource(newResource.trim());
      setNewResource('');
      setShowInput(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div
      className={`mt-10 w-full max-w-xs mx-auto border-2 border-dashed rounded-2xl p-4 flex items-center justify-center min-h-[150px] transition-all duration-300 ${
        showInput
          ? 'border-blue-400 bg-blue-50'
          : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
      }`}
    >
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
  );
};

export default ResourceInput;