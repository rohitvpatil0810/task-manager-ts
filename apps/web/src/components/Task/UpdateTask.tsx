import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LoadingButton } from "@/components/ui/loading-button";
import { Textarea } from "@/components/ui/textarea";
import { Task, useTask } from "./TaskProvider";
import { useState } from "react";

type Props = {
  task: Task;
};

const UpdateTaskFormSchema = z.object({
  title: z
    .string()
    .min(3, {
      message: "Title must be at least 3 characters.",
    })
    .max(30, {
      message: "Title must be at most 30 characters.",
    })
    .trim(),
  description: z
    .string()
    .min(3, {
      message: "Description must be at least 3 characters.",
    })
    .max(100, {
      message: "Description must be at most 100 characters.",
    })
    .trim(),
});

const UpdateTask = ({ task }: Props) => {
  const [open, setOpen] = useState(false);
  const taskContext = useTask();
  const form = useForm<z.infer<typeof UpdateTaskFormSchema>>({
    resolver: zodResolver(UpdateTaskFormSchema),
    defaultValues: {
      title: task.title,
      description: task.description,
    },
  });

  const onSubmit = async (values: z.infer<typeof UpdateTaskFormSchema>) => {
    const result = await taskContext?.updateTask(
      task.id,
      values.title,
      values.description
    );

    if (result) {
      form.reset();
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Update</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Task</DialogTitle>
          <DialogDescription>
            Fill in the form below to update the task.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            className="grid gap-4 py-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your title here" {...field} />
                  </FormControl>
                  <FormMessage>
                    {taskContext?.error && taskContext.error.title}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter your description here"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>
                    {taskContext?.error && taskContext.error.description}
                  </FormMessage>
                </FormItem>
              )}
            />
            <DialogFooter>
              <LoadingButton
                className="w-full"
                loading={form.formState.isSubmitting}
              >
                Update
              </LoadingButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateTask;
