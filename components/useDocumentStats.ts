import { useEffect, useState } from "react";
import { DocumentType } from "../types";

const useDocumentStats = (document: DocumentType | null) => {
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    if (document && document.body) {
      const words = document.body.trim().split(/\s+/);
      setWordCount(words.length);
      setCharCount(document.body.length);
    } else {
      setWordCount(0);
      setCharCount(0);
    }
  }, [document]);

  return { wordCount, charCount };
};

export default useDocumentStats;