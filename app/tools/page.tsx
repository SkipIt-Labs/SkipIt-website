const tools = [
  {
    name: "Media Saver",
    description: "Download playlists, long videos, or full matches without limits.",
    repoUrl: "https://github.com/SkipIt-Labs/Media-Saver",
    downloadUrl: "https://github.com/SkipIt-Labs/Media-Saver/releases/download/v0.1.1/Media.Saver-Setup-0.1.1.exe",
    tags: ["video", "audio", "offline"],
  },
];

export default function ToolsPage() {
  return (
    <main className="min-h-screen px-6 md:px-8 py-10 md:py-14">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <p className="text-xs tracking-[0.28em] uppercase text-white/50 mb-3">
              Browse Tools
            </p>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Tools ready to download</h1>
            <p className="text-white/65">
              Every tool has a GitHub repo and a direct link to the latest release.
            </p>
          </div>
          <a
            href="https://github.com/SkipIt-Labs"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl btn-ghost font-semibold transition"
          >
            View all repos
            <span className="text-white/60">→</span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <div
              key={tool.name}
              className="glass neon-ring rounded-2xl p-6 flex flex-col h-full"
            >
              <div className="mb-4">
                <h3 className="text-xl font-semibold mb-2">{tool.name}</h3>
                <p className="text-white/60 text-sm">{tool.description}</p>
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                {tool.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs bg-black/30 border border-white/10 text-white/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-auto flex flex-col gap-3">
                <a
                  href={tool.downloadUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full text-center px-5 py-3 rounded-xl btn-primary font-semibold transition"
                >
                  Download (Latest)
                </a>
                <a
                  href={tool.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full text-center px-5 py-3 rounded-xl btn-ghost font-semibold transition"
                >
                  View on GitHub
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 glass neon-ring rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Want something else?</h2>
            <p className="text-white/65">
              Send your request and we will turn it into a downloadable tool.
            </p>
          </div>
          <a
            href="/contact"
            className="px-6 py-3 rounded-xl btn-primary font-semibold transition text-center"
          >
            Request Tools
          </a>
        </div>
      </div>
    </main>
  );
}
