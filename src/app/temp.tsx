import { useEffect, useState, useRef } from "react";
import DOMPurify from 'dompurify';

const TempHTML: React.FC = () => {
  const [htmlContent, setHtmlContent] = useState<string>("");
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add the existing stylesheet
    const markedLink = document.createElement('link');
    markedLink.href = 'https://cdn.jsdelivr.net/npm/marked@13.0.2/lib/marked.umd.min.js';
    markedLink.rel = 'stylesheet';
    document.head.appendChild(markedLink);

    // Add your personal stylesheet
    const personalStyleLink = document.createElement('link');
    personalStyleLink.href = './print-styles.css'; 
    personalStyleLink.rel = 'stylesheet';
    document.head.appendChild(personalStyleLink);

    // Fetch HTML content
    fetch("/api/temp")
      .then((response) => response.json())
      .then((data) => {
        const sanitizedContent = DOMPurify.sanitize(data.htmlContent);
        setHtmlContent(sanitizedContent);
      })
      .catch((error) => console.error("Error fetching HTML content:", error));

    if (isFirstLoad) {
      const timer = setTimeout(() => {
        window.print();
        setIsFirstLoad(false);
      }, 2000);

      return () => {
        clearTimeout(timer);
        document.head.removeChild(markedLink);
        document.head.removeChild(personalStyleLink); // Remove personal stylesheet on cleanup
      };
    }
  }, [isFirstLoad]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.innerHTML = htmlContent;
    }
  }, [htmlContent]);

  return (
    <div className="container">
      <div ref={containerRef} />
    </div>
  );
};

export default TempHTML;