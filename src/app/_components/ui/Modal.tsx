'use client';
import React from 'react';
import ReactDOM from 'react-dom';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  const isLongPlainText =
    typeof children === 'string' && children.length > 300;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm px-4 animate-fade-in">
      {/* Background overlay with subtle animation */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-slate-900/10 via-blue-900/5 to-purple-900/10"
        onClick={onClose}
      />
      
      {/* Modal container with enhanced styling */}
      <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl shadow-black/10 w-full max-w-2xl border border-white/20 animate-scale-in pointer-events-auto">
        {/* Subtle gradient border effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-100/20 via-transparent to-purple-100/20 pointer-events-none" />
        
        {/* Content container */}
        <div className="relative p-8">
          {/* Enhanced close button */}
          <button
            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100/80 rounded-full transition-all duration-200 hover:scale-110 group"
            onClick={onClose}
          >
            <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
          </button>

          {/* Enhanced title with gradient */}
          {title && (
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 via-slate-700 to-gray-800 bg-clip-text text-transparent mb-2">
                {title}
              </h2>
              <div className="w-16 h-0.5 bg-gradient-to-r from-green-800 to-green-500 mx-auto rounded-full" />
            </div>
          )}

          {/* Enhanced content area */}
          <div
            className={`text-sm text-gray-700 leading-relaxed ${
              isLongPlainText 
                ? 'max-h-[420px] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent hover:scrollbar-thumb-gray-300' 
                : ''
            }`}
            style={{
              whiteSpace: 'pre-wrap',
              scrollbarWidth: 'thin',
              scrollbarColor: '#e5e7eb transparent'
            }}
          >
            {/* Content wrapper with subtle styling */}
            <div className={`${isLongPlainText ? 'space-y-4' : ''}`}>
              {children}
            </div>
          </div>
        </div>

        {/* Subtle bottom highlight */}
        <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-gray-200/50 to-transparent" />
      </div>

      {/* Custom CSS for animations and scrollbar */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scale-in {
          from { 
            opacity: 0; 
            transform: scale(0.95) translateY(-10px); 
          }
          to { 
            opacity: 1; 
            transform: scale(1) translateY(0); 
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.15s ease-out;
        }
        
        .animate-scale-in {
          animation: scale-in 0.2s ease-out;
        }
        
        /* Custom scrollbar for webkit browsers */
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background-color: #e5e7eb;
          border-radius: 3px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background-color: #d1d5db;
        }
      `}</style>
    </div>,
    document.body
  );
};

export default Modal;