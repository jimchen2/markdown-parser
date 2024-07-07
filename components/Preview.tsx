import React, { useRef, useEffect } from "react";
import { marked } from "marked";
import katex from "katex";
import { exportToHTML } from "./PreviewUtils";

// Import KaTeX CSS
import "katex/dist/katex.min.css";

interface PreviewProps {
  markdown: string;
  title: string;
}

const Preview: React.FC<PreviewProps> = ({ markdown, title }) => {
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const renderLatex = (text: string) => {
      return text.replace(/\$\$(.*?)\$\$|\$(.*?)\$/g, (match, block, inline) => {
        const latex = block || inline;
        const displayMode = !!block;
        return katex.renderToString(latex, { displayMode });
      });
    };

    const renderMarkdown = () => {
      if (previewRef.current) {
        const renderedMarkdown = marked(markdown);
        const htmlWithLatex = renderLatex(renderedMarkdown);
        previewRef.current.innerHTML = htmlWithLatex;
      }
    };

    renderMarkdown();
  }, [markdown]);

  return (
    <div className="p-4 overflow-y-auto flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Preview</h2>
        <div>
          <button
            onClick={() => exportToHTML(previewRef)}
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
      ></div>
    </div>
  );
};

export default Preview;