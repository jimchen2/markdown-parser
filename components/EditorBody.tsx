import React, { useRef } from "react";
import { DocumentType } from "../types";

interface EditorBodyProps {
  document: DocumentType;
  onChange: (field: string, value: string) => void;
  onPaste: (e: React.ClipboardEvent<HTMLTextAreaElement>, cursorPosition: number) => void;
}

const EditorBody: React.FC<EditorBodyProps> = ({ document, onChange, onPaste }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const cursorPosition = textareaRef.current?.selectionStart || 0;
    onPaste(e, cursorPosition);
  };

  return (
    <textarea
      ref={textareaRef}
      className="flex-grow p-6 bg-white rounded-md resize-none focus:outline-none transition"
      value={document.body || ""}
      onChange={(e) => onChange("body", e.target.value)}
      onPaste={handlePaste}
      placeholder="Enter your Markdown here..."
    ></textarea>
  );
};

export default EditorBody;