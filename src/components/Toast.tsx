'use client';
import React, { useEffect } from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
}

export default function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'success' 
    ? 'bg-green-200' 
    : type === 'error' 
    ? 'bg-red-200' 
    : 'bg-blue-200';

  return (
    <div className={`fixed bottom-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-up`}>
      <div className="flex items-center gap-2">
        <span>{message}</span>
        <button 
          onClick={onClose} 
          className="ml-2 hover:opacity-75"
          aria-label="Close notification"
        >
          ×
        </button>
      </div>
    </div>
  );
}