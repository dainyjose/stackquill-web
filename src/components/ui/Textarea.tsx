import React from "react";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export default function Textarea({
  label,
  error,
  className = "",
  ...props
}: TextareaProps) {
  return (
    <div>
      <label className="mb-2 block font-medium">{label}</label>

      <textarea
        {...props}
        className={`w-full rounded-lg border p-3 ${className}`}
      />

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
