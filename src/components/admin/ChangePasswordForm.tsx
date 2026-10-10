"use client";

import { changePassword } from "@/actions/user";
import { useState } from "react";
import { Eye, EyeOff, LockKeyhole, LoaderCircle } from "lucide-react";

export default function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [visible, setVisible] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const toggleVisibility = (field: keyof typeof visible) => {
    setVisible(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const inputClass =
    "w-full rounded-lg border border-border bg-background px-3 py-2.5 pr-11 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("New password and confirmation do not match.");
      return;
    }

    if (newPassword.length < 8) {
      setError("Your new password must contain at least 8 characters.");
      return;
    }

    if (currentPassword === newPassword) {
      setError("Your new password must be different from your current password.");
      return;
    }

    setIsPending(true);

    try {
      await changePassword({ currentPassword, newPassword });

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setSuccess("Your password has been updated successfully.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to update your password.");
    } finally {
      setIsPending(false);
    }
  };

  const passwordField = (
    label: string,
    field: keyof typeof visible,
    value: string,
    onChange: (value: string) => void,
    autoComplete: string
  ) => (
    <div className="space-y-2">
      <label htmlFor={field} className="block text-sm font-medium text-foreground">
        {label}
      </label>

      <div className="relative">
        <input
          id={field}
          type={visible[field] ? "text" : "password"}
          value={value}
          onChange={e => onChange(e.target.value)}
          className={inputClass}
          autoComplete={autoComplete}
          required
          disabled={isPending}
          placeholder={`Enter ${label.toLowerCase()}`}
          minLength={field === "current" ? undefined : 8}
        />

        <button
          type="button"
          onClick={() => toggleVisibility(field)}
          aria-label={visible[field] ? "Hide password" : "Show password"}
          className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
        >
          {visible[field] ? <EyeOff size={17} /> : <Eye size={17} />}
        </button>
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="max-w-xl space-y-5">
      <div className="flex items-start gap-3 rounded-lg border border-border bg-muted/30 p-3">
        <LockKeyhole className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          Choose a strong password with at least 8 characters. You will need your current password
          to make this change.
        </p>
      </div>

      {passwordField(
        "Current Password",
        "current",
        currentPassword,
        setCurrentPassword,
        "current-password"
      )}

      {passwordField("New Password", "new", newPassword, setNewPassword, "new-password")}

      {passwordField(
        "Confirm New Password",
        "confirm",
        confirmPassword,
        setConfirmPassword,
        "new-password"
      )}

      {error && (
        <p
          role="alert"
          className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2.5 text-sm text-red-600 dark:text-red-400"
        >
          {error}
        </p>
      )}

      {success && (
        <p
          role="status"
          className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2.5 text-sm text-emerald-700 dark:text-emerald-400"
        >
          {success}
        </p>
      )}

      <div className="flex justify-end border-t border-border pt-4">
        <button
          type="submit"
          disabled={isPending || !currentPassword || !newPassword || !confirmPassword}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-border bg-background px-5 text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending && <LoaderCircle className="h-4 w-4 animate-spin" />}
          {isPending ? "Updating..." : "Change Password"}
        </button>
      </div>
    </form>
  );
}
