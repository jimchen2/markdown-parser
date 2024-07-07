import React, { useRef } from "react";

interface EditorFooterProps {
  wordCount: number;
  charCount: number;
  isUploading: boolean;
  onUpload: (file: File) => void;
}

const EditorFooter: React.FC<EditorFooterProps> = ({ wordCount, charCount, isUploading, onUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload(file);
    }
  };

  return (
    <div className="mt-6 py-4 px-6 bg-gray-100 rounded-lg shadow-inner flex justify-between items-center">
      <div className="text-sm text-gray-600 flex items-center space-x-4">
        <span className="font-medium">
          Words: <span className="text-gray-800">{wordCount}</span>
        </span>
        <span className="font-medium">
          Characters: <span className="text-gray-800">{charCount}</span>
        </span>
        {isUploading && (
          <span className="text-gray-700 flex items-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Uploading image...
          </span>
        )}
      </div>
      <div>
        <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
        <button
          onClick={handleUploadClick}
          className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isUploading}
        >
          {isUploading ? "Uploading..." : "Upload Image"}
        </button>
      </div>
    </div>
  );
};

export default EditorFooter;
