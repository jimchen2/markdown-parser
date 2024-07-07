import { useState } from "react";
import { DocumentType } from "../types";

const useImageUpload = (
  document: DocumentType | null,
  onChange: (field: string, value: string) => void
) => {
  const [isUploading, setIsUploading] = useState(false);

  const uploadImage = async (file: File): Promise<string> => {
    const response = await fetch("/api/get-upload-url");
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const { uploadUrl, imageUrl } = await response.json();

    const uploadResponse = await fetch(uploadUrl, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": file.type,
      },
    });

    if (!uploadResponse.ok) {
      throw new Error("Failed to upload image");
    }

    return imageUrl;
  };

  const handleImageUpload = async (file: File, cursorPosition: number) => {
    try {
      setIsUploading(true);
      const imageUrl = await uploadImage(file);
      const imageMarkdown = `![Image](${imageUrl})`;
      const newBody = document?.body
        ? document.body.slice(0, cursorPosition) +
          imageMarkdown +
          document.body.slice(cursorPosition)
        : imageMarkdown;
      onChange("body", newBody);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert(error);
    } finally {
      setIsUploading(false);
    }
  };

  const handlePaste = async (e: React.ClipboardEvent<HTMLTextAreaElement>, cursorPosition: number) => {
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf("image") !== -1) {
        e.preventDefault();
        const blob = items[i].getAsFile();
        if (blob) {
          await handleImageUpload(blob, cursorPosition);
        }
        break;
      }
    }
  };

  return { isUploading, handleImageUpload, handlePaste };
};

export default useImageUpload;