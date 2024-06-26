import React from "react";
import DocumentTree from "../components/DocumentTree";
import DocumentEditor from "../components/DocumentEditor";
import Preview from "../components/Preview";
import { DocumentType } from "../types";
import CookieModal from "../components/CookieModal";

interface MobileViewProps {
  documents: DocumentType[];
  selectedDoc: DocumentType | null;
  fetchDocument: (id: string) => void;
  handleDocumentChange: (updatedDoc: DocumentType) => void;
  handleNewDocument: () => void;
  handleDeleteDocument: (id: string) => void;
  handleCookieButton: () => void;
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  handleSetCookie: (cookieValue: string) => void;
}

const MobileView: React.FC<MobileViewProps> = ({
  documents,
  selectedDoc,
  fetchDocument,
  handleDocumentChange,
  handleNewDocument,
  handleDeleteDocument,
  handleCookieButton,
  isModalOpen,
  setIsModalOpen,
  handleSetCookie,
}) => {
  return (
    <div className="bg-gray-100 flex flex-col">
      <div className="flex flex-col gap-4 pb-28">
        {" "}
        {/* Increased bottom padding */}
        <section>
          <button
            className="text-black p-2 rounded bg-gray-200 hover:bg-gray-400 w-full"
            onClick={handleNewDocument}
          >
            New Document
          </button>
        </section>
        <section className="p-4">
          <DocumentTree
            documents={documents}
            onSelectDocument={fetchDocument}
            onDeleteDocument={handleDeleteDocument}
          />
        </section>
        <section>
          <DocumentEditor
            document={selectedDoc}
            onChange={handleDocumentChange}
            isMobile={1}
          />
        </section>
        <section>
          <Preview
            markdown={selectedDoc?.body || ""}
            title={selectedDoc?.title || "Untitled"}
            isMobile={1}
          />
        </section>
      </div>

      <div className="bottom-4 flex flex-col items-center">
        <button
          className="bg-amber-100 text-amber-800 p-6 rounded-full hover:bg-amber-200 w-24 h-24 flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110"
          onClick={handleCookieButton}
        >
          <span className="text-6xl" role="img" aria-label="Cookie">
            🍪
          </span>
        </button>
        <span className="mt-2 text-sm font-medium text-gray-600">
          Set Cookie
        </span>
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
