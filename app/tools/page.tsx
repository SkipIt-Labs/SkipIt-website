import { createClient } from "@/lib/supabase/server";

type ToolRow = {
  id: number;
  name: string;
  description: string | null;
};

export default async function ToolsPage() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("tools")
    .select("id, name, description")
    .order("id");

  const tools = (error ? null : (data as ToolRow[] | null)) ?? null;
  if (error) {
    // Keep UI simple, but log the real reason on the server (visible in dev terminal).
    console.error("Failed to fetch tools:", error);
  }

  return (
    <main className="min-h-screen px-8 py-16">
      <h1 className="text-3xl font-bold mb-10">Available Tools</h1>

      {!tools?.length ? (
        <div>
          <p className="text-white/60">No tools found</p>
          {process.env.NODE_ENV !== "production" && error?.message && (
            <p className="text-xs text-red-400 mt-2">
              Debug: {error.message}
            </p>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <div
              key={String(tool.id)}
              className="glass neon-ring rounded-2xl p-6 hover:border-white/30 transition"
            >
              <h3 className="text-xl font-semibold mb-2">{tool.name}</h3>
              <p className="text-white/60 text-sm mb-4">{tool.description ?? ""}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
