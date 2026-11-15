"use client";

import { useState } from "react";
import { Check, Copy, Code2 } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeBlockProps {
  language: string;
  children: string;
}

export default function CodeBlock({ language, children }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(children);

      setCopied(true);
      setCopyError(false);

      window.setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      setCopyError(true);

      window.setTimeout(() => {
        setCopyError(false);
      }, 2000);
    }
  };

  return (
    <div className="group my-8 overflow-hidden rounded-xl border border-border bg-[#1e1e1e] shadow-sm">
      {/* Code Header */}
      <div className="flex items-center justify-between border-b border-white/10 bg-[#252526] px-4 py-3">
        <div className="flex items-center gap-2">
          <Code2 size={15} className="text-white/50" />

          <span className="text-xs font-semibold uppercase tracking-wider text-white/70">
            {language}
          </span>
        </div>

        <button
          type="button"
          onClick={copyCode}
          aria-label={copied ? "Code copied" : "Copy code"}
          className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs font-medium text-white/70 transition-colors hover:border-white/20 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          {copied ? (
            <>
              <Check size={13} className="text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : copyError ? (
            <span className="text-red-400">Copy failed</span>
          ) : (
            <>
              <Copy size={13} />
              Copy
            </>
          )}
        </button>
      </div>

      {/* Code Content */}
      <div className="overflow-x-auto">
        <SyntaxHighlighter
          language={language}
          style={oneDark}
          showLineNumbers
          wrapLongLines={false}
          customStyle={{
            margin: 0,
            padding: "1.25rem 1rem",
            background: "#1e1e1e",
            fontSize: "0.85rem",
            lineHeight: "1.8",
            borderRadius: 0,
            minWidth: "100%",
          }}
          codeTagProps={{
            style: {
              fontFamily: "var(--font-geist-mono), 'SFMono-Regular', Consolas, monospace",
            },
          }}
        >
          {children}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
