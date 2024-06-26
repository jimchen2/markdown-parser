import React, { useRef } from "react";

interface EditorFooterProps {
  wordCount: number;
  charCount: number;
  isUploading: boolean;
  onUpload: (file: File) => void;
}

const EditorFooter: React.FC<EditorFooterProps> = ({
  wordCount,
  charCount,
  isUploading,
  onUpload,
}) => {
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
    <div className="mt-4 text-sm text-gray-600 flex justify-between items-center">
      <div>
        Words: {wordCount} | Characters: {charCount}
        {isUploading && <span className="ml-2">Uploading image...</span>}
      </div>
      <div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
        <button
          onClick={handleUploadClick}
          className="px-4 py-2 bg-gray-200 text-black rounded-md hover:bg-gray-400 transition"
          disabled={isUploading}
        >
          Upload Image
        </button>
      </div>
    </div>
  );
};

export default EditorFooter;