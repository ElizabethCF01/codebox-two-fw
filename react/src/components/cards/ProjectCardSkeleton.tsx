export default function ProjectCardSkeleton() {
  return (
    <div className="group p-4 relative overflow-hidden rounded-lg border bg-background transition-all">
      <div className="flex w-full flex-col gap-4">
        <div className="skeleton min-h-[250px] w-full" />
        <div className="skeleton h-4 w-28" />
        <div className="skeleton h-4 w-full" />
        <div className="skeleton h-4 w-full" />
      </div>
    </div>
  );
}
