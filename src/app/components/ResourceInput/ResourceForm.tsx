import React from 'react';

interface ResourceFormProps {
  inputRef: React.RefObject<HTMLTextAreaElement>;
  value: string;
  onChange: (value: string) => void;
  onCancel: () => void;
  onSubmit: () => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

const ResourceForm: React.FC<ResourceFormProps> = ({
  inputRef,
  value,
  onChange,
  onCancel,
  onSubmit,
  onKeyPress,
}) => (
  <div className="w-full">
    <textarea
      ref={inputRef}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyPress={onKeyPress}
      placeholder="Enter text, URL, or YouTube link..."
      className="w-full p-4 bg-white text-gray-800 placeholder-gray-500 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
      rows={4}
      autoFocus
    />
    <div className="flex justify-end space-x-3 mt-4">
      <button
        onClick={onCancel}
        className="px-4 py-2 text-gray-600 hover:text-gray-800 text-sm font-medium hover:bg-gray-100 rounded-lg transition-colors duration-200"
      >
        Cancel
      </button>
      <button
        onClick={onSubmit}
        className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg text-sm hover:from-blue-600 hover:to-blue-700 font-medium shadow-md hover:shadow-lg transition-all duration-200"
      >
        Add Resource
      </button>
    </div>
  </div>
);

export default ResourceForm;
