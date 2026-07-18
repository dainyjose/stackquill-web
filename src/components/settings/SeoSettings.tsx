import { SettingsData } from "@/types/settings";

interface Props {
  data: SettingsData;
  setData: React.Dispatch<React.SetStateAction<SettingsData>>;
}

export default function SeoSettings({ data, setData }: Props) {
  return (
    <div className="rounded-xl border p-6">
      <h2 className="mb-6 text-xl font-semibold">SEO</h2>

      <div className="space-y-5">
        <div>
          <label className="mb-2 block">Meta Title</label>

          <input
            value={data.metaTitle}
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                metaTitle: e.target.value,
              }))
            }
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block">Meta Description</label>

          <textarea
            rows={4}
            value={data.metaDescription}
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                metaDescription: e.target.value,
              }))
            }
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block">Meta Keywords</label>

          <input
            value={data.metaKeywords}
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                metaKeywords: e.target.value,
              }))
            }
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block">Google Analytics ID</label>

          <input
            value={data.googleAnalyticsId}
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                googleAnalyticsId: e.target.value,
              }))
            }
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block">Google Site Verification</label>

          <input
            value={data.googleSiteVerification}
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                googleSiteVerification: e.target.value,
              }))
            }
            className="w-full rounded-lg border p-3"
          />
        </div>
      </div>
    </div>
  );
}
