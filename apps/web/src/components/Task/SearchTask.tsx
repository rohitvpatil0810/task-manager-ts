import { z } from "zod";
import { useTask } from "./TaskProvider";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { CircleX } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";

type Props = {};

const searchTaskFormSchema = z.object({
  search: z
    .string()
    .min(3, {
      message: "Search must be at least 3 characters.",
    })
    .max(100, {
      message: "Search must be at most 30 characters.",
    })
    .trim(),
});

const SearchTask = (_: Props) => {
  const taskContext = useTask();
  const form = useForm<z.infer<typeof searchTaskFormSchema>>({
    resolver: zodResolver(searchTaskFormSchema),
    defaultValues: {
      search: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof searchTaskFormSchema>) => {
    taskContext?.searchTasks(values.search);
  };

  const clearSearch = () => {
    form.reset();
    taskContext?.clearSearchResults();
  };

  return (
    <Form {...form}>
      <div className="flex items-center space-x-2">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Search Task"
                    type="text"
                    id="search"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
        {form.getValues("search") ? (
          <Button onClick={clearSearch}>
            <CircleX size={20} />
          </Button>
        ) : null}
      </div>
    </Form>
  );
};

export default SearchTask;
