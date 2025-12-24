import Link from "next/link";

type ToolCardProps = {
  title: string;
  description: string;
  type: "online" | "offline";
  locked: boolean;
  isLoggedIn?: boolean;
};

export default function ToolCard({
  title,
  description,
  type,
  locked,
  isLoggedIn,
}: ToolCardProps) {
  if (!isLoggedIn) {
    return (
      <div className="border rounded-xl p-6 transition border-white/10 opacity-60 flex flex-col h-full">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-white/70 text-sm mb-4 flex-grow">{description}</p>
      </div>
    );
  }
  return (
    <div
      className={`border rounded-xl p-6 transition flex flex-col h-full ${
        locked
          ? "border-white/10 opacity-60"
          : "border-white/30 hover:border-white"
      }`}
    >
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-white/70 text-sm mb-4 flex-grow">{description}</p>

      <div className="flex items-center justify-between mt-auto">
        <span className="text-xs text-white/50">
          {type === "offline" ? "Offline tool" : "Online tool"}
        </span>

        {locked ? (
          <Link
            href="/pricing"
            className="text-xs text-white/70 underline"
          >
            Subscribe to access
          </Link>
        ) : (
          <span className="text-xs text-green-400">Available</span>
        )}
      </div>
    </div>
  );
}