import React, { forwardRef } from "react";
import { DocumentType } from "../types";

interface EditorBodyProps {
  document: DocumentType;
  onChange: (field: string, value: string) => void;
  onPaste: (e: React.ClipboardEvent<HTMLTextAreaElement>, cursorPosition: number) => void;
}

const EditorBody = forwardRef<HTMLTextAreaElement, EditorBodyProps>(({ document, onChange, onPaste }, ref) => {
  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const cursorPosition = (ref as React.RefObject<HTMLTextAreaElement>).current?.selectionStart || 0;
    onPaste(e, cursorPosition);
  };

  return (
    <textarea
      ref={ref}
      className="flex-grow p-6 font-roboto bg-white rounded-md resize-none focus:outline-none transition"
      value={document.body || ""}
      onChange={(e) => onChange("body", e.target.value)}
      onPaste={handlePaste}
      placeholder="Enter your Markdown here..."
    ></textarea>
  );
});

EditorBody.displayName = "EditorBody";

export default EditorBody;
