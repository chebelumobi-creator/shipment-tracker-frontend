export default function Timeline({ events }) {
  const ordered = [...events].reverse(); // most recent first

  return (
    <ol className="relative ml-3 space-y-6 border-l-2 border-white/15 pl-6">
      {ordered.map((e, i) => (
        <li key={i} className="relative">
          <span className="absolute -left-[31px] top-1 h-3.5 w-3.5 rounded-full border-2 border-navy bg-cyan-accent" />
          <p className="font-semibold text-white">{e.status_display}</p>
          <p className="text-sm text-white/60">{e.location_name}</p>
          {e.note && <p className="mt-0.5 text-sm text-white/40">{e.note}</p>}
          <p className="mt-0.5 text-xs text-white/30">
            {new Date(e.timestamp).toLocaleString(undefined, {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </p>
        </li>
      ))}
    </ol>
  );
}