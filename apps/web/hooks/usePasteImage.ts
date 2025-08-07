import { useCallback } from "react";

interface UsePasteImageReturn {
  handlePaste: (e: React.ClipboardEvent, onFileReceived: (file: File) => void) => Promise<void>;
  clearImage: () => void;
}

export function usePasteImage(): UsePasteImageReturn {
  const handlePaste = useCallback(async (e: React.ClipboardEvent, onFileReceived: (file: File) => void) => {
    const items = e.clipboardData?.items;
    // console.log(items);
    if (!items) return;

    for (let item of items) {
      if (item.type.startsWith("image/")) {
        const pastedFile = item.getAsFile();

        if (pastedFile) {
          console.log(pastedFile);
          onFileReceived(pastedFile);
        }
      }
    }
  }, []);

  const clearImage = useCallback(() => {
    // Cette fonction est maintenant gérée par le composant parent
  }, []);

  return {
    handlePaste,
    clearImage,
  };
}
