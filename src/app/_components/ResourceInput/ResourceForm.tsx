'use client';
import React, { useState } from 'react';
import { Upload, FileImage, X } from 'lucide-react';

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
    <div className="w-full bg-white/95 backdrop-blur-xl border border-gray-200/60 rounded-2xl shadow-xl p-6 transition-all duration-300">
      {/* header */}
      <div className="text-center mb-5">
        <h3 className="text-lg font-semibold bg-gradient-to-r from-slate-700 to-blue-600 bg-clip-text text-transparent">
          Add New Resource
        </h3>
      </div>

      {/* content */}
      <div className="space-y-5">
        {/* textarea - only shown if no image */}
        {!image && (
          <div className="w-full">
            <textarea
              ref={inputRef}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onKeyPress={onKeyPress}
              placeholder="✨ Paste a URL, write your thoughts, or share something inspiring..."
              className="w-full p-4 text-sm bg-gray-50/80 text-gray-800 placeholder-gray-400 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-400/40 focus:border-blue-300 transition-all duration-200"
              rows={4}
              autoFocus
            />
          </div>
        )}

        {/* file upload */}
        <div className="w-full">
          {!image ? (
            <label className="relative block w-full group">
              <div className="w-full p-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-400 hover:bg-blue-50/20 transition-all duration-300 cursor-pointer">
                <div className="flex flex-col items-center space-y-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl flex items-center justify-center group-hover:from-blue-100 group-hover:to-blue-50 transition-all duration-300 shadow-sm">
                    <Upload className="w-6 h-6 text-gray-500 group-hover:text-blue-600 transition-colors duration-300" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-700 group-hover:text-blue-700 transition-colors duration-300">
                      Drop an image here or click to browse
                    </p>
                    <p className="text-xs text-gray-400 mt-1">JPG, PNG, GIF up to 10MB</p>
                  </div>
                </div>
              </div>
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={(e) => setImage(e.target.files?.[0] ?? null)}
              />
            </label>
          ) : (
            // image preview
            <div className="relative bg-gray-50/50 rounded-xl border border-gray-200/50 overflow-hidden">
              <div className="relative">
                <img
                  src={imagePreviewUrl!}
                  alt="Preview"
                  className="w-full h-40 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
              </div>
              
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FileImage className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700 truncate">
                      {image?.name}
                    </span>
                  </div>
                  <button
                    onClick={() => setImage(null)}
                    className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* add resource button */}
        <div className="w-full pt-2">
          <button
            onClick={() => onSubmit(value.trim(), image ?? undefined)}
            disabled={!value.trim() && !image}
            className="w-full py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl hover:from-blue-700 hover:to-blue-600 shadow-lg hover:shadow-blue-200/50 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-lg transform hover:scale-[1.01]"
          >
            Add Resource
          </button>
        </div>

        {/* cancel button */}
        <div className="w-full">
          <button
            onClick={onCancel}
            className="w-full py-2.5 text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100/50 rounded-xl transition-all duration-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResourceForm;