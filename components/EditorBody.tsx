import React from "react";
import { DocumentType } from "../types";

interface EditorBodyProps {
  document: DocumentType;
  onChange: (field: string, value: string) => void;
  onPaste: (e: React.ClipboardEvent<HTMLTextAreaElement>) => void;
}

const EditorBody: React.FC<EditorBodyProps> = ({ document, onChange, onPaste }) => (
  <textarea
    className="flex-grow p-4 bg-white rounded-md resize-none focus:outline-none transition"
    value={document.body || ""}
    onChange={(e) => onChange("body", e.target.value)}
    onPaste={onPaste}
    placeholder="Enter your Markdown here..."
  ></textarea>
);

export default EditorBody;