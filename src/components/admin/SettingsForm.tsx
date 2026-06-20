"use client";

import { saveSettings } from "@/actions/settings";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface SettingsFormProps {
  settings?: {
    siteName: string;
    siteTagline?: string | null;
    aboutMe?: string | null;

    email?: string | null;

    githubUrl?: string | null;
    linkedinUrl?: string | null;
    devtoUrl?: string | null;

    metaTitle?: string | null;
    metaDescription?: string | null;
  } | null;
}

export default function SettingsForm({ settings }: SettingsFormProps) {
  const [siteName, setSiteName] = useState(settings?.siteName ?? "");
  const [siteTagline, setSiteTagline] = useState(settings?.siteTagline ?? "");
  const [aboutMe, setAboutMe] = useState(settings?.aboutMe ?? "");
  const [githubUrl, setGithubUrl] = useState(settings?.githubUrl ?? "");
  const [linkedinUrl, setLinkedinUrl] = useState(settings?.linkedinUrl ?? "");
  const [email, setEmail] = useState(settings?.email ?? "");
  const [devtoUrl, setDevtoUrl] = useState(settings?.devtoUrl ?? "");

  const [metaTitle, setMetaTitle] = useState(settings?.metaTitle ?? "");

  const [metaDescription, setMetaDescription] = useState(
    settings?.metaDescription ?? "",
  );

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await saveSettings({
      siteName,
      siteTagline,
      aboutMe,

      email,

      githubUrl,
      linkedinUrl,
      devtoUrl,

      metaTitle,
      metaDescription,
    });

    router.refresh();
    alert("Settings saved successfully");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div>
        <label className="mb-2 block">Site Name</label>

        <input
          value={siteName}
          onChange={(e) => setSiteName(e.target.value)}
          className="w-full rounded-lg border p-3"
        />
      </div>

      <div>
        <label className="mb-2 block">Tagline</label>

        <input
          value={siteTagline}
          onChange={(e) => setSiteTagline(e.target.value)}
          className="w-full rounded-lg border p-3"
        />
      </div>

      <div>
        <label className="mb-2 block">About Me</label>

        <textarea
          rows={5}
          value={aboutMe}
          onChange={(e) => setAboutMe(e.target.value)}
          className="w-full rounded-lg border p-3"
        />
      </div>

      <div>
        <label className="mb-2 block">GitHub URL</label>

        <input
          value={githubUrl}
          onChange={(e) => setGithubUrl(e.target.value)}
          className="w-full rounded-lg border p-3"
        />
      </div>

      <div>
        <label className="mb-2 block">LinkedIn URL</label>

        <input
          value={linkedinUrl}
          onChange={(e) => setLinkedinUrl(e.target.value)}
          className="w-full rounded-lg border p-3"
        />
      </div>
      <div>
        <label className="mb-2 block">Email</label>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border p-3"
        />
      </div>

      <div>
        <label className="mb-2 block">Dev.to URL</label>

        <input
          value={devtoUrl}
          onChange={(e) => setDevtoUrl(e.target.value)}
          className="w-full rounded-lg border p-3"
        />
      </div>
      <div className="rounded-xl border p-6">
        <h2 className="mb-6 text-xl font-semibold">SEO Settings</h2>

        <div className="space-y-4">
          <div>
            <label className="mb-2 block">Meta Title</label>

            <input
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block">Meta Description</label>

            <textarea
              rows={4}
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              className="w-full rounded-lg border p-3"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="rounded-lg border px-6 py-3"
      >
        Save Settings
      </button>
    </form>
  );
}
