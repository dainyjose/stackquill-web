import SettingsForm from "@/components/admin/SettingsForm";
import { prisma } from "@/lib/prisma";

export default async function SettingsPage() {
  const settings = await prisma.setting.findFirst();

  return (
    <div>
      <h1 className="mb-8 text-4xl font-bold">Settings</h1>

      <SettingsForm settings={settings} />
    </div>
  );
}
