import React from "react";
import { DocumentType } from "../types";

interface EditorHeaderProps {
  document: DocumentType;
  onChange: (field: string, value: number | string | Date) => void;
}

const EditorHeader: React.FC<EditorHeaderProps> = ({ document, onChange }) => {
  const formatDate = (date: Date | string): string => {
    if (date instanceof Date) {
      return date.toISOString().split('T')[0];
    }
    if (typeof date === 'string') {
      return date.split('T')[0];
    }
    return '';
  };

  return (
    <div className="mt-4 mb-8 flex space-x-6">
      <div className="w-1/3">
        <input
          id="date"
          type="date"
          className="w-full p-3 rounded-lg focus:border-transparent focus:outline-none transition duration-200 ease-in-out"
          value={formatDate(document.date)}
          onChange={(e) => onChange("date", new Date(e.target.value))}
        />
      </div>
      <div className="w-1/3">
        <select
          id="access"
          className="w-full p-3 rounded-lg focus:border-transparent focus:outline-none transition duration-200 ease-in-out"
          value={document.access || 2}
          onChange={(e) => onChange("access", parseInt(e.target.value))}
        >
          <option value={1}>Public</option>
          <option value={2}>Public with View Key</option>
          <option value={3}>Private with View Key</option>
        </select>
      </div>
    </div>
  );
};

export default EditorHeader;