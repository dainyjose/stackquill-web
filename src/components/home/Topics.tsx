const topics = [
  "React Native",
  "Next.js",
  "TypeScript",
  "Expo",
  "Mobile Development",
  "Web Development",
  "Security",
  "Architecture",
];

export default function Topics() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h2 className="mb-8 text-3xl font-bold">Topics</h2>

      <div className="flex flex-wrap gap-3">
        {topics.map((topic) => (
          <span
            key={topic}
            className="rounded-full border px-4 py-2"
          >
            {topic}
          </span>
        ))}
      </div>
    </section>
  );
}
