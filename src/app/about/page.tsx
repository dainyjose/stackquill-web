export default function AboutPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="mb-8 text-4xl font-bold">About Me</h1>

      <div className="space-y-6">
        <p className="text-lg leading-8">
          Hi, I'm Dainy Jose, a software developer passionate about building
          mobile and web applications. I enjoy learning new technologies,
          solving real-world problems, and continuously improving my skills as a
          developer.
        </p>

        <p className="text-lg leading-8">
          Through ThoughtForge, I share my experiences, project learnings,
          technical insights, and lessons discovered along my development
          journey.
        </p>

        <p className="text-lg leading-8">
          My primary areas of interest include React Native, Next.js,
          TypeScript, application architecture, performance optimization, and
          modern web technologies.
        </p>

        <p className="text-lg leading-8">
          Beyond coding, I enjoy gardening, crafting, drawing, and exploring
          creative ideas that help me maintain a balanced and curious mindset.
        </p>
      </div>

      <section className="mt-12">
        <h2 className="mb-4 text-2xl font-semibold">What You'll Find Here</h2>

        <ul className="list-disc space-y-2 pl-6">
          <li>React Native development tips</li>
          <li>Next.js learning notes</li>
          <li>TypeScript best practices</li>
          <li>Project walkthroughs</li>
          <li>Problem-solving experiences</li>
          <li>Career growth insights</li>
        </ul>
      </section>
    </main>
  );
}
