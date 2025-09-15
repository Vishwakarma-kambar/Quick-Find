import { useEffect } from "react";

//A custom hook that triggers a callback when a click is detected outside of specified elements.

function useOnClickOutside(mainRef, handler, triggerRef = null) {
  useEffect(() => {
    const listener = (event) => {
      if (mainRef.current && mainRef.current.contains(event.target)) {
        return;
      }

      if (
        triggerRef &&
        triggerRef.current &&
        triggerRef.current.contains(event.target)
      ) {
        return;
      }

      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [mainRef, handler, triggerRef]);
}

export default useOnClickOutside;
