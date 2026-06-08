"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeBlockProps {
  language: string;
  children: string;
}

export default function CodeBlock({ language, children }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyCode = async () => {
    await navigator.clipboard.writeText(children);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="relative">
      <span className="absolute left-3 top-3 rounded-md border px-2 py-1 text-xs uppercase">
        {language}
      </span>
      <button
        onClick={copyCode}
        className="absolute right-3 top-3 z-10 flex items-center gap-1 rounded-md border px-2 py-1 text-xs"
        aria-label="Copy code"
      >
        {copied ? (
          <>
            <Check size={14} />
            Copied
          </>
        ) : (
          <>
            <Copy size={14} />
            Copy
          </>
        )}
      </button>

      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          borderRadius: "12px",
          padding: "1rem",
          paddingTop: "3rem",
        }}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
}
