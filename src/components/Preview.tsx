import React, { useRef, useEffect, useState, useCallback } from "react";
import { marked } from "marked";
import katex from "katex";
import { exportToHTML } from "./PreviewUtils";
import "katex/dist/katex.min.css";
import styles from "./renderhtml.module.css";
import CopyButton from "./CopyButton"

interface PreviewProps {
  markdown: string;
  title: string;
}

const COOLDOWN_PERIOD = 5000; 

const renderLatex = (html: string) => {
  const codeBlocks: string[] = [];
  const htmlWithoutCode = html.replace(/(<pre><code>[\s\S]*?<\/code><\/pre>)|(<code>[^<]+<\/code>)/g, (match) => {
    codeBlocks.push(match);
    return `__CODE_BLOCK_${codeBlocks.length - 1}__`;
  });

  const processedHtml = htmlWithoutCode.replace(/\$\$(.*?)\$\$|\$(.*?)\$/g, (match, block, inline) => {
    const latex = block || inline;
    try {
      return katex.renderToString(latex, { displayMode: !!block });
    } catch (error) {
      console.error("KaTeX error:", error);
      return match;
    }
  });

  return processedHtml.replace(/__CODE_BLOCK_(\d+)__/g, (_, index) => codeBlocks[parseInt(index)]);
};

const getShareableLink = (title: string) => `https://markdown.jimchen.me/?title=${encodeURIComponent(title)}`;

const Preview: React.FC<PreviewProps> = ({ markdown, title }) => {
  const previewRef = useRef<HTMLDivElement>(null);
  const [, forceUpdate] = useState({});
  const lastRenderTimeRef = useRef<number>(0);
  const scheduledRenderRef = useRef<NodeJS.Timeout | null>(null);

  const renderMarkdown = useCallback(() => {
    if (previewRef.current) {
      previewRef.current.innerHTML = renderLatex(marked(markdown));
      forceUpdate({});
    }
  }, [markdown]);

  const scheduleRender = useCallback(() => {
    const currentTime = Date.now();
    const timeElapsed = currentTime - lastRenderTimeRef.current;

    if (scheduledRenderRef.current) {
      clearTimeout(scheduledRenderRef.current);
    }

    if (timeElapsed >= COOLDOWN_PERIOD) {
      lastRenderTimeRef.current = currentTime;
      renderMarkdown();
    } else {
      const delay = COOLDOWN_PERIOD - timeElapsed;
      scheduledRenderRef.current = setTimeout(() => {
        lastRenderTimeRef.current = Date.now();
        renderMarkdown();
      }, delay);
    }
  }, [renderMarkdown]);

  useEffect(() => {
    scheduleRender();

    return () => {
      if (scheduledRenderRef.current) {
        clearTimeout(scheduledRenderRef.current);
      }
    };
  }, [markdown, scheduleRender]);

  return (
    <div className={`${styles.scopedStyles} bg-gray-50 rounded-lg shadow-lg overflow-hidden font-quicksand`}>
      <div className="bg-gray-100 p-4 flex justify-between items-center border-b border-gray-200">
        <h2 className="text-2xl font-semibold font-quicksand text-gray-800">{title || 'Preview'}</h2>
        <div className="flex space-x-2 items-center">
          <CopyButton text={getShareableLink(title)} />
          <button
            onClick={() => exportToHTML(previewRef)}
            className="bg-gray-700 hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
          >
            Export to PDF
          </button>
        </div>
      </div>
      <div
        ref={previewRef}
        className="prose max-w-none bg-white h-[730px] overflow-y-auto p-8 shadow-inner"
      ></div>
    </div>
  );
};

export default Preview;
