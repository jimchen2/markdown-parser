interface DocumentType {
  _id: string;
  title: string;
  body: string;
  date: Date;
  type: string;
  access?: number;
}

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


export const saveDocument = (() => {
  let lastExecutionTime = 0;
  let scheduledExecution: NodeJS.Timeout | null = null;
  const cooldownPeriod = 3000; // 5 seconds in milliseconds

  const executeSave = async (doc: DocumentType) => {
    console.log("Saving document:", doc);
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
  };

  return async function(doc: DocumentType): Promise<any> {
    const currentTime = Date.now();
    const timeElapsed = currentTime - lastExecutionTime;

    if (scheduledExecution) {
      clearTimeout(scheduledExecution);
    }

    if (timeElapsed >= cooldownPeriod) {
      lastExecutionTime = currentTime;
      return executeSave(doc);
    } else {
      const delay = cooldownPeriod - timeElapsed;
      return new Promise((resolve, reject) => {
        scheduledExecution = setTimeout(() => {
          lastExecutionTime = Date.now();
          executeSave(doc).then(resolve).catch(reject);
        }, delay);
      });
    }
  };
})();

export async function createDocument(title: string, type: string) {
  const response = await fetch("/api/newDocuments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      type,
    }),
  });

  if (response.ok) {
    const result = await response.json();
    return result.data;
  }
  throw new Error(response.statusText);
}
export async function deleteDocument(title: string) {
  const response = await fetch('/api/deleteDocuments', {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title }),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
}