import React, { useRef, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface PreviewProps {
  markdown: string;
  title: string;
}

const Preview: React.FC<PreviewProps> = ({ markdown, title }) => {
  const previewRef = useRef<HTMLDivElement>(null);
  const [cssContent, setCssContent] = useState<string>("");

  useEffect(() => {
    fetch("/html-style.css")
      .then((response) => response.text())
      .then((css) => setCssContent(css))
      .catch((error) => console.error("Error fetching CSS:", error));
  }, []);

  const exportToHTML = async () => {
    if (previewRef.current) {
      const htmlContent = `
          <style>${cssContent}</style>
          ${previewRef.current.innerHTML}
      `;

      try {
        // Store HTML content using the API route
        await fetch("/api/temp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ htmlContent }),
        });

        // Open a new window to display the HTML content
        window.open("/temp", "_blank");
      } catch (error) {
        console.error("Failed to store HTML content:", error);
      }
    }
  };

  return (
    <div className="p-4 overflow-y-auto flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Preview</h2>
        <div>
          <button
            onClick={exportToHTML}
            className="bg-gray-200 hover:bg-gray-400 text-black font-normal py-2 px-4 rounded"
          >
            Export to PDF
          </button>
        </div>
      </div>
      <div className="h-[28px]"></div>
      <div
        ref={previewRef}
        className="prose bg-white h-[680px] overflow-y-auto"
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            table: ({ node, ...props }) => (
              <table
                className="border-collapse border border-slate-400"
                {...props}
              />
            ),
            td: ({ node, ...props }) => (
              <td className="border border-slate-300 p-2" {...props} />
            ),
            th: ({ node, ...props }) => (
              <th
                className="border border-slate-300 p-2 font-bold"
                {...props}
              />
            ),
          }}
        >
          {markdown}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default Preview;
