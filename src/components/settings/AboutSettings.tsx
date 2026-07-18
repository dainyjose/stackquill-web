import { SettingsData } from "@/types/settings";

interface Props {
  data: SettingsData;
  setData: React.Dispatch<React.SetStateAction<SettingsData>>;
}

export default function AboutSettings({ data, setData }: Props) {
  return (
    <div className="rounded-xl border p-6">
      <h2 className="mb-6 text-xl font-semibold">About</h2>

      <div className="space-y-5">
        {/* About Title */}
        <div>
          <label className="mb-2 block">About Title</label>

          <input
            value={data.aboutTitle}
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                aboutTitle: e.target.value,
              }))
            }
            placeholder="About Me"
            className="w-full rounded-lg border p-3"
          />
        </div>

        {/* About Content */}
        <div>
          <label className="mb-2 block">About Content</label>

          <textarea
            rows={10}
            value={data.aboutContent}
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                aboutContent: e.target.value,
              }))
            }
            placeholder="Tell your story..."
            className="w-full rounded-lg border p-3"
          />

          <p className="mt-2 text-sm text-muted-foreground">
            This content is displayed on the About page.
          </p>
        </div>
      </div>
    </div>
  );
}
