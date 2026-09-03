import { cn } from "@/lib/utils";

export function SectionSkeleton({
  className,
  height = "50vh",
}: {
  className?: string;
  height?: string;
}) {
  return (
    <section
      className={cn(
        "w-full px-6 py-24 sm:py-32 flex flex-col items-center justify-center",
        className,
      )}
      style={{ minHeight: height }}
    >
      <div className="w-full max-w-6xl mx-auto space-y-8 animate-pulse">
        {/* Title skeleton */}
        <div className="h-16 w-3/4 max-w-sm rounded-full bg-white/5 border border-white/10 glass mx-auto" />

        {/* Content skeleton */}
        <div className="w-full h-64 sm:h-96 rounded-[2rem] bg-white/5 border border-white/10 glass sheen" />
      </div>
    </section>
  );
}
