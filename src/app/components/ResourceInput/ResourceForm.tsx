'use client';
import React, { useState } from 'react';
import { Upload, FileImage } from 'lucide-react';

interface ResourceFormProps {
  inputRef: React.RefObject<HTMLTextAreaElement>;
  value: string;
  onChange: (value: string) => void;
  onCancel: () => void;
  onSubmit: (text: string, image?: File) => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

const ResourceForm: React.FC<ResourceFormProps> = ({
  inputRef,
  value,
  onChange,
  onCancel,
  onSubmit,
  onKeyPress,
}) => {
  const [image, setImage] = useState<File | null>(null);
  const imagePreviewUrl = image ? URL.createObjectURL(image) : null;

  return (
    <div className="w-full bg-white/90 backdrop-blur-xl border border-purple-200/50 rounded-2xl shadow-xl p-6 transition-all duration-300">
      {/* Header */}
      <div className="text-center mb-4">
        <h3 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Add New Resource
        </h3>
      </div>

      {/* Stacked Layout */}
      <div className="space-y-4">
        {/* Textarea - Full Width Block */}
        <div className="w-full">
          <textarea
            ref={inputRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyPress={onKeyPress}
            placeholder="✨ Paste a URL, write your thoughts, or share something inspiring..."
            className="w-full p-4 text-sm bg-gradient-to-br from-gray-50/80 to-white/80 text-gray-800 placeholder-gray-400 border-2 border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-300 transition-all duration-200 shadow-inner"
            rows={4}
            autoFocus
          />
        </div>

        {/* File Upload - Full Width Block */}
        <div className="w-full">
          <label className="block w-full p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-purple-400 hover:bg-purple-50/30 transition-all duration-200 cursor-pointer group text-center">
            <div className="flex flex-col items-center space-y-2">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center group-hover:from-purple-200 group-hover:to-pink-200 transition-all duration-200">
                <Upload className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 group-hover:text-purple-700">
                  Upload Image
                </p>
                <p className="text-xs text-gray-400">JPG, PNG, GIF up to 10MB</p>
              </div>
            </div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setImage(e.target.files?.[0] ?? null)}
            />
          </label>
        </div>

        {/* Image Preview */}
        {imagePreviewUrl && (
          <div className="w-full">
            <div className="flex items-center space-x-2 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200/50">
              <FileImage className="w-4 h-4 text-purple-600 flex-shrink-0" />
              <span className="text-sm font-medium text-purple-700 truncate flex-1">
                {image?.name}
              </span>
              <button
                onClick={() => setImage(null)}
                className="text-xs text-red-500 hover:text-red-700 font-medium px-2"
              >
                Remove
              </button>
            </div>
            <img
              src={imagePreviewUrl}
              alt="Preview"
              className="mt-2 rounded-lg max-h-32 w-full object-cover shadow-md border border-gray-200"
            />
          </div>
        )}

        {/* Add Resource Button - Full Width Block */}
        <div className="w-full">
          <button
            onClick={() => onSubmit(value.trim(), image ?? undefined)}
            disabled={!value.trim() && !image}
            className="w-full py-3 text-sm font-bold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl hover:from-purple-600 hover:to-pink-600 shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02]"
          >
            Add Resource
          </button>
        </div>

        {/* Cancel Button - Full Width Block */}
        <div className="w-full">
          <button
            onClick={onCancel}
            className="w-full py-2 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100/80 rounded-xl transition-all duration-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResourceForm;