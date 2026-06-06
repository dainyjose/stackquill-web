export default function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-6 md:flex-row">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} ThoughtForge. All rights reserved.
        </p>

        <div className="flex items-center gap-4 text-sm">
          <a
            href="https://www.linkedin.com/in/dainyjose"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>

          <a
            href="https://github.com/dainyjose"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>

          <a
            href="https://dev.to/dainyjose"
            target="_blank"
            rel="noopener noreferrer"
          >
            Dev.to
          </a>

          <a href="mailto:dainyjose.mary@gmail.com">Email</a>
        </div>
      </div>
    </footer>
  );
}
