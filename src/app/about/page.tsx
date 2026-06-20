import { prisma } from "@/lib/prisma";

export default async function AboutPage() {
  const settings = await prisma.setting.findFirst();

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="mb-8 text-4xl font-bold">About Me</h1>

      <div className="space-y-6">
        <p className="text-lg leading-8">{settings?.aboutMe}</p>
      </div>
    </main>
  );
}
