import { useEffect } from "react";

export default function BackgroundJob() {
  useEffect(() => {
    let startTime = 0;
    const handleFocus = () => {
      var endTime = performance.now();
      const time = endTime - startTime;
      if (time > 3 * 60 * 60 * 1000) {
        window.location.reload();
      }
      startTime = endTime;
    };

    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  return null;
}
