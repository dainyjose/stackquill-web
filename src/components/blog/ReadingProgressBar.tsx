"use client";

import { useEffect, useState } from "react";

export default function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let animationFrame = 0;

    const calculateProgress = () => {
      cancelAnimationFrame(animationFrame);

      animationFrame = requestAnimationFrame(() => {
        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;

        if (scrollableHeight <= 0) {
          setProgress(0);
          return;
        }

        const currentProgress = (window.scrollY / scrollableHeight) * 100;

        setProgress(Math.min(100, Math.max(0, currentProgress)));
      });
    };

    window.addEventListener("scroll", calculateProgress, {
      passive: true,
    });

    window.addEventListener("resize", calculateProgress);

    calculateProgress();

    return () => {
      window.removeEventListener("scroll", calculateProgress);
      window.removeEventListener("resize", calculateProgress);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div
      className="fixed inset-x-0 top-[76px] z-50 h-1 bg-transparent"
      role="progressbar"
      aria-label="Article reading progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress)}
    >
      <div
        className="h-full bg-primary transition-[width] duration-150 ease-out rounded-full"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
