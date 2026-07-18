import { SettingsData } from "@/types/settings";

interface Props {
  data: SettingsData;
  setData: React.Dispatch<React.SetStateAction<SettingsData>>;
}

export default function HomepageSettings({ data, setData }: Props) {
  return (
    <div className="rounded-xl border p-6">
      <h2 className="mb-6 text-xl font-semibold">Homepage</h2>

      <div className="space-y-5">
        {/* Hero Badge */}
        <div>
          <label className="mb-2 block">Hero Badge</label>

          <input
            value={data.heroBadge}
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                heroBadge: e.target.value,
              }))
            }
            placeholder="🚀 Welcome to StackQuill"
            className="w-full rounded-lg border p-3"
          />
        </div>

        {/* Hero Title */}
        <div>
          <label className="mb-2 block">Hero Title</label>

          <input
            value={data.heroTitle}
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                heroTitle: e.target.value,
              }))
            }
            placeholder="Engineering Notes. Practical Code. Better Software."
            className="w-full rounded-lg border p-3"
          />
        </div>

        {/* Hero Description */}
        <div>
          <label className="mb-2 block">Hero Description</label>

          <textarea
            rows={5}
            value={data.heroDescription}
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                heroDescription: e.target.value,
              }))
            }
            placeholder="A modern software engineering blog sharing practical tutorials and real-world development experiences."
            className="w-full rounded-lg border p-3"
          />
        </div>
        {/* Hero Topics */}
        <div>
          <label className="mb-2 block">Hero Topics</label>

          <textarea
            rows={3}
            value={data.heroTopics}
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                heroTopics: e.target.value,
              }))
            }
            placeholder="React, Next.js, TypeScript, React Native, Node.js, Prisma, AI"
            className="w-full rounded-lg border p-3"
          />

          <p className="mt-2 text-sm text-muted-foreground">
            Separate each topic with a comma.
          </p>
        </div>
      </div>
    </div>
  );
}
