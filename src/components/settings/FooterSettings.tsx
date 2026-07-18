import { SettingsData } from "@/types/settings";

interface Props {
  data: SettingsData;
  setData: React.Dispatch<React.SetStateAction<SettingsData>>;
}

export default function FooterSettings({ data, setData }: Props) {
  return (
    <div className="rounded-xl border p-6">
      <h2 className="mb-6 text-xl font-semibold">Footer</h2>

      <div>
        <label className="mb-2 block">Copyright</label>

        <input
          value={data.copyright}
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              copyright: e.target.value,
            }))
          }
          className="w-full rounded-lg border p-3"
        />
      </div>
    </div>
  );
}
