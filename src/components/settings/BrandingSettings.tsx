import Image from "next/image";
import { ChangeEvent } from "react";
import { SettingsData } from "@/types/settings";

interface Props {
  data: SettingsData;
  setData: React.Dispatch<React.SetStateAction<SettingsData>>;
}

export default function BrandingSettings({ data, setData }: Props) {
  const uploadImage = async (
    e: ChangeEvent<HTMLInputElement>,
    field: "logoLight" | "logoDark" | "favicon",
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const formData = new FormData();

    formData.append("file", file);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    setData((prev) => ({
      ...prev,
      [field]: result.url,
    }));
  };

  return (
    <div className="rounded-xl border p-6">
      <h2 className="mb-6 text-xl font-semibold">Branding</h2>

      <div className="space-y-8">
        {/* Light Logo */}
        <div>
          <label className="mb-2 block font-medium">Light Theme Logo</label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => uploadImage(e, "logoLight")}
          />

          {data.logoLight && (
            <div className="relative mt-4 h-24 w-24 overflow-hidden rounded-lg border">
              <Image
                src={data.logoLight}
                alt="Light Logo"
                fill
                className="object-contain"
              />
            </div>
          )}
        </div>

        {/* Dark Logo */}
        <div>
          <label className="mb-2 block font-medium">Dark Theme Logo</label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => uploadImage(e, "logoDark")}
          />

          {data.logoDark && (
            <div className="relative mt-4 h-24 w-24 overflow-hidden rounded-lg border bg-black">
              <Image
                src={data.logoDark}
                alt="Dark Logo"
                fill
                className="object-contain"
              />
            </div>
          )}
        </div>

        {/* Favicon */}
        <div>
          <label className="mb-2 block font-medium">Favicon</label>

          <input
            type="file"
            accept=".ico,.png,.svg"
            onChange={(e) => uploadImage(e, "favicon")}
          />

          {data.favicon && (
            <div className="relative mt-4 h-16 w-16 overflow-hidden rounded border">
              <Image
                src={data.favicon}
                alt="Favicon"
                fill
                className="object-contain"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
