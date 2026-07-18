import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function Input({
  label,
  error,
  className = "",
  ...props
}: InputProps) {
  return (
    <div>
      <label className="mb-2 block font-medium">{label}</label>

      <input
        {...props}
        className={`w-full rounded-lg border p-3 ${className}`}
      />

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
