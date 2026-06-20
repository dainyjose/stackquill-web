"use client";

import { createContact } from "@/actions/contact";
import { useState } from "react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !email || !message) {
      alert("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      await createContact({
        name,
        email,
        subject,
        message,
      });

      setSuccess("Message sent successfully!");

      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (error) {
      console.error(error);
      alert("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {success && (
        <div className="rounded-lg border border-green-500 p-4 text-green-600">
          {success}
        </div>
      )}

      <div>
        <label className="mb-2 block font-medium">Name *</label>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="John Doe"
          className="w-full rounded-lg border p-3"
          required
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">Email *</label>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="john@example.com"
          className="w-full rounded-lg border p-3"
          required
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">Subject</label>

        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Project Inquiry"
          className="w-full rounded-lg border p-3"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">Message *</label>

        <textarea
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your message here..."
          className="w-full rounded-lg border p-3"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="rounded-lg border px-6 py-3 font-medium disabled:opacity-50"
      >
        {loading ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
