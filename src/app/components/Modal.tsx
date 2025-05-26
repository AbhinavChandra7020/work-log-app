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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(255,255,255,0.5)] px-4">
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6 animate-fade-in pointer-events-auto">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </button>

        {title && (
          <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
            {title}
          </h2>
        )}

        <div
          className={`text-sm text-black whitespace-pre-wrap leading-relaxed ${
            isLongPlainText ? 'max-h-[400px] overflow-y-auto pr-2' : ''
          }`}
        >
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
