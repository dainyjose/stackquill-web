import { SettingsData } from "@/types/settings";

interface Props {
  data: SettingsData;
  setData: React.Dispatch<React.SetStateAction<SettingsData>>;
}

export default function GeneralSettings({ data, setData }: Props) {
  return (
    <div className="rounded-xl border p-6">
      <h2 className="mb-6 text-xl font-semibold">General</h2>

      <div className="space-y-5">
        <div>
          <label className="mb-2 block">Site Name</label>

          <input
            value={data.siteName}
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                siteName: e.target.value,
              }))
            }
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block">Tagline</label>

          <input
            value={data.siteTagline}
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                siteTagline: e.target.value,
              }))
            }
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block">Site Description</label>

          <textarea
            rows={4}
            value={data.siteDescription}
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                siteDescription: e.target.value,
              }))
            }
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block">Website URL</label>

          <input
            value={data.siteUrl}
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                siteUrl: e.target.value,
              }))
            }
            className="w-full rounded-lg border p-3"
          />
        </div>
      </div>
    </div>
  );
}
