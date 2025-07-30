import Link from "next/link";
import { Button } from "../ui/button";
import { pages } from "@/constants/pages";
import { PlusIcon } from "lucide-react";

export const EditorButton = () => {
  return (
    <Button
      className="fixed right-10 bottom-10 text-lg h-15 w-15"
      variant="outline"
    >
      <Link
        href={pages.editor}
        className="absolute w-full h-full flex items-center justify-center"
      >
        <PlusIcon />
      </Link>
    </Button>
  );
};
