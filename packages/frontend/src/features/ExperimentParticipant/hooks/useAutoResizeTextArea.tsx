import { useEffect, useRef } from "react";

export const useAutoResizeTextArea = () => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const initialHeightRef = useRef(0);

  useEffect(() => {
    const autoResize = () => {
      const textarea = textareaRef.current;
      if (textarea) {
        textarea.style.height = "auto"; // Reset the height
        textarea.style.height = `${textarea.scrollHeight}px`; // Set the height to the scroll height

        console.log({
          scrollHeight: textarea.scrollHeight,
          clientHeight: textarea.clientHeight,
          originalHeight: initialHeightRef.current,
        });

        // Conditionally set overflow-y to auto if the content exceeds the auto-resized height
        textarea.style.overflowY =
          textarea.scrollHeight > initialHeightRef.current ? "" : "hidden";
      }
    };
    const textarea = textareaRef.current;

    if (textarea) {
      // Initial adjustment to fit placeholder text or initial content if any
      initialHeightRef.current = textarea.scrollHeight;
      autoResize();

      // Optional: adding event listener manually and cleaning up
      textarea.addEventListener("input", autoResize);

      // Cleanup function to remove the event listener
      return () => {
        textarea.removeEventListener("input", autoResize);
      };
    }
  }, []);

  return { textareaRef, initialHeightRef };
};
