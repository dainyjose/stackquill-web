"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { saveSettings } from "@/actions/settings";
import { SettingsData } from "@/types/settings";

import GeneralSettings from "@/components/settings/GeneralSettings";
import HomepageSettings from "@/components/settings/HomepageSettings";
import AboutSettings from "@/components/settings/AboutSettings";
import BrandingSettings from "@/components/settings/BrandingSettings";
import SocialSettings from "@/components/settings/SocialSettings";
import SeoSettings from "@/components/settings/SeoSettings";
import FooterSettings from "@/components/settings/FooterSettings";

interface SettingsFormProps {
  settings: SettingsData;
}

export default function SettingsForm({ settings }: SettingsFormProps) {
  const router = useRouter();

  const [data, setData] = useState<SettingsData>(settings);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await saveSettings(data);

    router.refresh();

    alert("Settings saved successfully.");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8"
    >
      <GeneralSettings
        data={data}
        setData={setData}
      />

      <HomepageSettings
        data={data}
        setData={setData}
      />

      <AboutSettings
        data={data}
        setData={setData}
      />

      <BrandingSettings
        data={data}
        setData={setData}
      />

      <SocialSettings
        data={data}
        setData={setData}
      />

      <SeoSettings
        data={data}
        setData={setData}
      />

      <FooterSettings
        data={data}
        setData={setData}
      />

      <div className="flex justify-end">
        <button
          type="submit"
          className="rounded-lg border px-6 py-3 font-medium"
        >
          Save Settings
        </button>
      </div>
    </form>
  );
}
