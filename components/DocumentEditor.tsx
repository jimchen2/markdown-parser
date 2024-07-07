import React, { useRef } from "react";
import { DocumentType } from "../types";
import useDocumentStats from "./useDocumentStats";
import useImageUpload from "./useImageUpload";
import EditorHeader from "./EditorHeader";
import EditorBody from "./EditorBody";
import EditorFooter from "./EditorFooter";

interface DocumentEditorProps {
  document: DocumentType | null;
  onChange: (field: string, value: string) => void;
  isMobile: boolean;
}

const DocumentEditor: React.FC<DocumentEditorProps> = ({ document, onChange, isMobile }) => {
  const { wordCount, charCount } = useDocumentStats(document);
  const { isUploading, handleImageUpload, handlePaste } = useImageUpload(document, onChange);
  const editorBodyRef = useRef<HTMLTextAreaElement>(null);

  if (!document) return null;

  const getCursorPosition = () => {
    return editorBodyRef.current?.selectionStart ?? 0;
  };

  return (
    <div className={`flex flex-col bg-white rounded-lg shadow-md ${!isMobile ? "min-h-screen" : "min-h-[600px]"}`}>
      <EditorHeader document={document} onChange={onChange} />
      <EditorBody ref={editorBodyRef} document={document} onChange={onChange} onPaste={handlePaste} />
      <EditorFooter wordCount={wordCount} charCount={charCount} isUploading={isUploading} onUpload={(file) => handleImageUpload(file, getCursorPosition())} />
    </div>
  );
};

export default DocumentEditor;
