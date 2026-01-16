export default function BlogCardSkeleton() {
  return (
    <div className="
      animate-pulse rounded-2xl border
      bg-gray-200 dark:bg-neutral-900
      border-neutral-300 dark:border-neutral-700
      overflow-hidden
    ">
      <div className="h-52 bg-gray-300 dark:bg-neutral-700" />
      <div className="p-6 space-y-3">
        <div className="h-4 w-1/3 bg-gray-300 dark:bg-neutral-700 rounded" />
        <div className="h-5 w-3/4 bg-gray-300 dark:bg-neutral-700 rounded" />
        <div className="h-4 w-full bg-gray-300 dark:bg-neutral-700 rounded" />
        <div className="h-4 w-2/3 bg-gray-300 dark:bg-neutral-700 rounded" />
      </div>
    </div>
  );
}
