import React from "react";
import { DocumentType } from "../types";

interface EditorHeaderProps {
  document: DocumentType;
  onChange: (field: string, value: number | string | Date) => void;
}

const EditorHeader: React.FC<EditorHeaderProps> = ({ document, onChange }) => {
  const formatDate = (date: Date | string): string => {
    if (date instanceof Date) {
      return date.toISOString().split("T")[0];
    }
    if (typeof date === "string") {
      return date.split("T")[0];
    }
    return "";
  };

  const handleTitleChange = () => {
    const newTitle = prompt("Enter new title:", document.title);
    if (newTitle !== null) {
      onChange("title", newTitle);
    }
  };

  return (
    <div className="mt-4 mb-8 flex space-x-1 items-center">
      <div className="w-1/4">
        <input
          id="date"
          type="date"
          className="w-full p-3 rounded-lg focus:border-transparent focus:outline-none transition duration-200 ease-in-out"
          value={formatDate(document.date)}
          onChange={(e) => onChange("date", new Date(e.target.value))}
        />
      </div>
      <div className="w-1/4">
        <select
          id="access"
          className="w-full p-3 rounded-lg bg-white focus:border-transparent focus:outline-none transition duration-200 ease-in-out"
          value={document.access || 2}
          onChange={(e) => onChange("access", parseInt(e.target.value))}
        >
          <option value={1}>Public</option>
          <option value={2}>Public View</option>
          <option value={3}>Private View</option>
        </select>
      </div>
      <div className="w-1/4">
        <input
          type="text"
          className="w-full p-3 rounded-lg focus:border-transparent focus:outline-none transition duration-200 ease-in-out"
          value={document.type || ""}
          onChange={(e) => onChange("type", e.target.value)}
          placeholder="Type (tag)"
        />
      </div>

      <div className="w-1/10">
        <button onClick={handleTitleChange} 
        className="w-full p-3 rounded-lg focus:outline-none transition duration-200 ease-in-out bg-gray-200 hover:bg-gray-300"
        >
          Edit Title
        </button>
      </div>
    </div>
  );
};

export default EditorHeader;
