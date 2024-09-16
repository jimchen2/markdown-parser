// useDocuments.ts

import { useState, useEffect, useRef } from "react";
import { debounce } from "lodash";
import { DocumentType, fetchDocument, saveDocument, createDocument, deleteDocument, fetchDocumentByTitle as fetchDocumentByTitleAPI } from "./frontendutils";

const defaultDocument: DocumentType = {
  _id: "",
  title: "Untitled",
  body: "",
  date: new Date(),
  type: "",
};

export function useDocuments() {
  const [documents, setDocuments] = useState<DocumentType[]>([]);
  const [selectedDoc, setSelectedDoc] = useState<DocumentType>(defaultDocument);
  const [isLoading, setIsLoading] = useState(false);
  const lastSavedVersionRef = useRef<DocumentType | null>(null);

  const fetchDocumentById = async (id: string) => {
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

  const fetchDocumentByTitle = async (title: string) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const result = await fetchDocumentByTitleAPI(title);
      setSelectedDoc(result);
      lastSavedVersionRef.current = result;
    } catch (error) {
      console.error("Error fetching document by title:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const debouncedSave = debounce(async (doc: DocumentType) => {
    if (JSON.stringify(doc) === JSON.stringify(lastSavedVersionRef.current)) {
      return;
    }

    try {
      const result = await saveDocument(doc);
      lastSavedVersionRef.current = result;
      setDocuments((prevDocuments) => prevDocuments.map((d) => (d._id === result._id ? { ...d, title: result.title } : d)));
    } catch (error) {
      console.error("Error saving document:", error);
    }
  }, 1000);

  const handleDocumentChange = (field: keyof DocumentType, value: string | number | Date) => {
    if (selectedDoc) {
      const updatedDoc = { ...selectedDoc, [field]: value };
      setSelectedDoc(updatedDoc);
      debouncedSave(updatedDoc);
    }
  };

  const handleNewDocument = async () => {
    const title = prompt("Enter a title for the new document:");
    if (!title) return;

    const type = prompt("Enter a type for the new document:");
    if (!type) return;

    try {
      const newDoc = await createDocument(title, type);
      setDocuments((prevDocuments) => [...prevDocuments, newDoc]);
      setSelectedDoc(newDoc);
      lastSavedVersionRef.current = newDoc;
    } catch (error) {
      alert("Error creating document: " + error);
    }
  };

  const handleDeleteDocument = async () => {
    const title = prompt("Enter the title of the document you want to delete:");
    if (!title) return;

    if (window.confirm(`Are you sure you want to delete the document "${title}"?`)) {
      try {
        await deleteDocument(title);
        alert(`Document "${title}" has been deleted.`);
        setDocuments((prevDocuments) => prevDocuments.filter((doc) => doc.title !== title));
        if (selectedDoc.title === title) {
          setSelectedDoc(defaultDocument);
        }
      } catch (error) {
        console.error("Error deleting document:", error);
        alert(`Error deleting document: ${error}`);
      }
    }
  };

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
    fetchDocumentByTitle,
    handleDocumentChange,
    handleNewDocument,
    handleDeleteDocument,
  };
}
