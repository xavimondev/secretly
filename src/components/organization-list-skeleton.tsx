import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface OrganizationListSkeletonProps {
  count?: number;
}

export function OrganizationListSkeleton({
  count = 6,
}: OrganizationListSkeletonProps) {
  return (
    <div className="w-full max-w-md mx-auto space-y-2 animate-pulse">
      <div className="text-center mb-6 space-y-2">
        <Skeleton className="h-7 w-64 mx-auto" />
        <Skeleton className="h-4 w-40 mx-auto" />
      </div>

      <div className="space-y-2">
        {Array(count)
          .fill(0)
          .map((_, index) => (
            <Card
              key={index}
              className="p-3 border border-slate-200 dark:border-slate-800"
            >
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-md bg-purple-200/50" />
                <Skeleton className="h-5 w-40" />
              </div>
            </Card>
          ))}
      </div>

      <div className="pt-4 mt-2 text-center space-y-2 overflow-hidden">
        <Skeleton className="h-14 w-full mx-auto" />
      </div>
    </div>
  );
}
