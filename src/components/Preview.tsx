import "katex/dist/katex.min.css";
import React, { useRef, useEffect, useState, useCallback } from "react";
import { exportToHTML } from "./PreviewUtils";
import styles from "./renderhtml.module.css";
import CopyButton from "./CopyButton";
import {renderLatex} from "./renderMarkdown"

interface PreviewProps {
  markdown: string;
  title: string;
}

const COOLDOWN_PERIOD = 5000;

const getShareableLink = (title: string) => `https://markdown.jimchen.me/?title=${encodeURIComponent(title)}`;

const Preview: React.FC<PreviewProps> = ({ markdown, title }) => {
  const previewRef = useRef<HTMLDivElement>(null);
  const [, forceUpdate] = useState({});
  const lastRenderTimeRef = useRef<number>(0);
  const scheduledRenderRef = useRef<NodeJS.Timeout | null>(null);

  const renderMarkdown = useCallback(() => {
    if (previewRef.current) {
      const finalHtml = renderLatex(markdown);
      previewRef.current.innerHTML = finalHtml;
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
        <h2 className="text-2xl font-semibold font-quicksand text-gray-800">{title || "Preview"}</h2>
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
      <div ref={previewRef} className="prose max-w-none bg-white h-[730px] overflow-y-auto p-8 shadow-inner"></div>
    </div>
  );
};

export default Preview;
