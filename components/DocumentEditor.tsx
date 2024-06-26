import React from "react";
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

  if (!document) return null;

  return (
    <div className={`flex flex-col bg-gray-100 p-6 rounded-lg shadow-md ${!isMobile ? 'min-h-screen' : 'min-h-[600px]'}`}>
      <EditorHeader document={document} onChange={onChange} />
      <EditorBody document={document} onChange={onChange} onPaste={handlePaste} />
      <EditorFooter
        wordCount={wordCount}
        charCount={charCount}
        isUploading={isUploading}
        onUpload={handleImageUpload}
      />
    </div>
  );
};

export default DocumentEditor;