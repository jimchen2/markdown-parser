"use client"
import { useEffect, useState, useRef } from "react";
import DOMPurify from "dompurify";
import { marked } from 'marked';
import styles from '../../components/renderhtml.module.css';

const TempHTML: React.FC = () => {
  const [htmlContent, setHtmlContent] = useState<string>("");
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fetch HTML content
    fetch("/api/temp")
      .then((response) => response.json())
      .then((data) => {
        const sanitizedContent = DOMPurify.sanitize(data.htmlContent);
        const parsedContent = marked(sanitizedContent);
        setHtmlContent(parsedContent);
      })
      .catch((error) => console.error("Error fetching HTML content:", error));

    if (isFirstLoad) {
      const timer = setTimeout(() => {
        window.print();
        setIsFirstLoad(false);
      }, 2000);

      return () => {
        clearTimeout(timer);
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
      <div className={styles.scopedStyles} ref={containerRef} />
    </div>
  );
};

export default TempHTML;
