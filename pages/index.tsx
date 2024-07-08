import { useState, useEffect } from "react";
import DocumentTree from "../components/DocumentTree";
import DocumentEditor from "../components/DocumentEditor";
import Preview from "../components/Preview";
import { useDocuments } from "../hooks/useDocuments";
import { setCookie } from "../components/cookie";
import CookieModal from "../components/CookieModal";
import MobileView from "../mobile/MobileView";

export default function Home() {
  const { selectedDoc, fetchDocument, handleDocumentChange, handleNewDocument } = useDocuments();

  const [isMobile, setIsMobile] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleCookieButton = () => {
    setIsModalOpen(true);
  };

  const handleSetCookie = (cookieValue: string) => {
    setCookie(cookieValue);
    setIsModalOpen(false);
    window.location.reload();
  };

  if (isMobile) {
    return (
      <MobileView
        selectedDoc={selectedDoc}
        fetchDocument={fetchDocument}
        handleDocumentChange={handleDocumentChange}
        handleNewDocument={handleNewDocument}
        handleCookieButton={handleCookieButton}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleSetCookie={handleSetCookie}
      />
    );
  }
  return (
    <div className="min-h-screen flex">
      <div className="w-1/5 bg-white p-4 flex flex-col">
        <button className="mb-4 text-black p-2 rounded hover:scale-105" onClick={handleNewDocument}>
          New Document
        </button>
        <div className="w-full">
          <div className="w-full">
            <DocumentTree mobile={isMobile} onSelectDocumentId={fetchDocument} />
          </div>
        </div>
      </div>
      <div className="w-2/5">
        <DocumentEditor document={selectedDoc} onChange={handleDocumentChange} isMobile={isMobile} />
      </div>
      <div className="w-2/5">
        <Preview markdown={selectedDoc?.body || ""} title={selectedDoc?.title || "Untitled"} />
      </div>
      <div className="absolute bottom-4 left-4 flex flex-col items-center">
        <button
          className="bg-amber-100 text-amber-800 p-4 rounded-full hover:bg-amber-200 w-24 h-24 flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110"
          onClick={handleCookieButton}
        >
          <span className="text-6xl" role="img" aria-label="Cookie">
            🍪
          </span>
        </button>
        <span className="mt-2 text-sm font-medium text-gray-600">Set Cookie</span>
      </div>
      <CookieModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSetCookie={handleSetCookie} />
    </div>
  );
}
