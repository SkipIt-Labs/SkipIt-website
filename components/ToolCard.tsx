import Link from "next/link";

type ToolCardProps = {
  title: string;
  description: string;
  statusBadge?: string | null;
  locked: boolean;
  isLoggedIn?: boolean;
};

export default function ToolCard({
  title,
  description,
  statusBadge,
  locked,
  isLoggedIn,
}: ToolCardProps) {
  const badgeText = (statusBadge ?? "").trim() || "Offline";

  if (!isLoggedIn) {
    return (
      <div className="border rounded-xl p-6 transition border-white/10 opacity-60 flex flex-col h-full">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-white/70 text-sm mb-4 flex-grow">{description}</p>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-xs text-white/50">{badgeText}</span>
        </div>
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
        <span className="text-xs text-white/50">{badgeText}</span>

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