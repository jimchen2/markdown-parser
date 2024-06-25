import { useState, useEffect } from "react";
import DocumentTree from "../components/DocumentTree";
import DocumentEditor from "../components/DocumentEditor";
import Preview from "../components/Preview";
import { useDocuments } from "../hooks/useDocuments";
import { setCookie } from "../components/cookie";
import { DocumentType } from "../types";

const defaultDocument: DocumentType = {
  _id: "",
  title: "Untitled",
  body: "",
  date: new Date().toISOString().split("T")[0],
  type: "",
};

export default function Home() {
  const {
    documents,
    selectedDoc,
    isLoading,
    fetchDocument,
    handleDocumentChange,
    handleNewDocument,
    handleDeleteDocument,
  } = useDocuments();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // Adjust this breakpoint as needed
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleCookieButton = () => {
    const cookieValue = prompt("Enter a value for the cookie:");
    if (cookieValue) {
      setCookie(cookieValue);
      alert("Cookie set successfully!");
      window.location.reload();
    }
  };

  if (isMobile) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <div className="flex flex-col gap-4 pb-16"> {/* Added padding-bottom to make space for the fixed button */}
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
            />
          </section>
  
          <section>
            <Preview
              markdown={selectedDoc?.body || ""}
              title={selectedDoc?.title || "Untitled"}
            />
          </section>
        </div>
  
        {/* Fixed position button at bottom left */}
        <div className="fixed bottom-4 left-4">
          <button
            className="bg-gray-200 text-black p-2 rounded hover:bg-gray-400"
            onClick={handleCookieButton}
          >
            Set Cookie
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <div className="w-1/5 bg-white p-4 flex flex-col">
        <button
          className="mb-4 text-black p-2 rounded bg-gray-200 hover:bg-gray-400 hover:scale-105"
          onClick={handleNewDocument}
        >
          New Document
        </button>
        <div className="w-full">
          <DocumentTree
            documents={documents}
            onSelectDocument={fetchDocument}
            onDeleteDocument={handleDeleteDocument}
          />
        </div>
      </div>
      <div className="w-2/5">
        <DocumentEditor
          document={selectedDoc}
          onChange={handleDocumentChange}
        />{" "}
      </div>

      <div className="w-2/5">
        {" "}
        <Preview
          markdown={selectedDoc?.body || ""}
          title={selectedDoc?.title || "Untitled"}
        />
      </div>
      <button
        className="absolute bottom-4 left-4 bg-gray-200 text-black p-2 rounded hover:bg-gray-400"
        onClick={handleCookieButton}
      >
        Set Cookie
      </button>
    </div>
  );
}
