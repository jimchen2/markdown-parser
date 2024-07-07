import { useEffect, useState, useRef } from "react";
import DOMPurify from 'dompurify';

const TempHTML: React.FC = () => {
  const [htmlContent, setHtmlContent] = useState<string>("");
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fetch and apply Milligram CSS
    const link = document.createElement('link');
    link.href = 'https://cdn.jsdelivr.net/npm/foundation-sites@6.7.5/dist/css/foundation.min.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

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
        document.head.removeChild(link);
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