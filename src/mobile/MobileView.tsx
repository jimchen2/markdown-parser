import React, { useState } from "react";
import DocumentTree from "../components/DocumentTree";
import DocumentEditor from "../components/DocumentEditor";
import Preview from "../components/Preview";
import { DocumentType } from "../types";
import CookieModal from "../components/CookieModal";

interface MobileViewProps {
  selectedDoc: DocumentType | null;
  fetchDocument: (id: string) => void;
  handleDocumentChange: (field: string, value: string | number | Date) => void;
  handleNewDocument: () => void;
  handleCookieButton: () => void;
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  handleSetCookie: (cookieValue: string) => void;
}

const MobileView: React.FC<MobileViewProps> = ({
  selectedDoc,
  fetchDocument,
  handleDocumentChange,
  handleNewDocument,
  handleCookieButton,
  isModalOpen,
  setIsModalOpen,
  handleSetCookie,
}) => {
  const [activeTab, setActiveTab] = useState<'tree' | 'editor' | 'preview'>('tree');

  return (
    <div className="flex flex-col h-screen">
      <div className="flex justify-around bg-white p-2 sticky top-0 z-10">
        <button
          className={`px-4 py-2 ${activeTab === 'tree' ? 'bg-gray-200' : ''}`}
          onClick={() => setActiveTab('tree')}
        >
          Documents
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'editor' ? 'bg-gray-200' : ''}`}
          onClick={() => setActiveTab('editor')}
        >
          Editor
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'preview' ? 'bg-gray-200' : ''}`}
          onClick={() => setActiveTab('preview')}
        >
          Preview
        </button>
      </div>

      <div className="flex-grow overflow-y-auto p-4">
        {activeTab === 'tree' && (
          <>
            <button
              className="w-full mb-4 bg-gray-200 p-2 rounded"
              onClick={handleNewDocument}
            >
              New Document
            </button>
            <DocumentTree
              mobile={true}
              onSelectDocumentId={(id) => {
                fetchDocument(id);
                setActiveTab('editor');
              }}
            />
          </>
        )}
        {activeTab === 'editor' && (
          <DocumentEditor
            document={selectedDoc}
            onChange={(field, value) => handleDocumentChange(field, value)}
            isMobile={true}
          />
        )}
        {activeTab === 'preview' && (
          <Preview
            markdown={selectedDoc?.body || ""}
            title={selectedDoc?.title || "Untitled"}
          />
        )}
      </div>

      <div className="fixed bottom-4 right-4">
        <button
          className="p-4 rounded-full w-16 h-16 flex items-center justify-center shadow-lg"
          onClick={handleCookieButton}
        >
          <span className="text-3xl" role="img" aria-label="Cookie">
            🍪
          </span>
        </button>
      </div>

      <CookieModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSetCookie={handleSetCookie}
      />
    </div>
  );
};

export default MobileView;