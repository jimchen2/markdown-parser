import React, { useRef, useEffect, useState } from "react";
import { marked } from "marked";
import katex from "katex";
import { exportToHTML } from "./PreviewUtils";
import "katex/dist/katex.min.css";
import styles from "./renderhtml.module.css";

interface PreviewProps {
  markdown: string;
  title: string;
}

const COOLDOWN_PERIOD = 5000; // 5 seconds in milliseconds

const Preview: React.FC<PreviewProps> = ({ markdown, title }) => {
  const previewRef = useRef<HTMLDivElement>(null);
  const lastRenderTimeRef = useRef<number>(0);
  const [, forceUpdate] = useState({});

  useEffect(() => {
    const renderLatex = (html: string) => {
      const codeBlocks: string[] = [];
      
      // Replace <pre><code> blocks and inline <code> with placeholders
      const htmlWithoutCode = html.replace(/(<pre><code>[\s\S]*?<\/code><\/pre>)|(<code>[^<]+<\/code>)/g, (match) => {
        codeBlocks.push(match);
        return `__CODE_BLOCK_${codeBlocks.length - 1}__`;
      });

      // Process LaTeX in the remaining text
      const processedHtml = htmlWithoutCode.replace(/\$\$(.*?)\$\$|\$(.*?)\$/g, (match, block, inline) => {
        const latex = block || inline;
        const displayMode = !!block;
        try {
          return katex.renderToString(latex, { displayMode });
        } catch (error) {
          console.error("KaTeX error:", error);
          return match; // Return original string if KaTeX fails
        }
      });

      // Restore code blocks
      return processedHtml.replace(/__CODE_BLOCK_(\d+)__/g, (_, index) => codeBlocks[parseInt(index)]);
    };

    const renderMarkdown = () => {
      if (previewRef.current) {
        const renderedMarkdown = marked(markdown);
        const htmlWithLatex = renderLatex(renderedMarkdown);
        previewRef.current.innerHTML = htmlWithLatex;
      }
    };

    const currentTime = Date.now();
    if (currentTime - lastRenderTimeRef.current >= COOLDOWN_PERIOD) {
      renderMarkdown();
      lastRenderTimeRef.current = currentTime;
    } else {
      const remainingCooldown = COOLDOWN_PERIOD - (currentTime - lastRenderTimeRef.current);
      setTimeout(() => {
        renderMarkdown();
        lastRenderTimeRef.current = Date.now();
        forceUpdate({});
      }, remainingCooldown);
    }
  }, [markdown]);

  return (
    <div className={`${styles.scopedStyles} bg-gray-50 rounded-lg shadow-lg overflow-hidden font-quicksand`}>
      <div className="bg-gray-100 p-4 flex justify-between items-center border-b border-gray-200">
        <h2 className="text-2xl font-semibold font-quicksand text-gray-800">{title || 'Preview'}</h2>
        <button
          onClick={() => exportToHTML(previewRef)}
          className="bg-gray-700 hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
        >
          Export to PDF
        </button>
      </div>

      <div
        ref={previewRef}
        className="prose max-w-none bg-white h-[730px] overflow-y-auto p-8 shadow-inner"
      ></div>
    </div>
  );
};

export default Preview;