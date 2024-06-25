import React from 'react';
import { DocumentType } from '../types';

interface DocumentEditorProps {
  document: DocumentType | null;
  onChange: (field: string, value: string) => void;
}

const DocumentEditor: React.FC<DocumentEditorProps> = ({ document, onChange }) => {
  if (!document) return null;

  return (
    <div className="flex min-h-screen flex-col bg-gray-100 p-6 rounded-lg shadow-md">
      <div className="mb-6 flex space-x-4">
        <input
          type="date"
          className="w-1/2 p-3 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          value={document.date || ''}
          onChange={(e) => onChange('date', e.target.value)}
        />
        <input
          type="text"
          className="w-1/2 p-3 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          value={document.type || ''}
          onChange={(e) => onChange('type', e.target.value)}
          placeholder="Type (tag)"
        />
      </div>
      <textarea
        className="flex-grow p-4 bg-white rounded-md resize-none focus:outline-none transition"
        value={document.body || ''}
        onChange={(e) => onChange('body', e.target.value)}
        placeholder="Enter your Markdown here..."
      ></textarea>
    </div>
  );
};

export default DocumentEditor;