import { prisma } from "@/lib/prisma";

export default async function MessagesPage() {
  const messages = await prisma.contact.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div>
      <h1 className="mb-8 text-4xl font-bold">Messages</h1>

      <div className="rounded-xl border">
        {messages.map((message) => (
          <div
            key={message.id}
            className="border-b p-4"
          >
            <h3 className="font-semibold">{message.name}</h3>

            <p>{message.email}</p>

            <p>{message.subject}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
