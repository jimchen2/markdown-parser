"use client";
import React, { useEffect, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/solid";

interface Document {
  _id: string;
  title: string;
  date: string;
  type: string;
  access: number;
  body: string;
}

interface DocumentType {
  type: string;
  documents: Document[];
}

interface DocumentTreeProps {
  mobile: boolean;
  newlines?: number;
  fontSize?: string;
  onSelectDocumentId: (id: string) => void;
}

const DocumentTree: React.FC<DocumentTreeProps> = React.memo(({ mobile, newlines = 2, fontSize = "text-2xl", onSelectDocumentId }) => {
  const [DocumentTrees, setDocumentTrees] = useState<DocumentType[]>([]);
  const [openDropdowns, setOpenDropdowns] = useState<{
    [key: string]: boolean;
  }>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDocumentTrees = async () => {
      try {
        const res = await fetch("/api/getDocumentMetadata");
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data: Document[] = await res.json();

        // Group documents by type
        const groupedDocuments = data.reduce((acc, doc) => {
          if (!acc[doc.type]) {
            acc[doc.type] = [];
          }
          acc[doc.type].push(doc);
          return acc;
        }, {} as Record<string, Document[]>);

        const documentTypes: DocumentType[] = Object.entries(groupedDocuments).map(([type, documents]) => ({ type, documents }));

        setDocumentTrees(documentTypes);
      } catch (error) {
        console.error("Failed to fetch document previews:", error);
        setError("Failed to load documents. Please try again later.");
      }
    };

    fetchDocumentTrees();
  }, []);

  const toggleDropdown = (type: string) => {
    setOpenDropdowns((prevOpenDropdowns) => ({
      ...prevOpenDropdowns,
      [type]: !prevOpenDropdowns[type],
    }));
  };

  const handleSelectDocument = (id: string) => {
    onSelectDocumentId(id);
    if (mobile) {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  };

  const renderNewlines = () => {
    return Array.from({ length: newlines }).map((_, idx) => <br key={idx} />);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4">
      <div className="w-full sticky top-0 max-h-[75vh] overflow-y-auto">
        {" "}
        {renderNewlines()}
        <ul className="overflow-x-hidden">
          {DocumentTrees.map((docType) => (
            <li key={`${docType.type}`}>
              <div className="rounded-lg transition duration-300 ease-in-out transform">
                <div
                  className={`flex items-center space-y-2 text-md cursor-pointer justify-between hover:bg-gray-200 p-3 ${mobile ? "min-w-[320px]" : ""}`}
                  onClick={() => toggleDropdown(docType.type)}
                >
                  <h4 className="font-semibold text-gray-800">
                    {docType.type} ({docType.documents.length})
                  </h4>
                  <ChevronDownIcon className={`h-5 w-5 text-gray-800 duration-300 ease-in-out ${openDropdowns[docType.type] ? "rotate-180" : "rotate-0"}`} />
                </div>
                <div className={`transition-max-height duration-500 ease-in-out overflow-auto ${openDropdowns[docType.type] ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
                  <ul className="mt-2 space-y-2">
                    {docType.documents.map((doc) => (
                      <li
                        key={doc._id}
                        className="p-2 rounded-lg transition duration-300 ease-in-out transform text-sm hover:bg-gray-200 hover:shadow-lg hover:cursor-pointer"
                        onClick={() => handleSelectDocument(doc._id)}
                      >
                        <div className="flex justify-center">
                          <h6 className="text-center text-sm">{doc.title}</h6>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          ))}
          {renderNewlines()}
          <br/>
          <br/>
        </ul>
      </div>
    </div>
  );
});

DocumentTree.displayName = "DocumentTree";

export default DocumentTree;
