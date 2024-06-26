// components/CookieModal.tsx
import React, { useState } from 'react';

interface CookieModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSetCookie: (value: string) => void;
}

const CookieModal: React.FC<CookieModalProps> = ({ isOpen, onClose, onSetCookie }) => {
  const [cookieValue, setCookieValue] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSetCookie(cookieValue);
    setCookieValue('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Set Cookie</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={cookieValue}
            onChange={(e) => setCookieValue(e.target.value)}
            className="border p-2 mb-4 w-full"
            placeholder="Enter cookie value"
          />
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-4 py-2 bg-gray-200 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gray-500 text-white rounded"
            >
              Set Cookie
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CookieModal;