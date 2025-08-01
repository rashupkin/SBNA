import { Input } from "../ui/input";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Button } from "../ui/button";
import { SearchIcon } from "lucide-react";
import z from "zod";
import { useRouter } from "next/navigation";
import { pages } from "@/constants/pages";
import { FormEvent, useState } from "react";

export const SearchForm = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    router.push(`${pages.main}?search=${search}`);
  };

  return (
    <form onSubmit={onSubmit} className="flex w-full gap-3">
      <Input
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(() => e.target.value)}
      />

      <Button variant={"outline"}>
        <SearchIcon />
      </Button>
    </form>
  );
};
