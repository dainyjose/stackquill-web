import { SettingsData } from "@/types/settings";

interface Props {
  data: SettingsData;
  setData: React.Dispatch<React.SetStateAction<SettingsData>>;
}

export default function SocialSettings({ data, setData }: Props) {
  return (
    <div className="rounded-xl border p-6">
      <h2 className="mb-6 text-xl font-semibold">Contact & Social</h2>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block">Email</label>
          <input
            type="email"
            value={data.email}
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                email: e.target.value,
              }))
            }
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block">GitHub</label>
          <input
            value={data.githubUrl}
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                githubUrl: e.target.value,
              }))
            }
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block">LinkedIn</label>
          <input
            value={data.linkedinUrl}
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                linkedinUrl: e.target.value,
              }))
            }
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block">Twitter / X</label>
          <input
            value={data.twitterUrl}
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                twitterUrl: e.target.value,
              }))
            }
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block">Dev.to</label>
          <input
            value={data.devtoUrl}
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                devtoUrl: e.target.value,
              }))
            }
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block">Medium</label>
          <input
            value={data.mediumUrl}
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                mediumUrl: e.target.value,
              }))
            }
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block">Hashnode</label>
          <input
            value={data.hashnodeUrl}
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                hashnodeUrl: e.target.value,
              }))
            }
            className="w-full rounded-lg border p-3"
          />
        </div>
      </div>
    </div>
  );
}
