import { Loader2 } from "lucide-react";

export const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-4">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <p className="text-lg font-medium">Loading, please wait...</p>
    </div>
  );
};
