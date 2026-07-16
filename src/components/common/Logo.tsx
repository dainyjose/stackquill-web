"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function Logo({
  width = 40,
  height = 40,
  className,
}: LogoProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div
        style={{ width, height }}
        className={className}
      />
    );
  }

  const logo =
    resolvedTheme === "dark"
      ? "/logo/stackquill-logo-light.png"
      : "/logo/stackquill-logo-dark.png";

  return (
    <Image
      src={logo}
      alt="StackQuill"
      width={width}
      height={height}
      className={className}
      priority
    />
  );
}
