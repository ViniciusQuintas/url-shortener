export default function UrlCardSkeleton() {
  return (
    <div className="card w-full min-w-0 bg-neutral card-sm shadow-sm p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="skeleton h-5 w-40" />

        <div className="flex shrink-0 gap-3">
          <div className="skeleton size-5" />
          <div className="skeleton size-5" />
        </div>
      </div>

      <div className="divider" />

      <div className="skeleton h-5 w-full" />

      <div className="skeleton mt-4 h-5 w-32" />
    </div>
  );
}
