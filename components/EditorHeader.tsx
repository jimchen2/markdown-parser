import React from "react";
import { DocumentType } from "../types";

interface EditorHeaderProps {
  document: DocumentType;
  onChange: (field: string, value: string) => void;
}

const EditorHeader: React.FC<EditorHeaderProps> = ({ document, onChange }) => (
  <div className="mb-6 flex space-x-4">
    <input
      type="date"
      className="w-1/2 p-3 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
      value={document.date || ""}
      onChange={(e) => onChange("date", e.target.value)}
    />
    <input
      type="text"
      className="w-1/2 p-3 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
      value={document.type || ""}
      onChange={(e) => onChange("type", e.target.value)}
      placeholder="Type (tag)"
    />
  </div>
);

export default EditorHeader;