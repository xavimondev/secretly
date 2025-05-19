import { Skeleton } from "@/components/ui/skeleton";

export function InvitationFormSkeleton() {
  return (
    <div className="w-full space-y-6 animate-pulse">
      <div className="flex items-center">
        <Skeleton className="h-7 w-28" />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
        <div className="flex-1 space-y-2 w-full">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-10 w-full rounded" />
        </div>

        <div className="w-full sm:w-48 space-y-2">
          <Skeleton className="h-5 w-12" />
          <Skeleton className="h-10 w-full rounded" />
        </div>

        <div className="sm:ml-auto">
          <Skeleton className="h-10 w-36 rounded" />
        </div>
      </div>
    </div>
  );
}
