import UrlCardSkeleton from "@/components/ui/url-card-skeleton";

export default function Loading() {
  return (
    <div className="w-full">
      <div className="px-4 sm:px-8 lg:px-20 mt-8 flex items-center justify-between">
        <div className="skeleton h-8 w-48" />

        <div className="skeleton h-10 w-32" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 py-10 px-4 sm:px-8 lg:px-20">
        {Array.from({ length: 8 }).map((_, index) => (
          <UrlCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
