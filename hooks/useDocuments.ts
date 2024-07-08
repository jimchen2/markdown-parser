import { useState, useEffect, useRef } from "react";
import { debounce } from "lodash";
import { DocumentType } from "../types";
import { fetchDocument, saveDocument, createDocument, deleteDocument } from "./frontendutils";

const defaultDocument: DocumentType = {
  _id: "",
  title: "Untitled",
  body: "",
  date: new Date().toISOString().split("T")[0],
  type: "",
};

export function useDocuments() {
  const [documents, setDocuments] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState<DocumentType>(defaultDocument);
  const [isLoading, setIsLoading] = useState(false);
  const lastSavedVersionRef = useRef<DocumentType | null>(null);

  const fetchDocumentById = async (id: string = "668aea98c6a08bd0675c78ef") => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const result = await fetchDocument(id);
      setSelectedDoc(result);
      lastSavedVersionRef.current = result;
    } catch (error) {
      console.error("Error fetching document:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const debouncedSave = debounce(async (doc: DocumentType) => {
    if (JSON.stringify(doc) === JSON.stringify(lastSavedVersionRef.current)) {
      return; // No changes, don't save
    }

    try {
      const result = await saveDocument(doc);
      lastSavedVersionRef.current = result;
      setDocuments((prevDocuments) => prevDocuments.map((d) => (d._id === result._id ? { _id: result._id, title: result.title } : d)));
    } catch (error) {
      console.error("Error saving document:", error);
    }
  }, 1000);

  const handleDocumentChange = (field: string, value: string | number | Date) => {
    if (selectedDoc) {
      const updatedDoc = { ...selectedDoc, [field]: value };
      setSelectedDoc(updatedDoc);
      debouncedSave(updatedDoc);
    }
  };

  const handleNewDocument = async () => {
    const title = prompt("Enter a title for the new document:");
    if (!title) return;

    try {
      const newDoc = await createDocument(title);
      setDocuments((prevDocuments) => [...prevDocuments, { _id: newDoc._id, title: newDoc.title }]);
      setSelectedDoc(newDoc);
      lastSavedVersionRef.current = newDoc;
    } catch (error) {
      alert(error);
    }
  };

  const handleDeleteDocument = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this document?")) {
      try {
        await deleteDocument(id);
        setDocuments((prevDocuments) => prevDocuments.filter((doc) => doc._id !== id));

        if (selectedDoc._id === id) {
          setSelectedDoc(defaultDocument);
          lastSavedVersionRef.current = null;
        }
      } catch (error) {
        console.error("Error deleting document:", error);
        alert(error);
      }
    }
  };

  useEffect(() => {
    fetchDocumentById();
  }, []);

  useEffect(() => {
    return () => {
      debouncedSave.cancel();
    };
  }, []);

  return {
    documents,
    selectedDoc,
    isLoading,
    fetchDocument: fetchDocumentById,
    handleDocumentChange,
    handleNewDocument,
    handleDeleteDocument,
  };
}
