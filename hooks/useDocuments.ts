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

    const type = prompt("Enter a type for the new document:");
    if (!type) return;

    try {
      const newDoc = await createDocument(title, type);
      // Update local state
      setDocuments((prevDocuments) => [...prevDocuments, { _id: newDoc._id, title: newDoc.title }]);
      setSelectedDoc(newDoc);
      lastSavedVersionRef.current = newDoc;
      window.location.reload();
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
        window.location.reload();
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
  }, [debouncedSave]);

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
