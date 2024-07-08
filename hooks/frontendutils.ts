import { DocumentType } from "../types";

export async function fetchDocumentMetadata() {
  const response = await fetch("/api/getDocumentMetadata");
  if (response.ok) {
    const result = await response.json();
    return result.data;
  }
}

export async function fetchDocument(id) {
  const response = await fetch(`/api/getdocuments?id=${id}`);
  if (response.ok) {
    const result = await response.json();
    return result;
  }
  throw new Error("Failed to fetch document");
}

export async function saveDocument(doc: DocumentType) {
  const response = await fetch(`/api/documents/${doc._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(doc),
  });

  if (response.ok) {
    const result = await response.json();
    return result.data;
  }
  throw new Error("Error saving document");
}

export async function createDocument(title: string) {
  const response = await fetch("/api/documents", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      date: new Date().toISOString().split("T")[0],
      type: "",
      body: "",
    }),
  });

  if (response.ok) {
    const result = await response.json();
    return result.data;
  }
  throw new Error(response.statusText);
}

export async function deleteDocument(id: string) {
  const response = await fetch(`/api/documents/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }
}
