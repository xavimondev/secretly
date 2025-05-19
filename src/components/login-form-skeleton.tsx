import { Skeleton } from "@/components/ui/skeleton";

export function LoginFormSkeleton() {
  return (
    <div className="w-[400px]">
      <div className="bg-[#1F1F23] rounded-xl shadow-lg p-8 animate-pulse">
        <div className="flex justify-center mb-6">
          <Skeleton className="h-8 w-24" />
        </div>

        <div className="text-center mb-6 space-y-2">
          <Skeleton className="h-7 w-40 mx-auto" />
          <Skeleton className="h-5 w-64 mx-auto" />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <Skeleton className="w-full h-[1px]" />
          </div>
          <div className="relative flex justify-center">
            <Skeleton className="h-5 w-5 rounded-full bg-white" />
          </div>
        </div>

        <div className="space-y-2 mb-6">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>

        <div>
          <Skeleton className="h-11 w-full rounded-md bg-orange-100" />
        </div>
      </div>
    </div>
  );
}
