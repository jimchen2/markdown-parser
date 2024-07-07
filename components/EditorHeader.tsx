import React from "react";
import { DocumentType } from "../types";

interface EditorHeaderProps {
  document: DocumentType;
  onChange: (field: string, value: string) => void;
}

const EditorHeader: React.FC<EditorHeaderProps> = ({ document, onChange }) => (
  <div className="mt-4 mb-8 flex space-x-6">
    <div className="w-1/2">
      <input
        id="date"
        type="date"
        className="w-full p-3 rounded-lg focus:border-transparent focus:outline-none transition duration-200 ease-in-out"
        value={document.date || ""}
        onChange={(e) => onChange("date", e.target.value)}
      />
    </div>
    <div className="w-1/2">
      <input
        id="type"
        type="text"
        className="w-full p-3 rounded-lg focus:border-transparent focus:outline-none transition duration-200 ease-in-out"
        value={document.type || ""}
        onChange={(e) => onChange("type", e.target.value)}
        placeholder="Enter document type"
      />
    </div>
  </div>
);

export default EditorHeader;
