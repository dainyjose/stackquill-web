"use client";

import { useEffect, useState } from "react";

export default function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const calculateProgress = () => {
      const scrollTop = window.scrollY;

      const documentHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      const progress = (scrollTop / documentHeight) * 100;

      setProgress(progress);
    };

    window.addEventListener("scroll", calculateProgress);

    calculateProgress();

    return () => {
      window.removeEventListener("scroll", calculateProgress);
    };
  }, []);

  return (
    <div className="fixed left-0 top-17 z-50 h-1 w-full bg-muted">
      <div
        className="h-full bg-gray-500 transition-all duration-100"
        style={{
          width: `${progress}%`,
        }}
      />
    </div>
  );
}
