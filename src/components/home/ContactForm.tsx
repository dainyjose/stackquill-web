"use client";

import { createContact } from "@/actions/contact";
import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const inputClassName =
    "w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/10";

  const labelClassName = "mb-2 block text-sm font-medium text-foreground";

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSuccess("");
    setError("");

    if (!name.trim() || !email.trim() || !message.trim()) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);

      await createContact({
        name: name.trim(),
        email: email.trim(),
        subject: subject.trim(),
        message: message.trim(),
      });

      setSuccess("Your message has been sent successfully!");

      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (err) {
      console.error("Contact form submission failed:", err);
      setError("Unable to send your message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Success Message */}
      {success && (
        <div
          role="status"
          className="flex items-start gap-3 rounded-lg border border-green-500/30 bg-green-500/5 p-4 text-sm text-green-600 dark:text-green-400"
        >
          <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
          <p>{success}</p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive"
        >
          <AlertCircle size={18} className="mt-0.5 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {/* Name */}
      <div>
        <label htmlFor="contact-name" className={labelClassName}>
          Name <span className="text-primary">*</span>
        </label>

        <input
          id="contact-name"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Your name"
          autoComplete="name"
          className={inputClassName}
          required
          disabled={loading}
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="contact-email" className={labelClassName}>
          Email <span className="text-primary">*</span>
        </label>

        <input
          id="contact-email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
          className={inputClassName}
          required
          disabled={loading}
        />
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="contact-subject" className={labelClassName}>
          Subject <span className="text-muted-foreground">(Optional)</span>
        </label>

        <input
          id="contact-subject"
          type="text"
          value={subject}
          onChange={e => setSubject(e.target.value)}
          placeholder="What is this about?"
          className={inputClassName}
          disabled={loading}
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="contact-message" className={labelClassName}>
          Message <span className="text-primary">*</span>
        </label>

        <textarea
          id="contact-message"
          rows={6}
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Write your message here..."
          className={`${inputClassName} min-h-36 resize-y leading-7`}
          required
          disabled={loading}
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="group inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:pointer-events-none disabled:opacity-50"
      >
        {loading ? "Sending message..." : "Send message"}

        {!loading && (
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        )}
      </button>

      <p className="text-center text-xs leading-6 text-muted-foreground">
        Your information will only be used to respond to your message.
      </p>
    </form>
  );
}
