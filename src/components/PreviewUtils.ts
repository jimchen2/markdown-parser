export const exportToHTML = async (previewRef: React.RefObject<HTMLDivElement>) => {
    if (previewRef.current) {
      const htmlContent = `
          ${previewRef.current.innerHTML}
      `;
      console.log(previewRef.current.innerHTML)
  
      try {
        await fetch("/api/temp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ htmlContent }),
        });
        window.open("/temp", "_blank");
      } catch (error) {
        console.error("Failed to store HTML content:", error);
      }
    }
  };