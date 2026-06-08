"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeBlockProps {
  language: string;
  children: string;
}

export default function CodeBlock({ language, children }: CodeBlockProps) {
  return (
    <SyntaxHighlighter
      language={language}
      style={oneDark}
      customStyle={{
        borderRadius: "12px",
        padding: "1rem",
      }}
    >
      {children}
    </SyntaxHighlighter>
  );
}
