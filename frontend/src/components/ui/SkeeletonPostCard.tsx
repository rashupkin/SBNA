import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonPostCard = () => (
  <Card>
    <CardContent className="p-6 space-y-2">
      <Skeleton className="h-6 w-2/3 rounded" />
      <Skeleton className="h-4 w-full rounded" />
      <Skeleton className="h-4 w-5/6 rounded" />
      <Skeleton className="h-4 w-1/3 rounded mt-2" />
    </CardContent>
  </Card>
);
