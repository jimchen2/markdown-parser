import { useEffect, useState } from 'react';

const TempHTML: React.FC = () => {
  const [htmlContent, setHtmlContent] = useState<string>('');
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    fetch('/api/temp')
      .then(response => response.json())
      .then(data => setHtmlContent(data.htmlContent))
      .catch(error => console.error('Error fetching HTML content:', error));

    if (isFirstLoad) {
      const timer = setTimeout(() => {
        window.print();
        setIsFirstLoad(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isFirstLoad]);

  return (
    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
  );
};

export default TempHTML;