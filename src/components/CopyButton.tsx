// CopyButton.tsx
import React, { useState } from 'react';

export default React.FC<{ text: string }> = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="ml-4 px-3 py-1 bg-gray-200 text-black rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
    >
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
};
