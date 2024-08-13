import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Task } from "./TaskProvider";
import timeAgo from "@/lib/timesAgo";
import { useEffect, useRef, useState } from "react";
import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { cn, invarient } from "@/lib/utils";
import UpdateTask from "./UpdateTask";
import DeleteTask from "./DeleteTask";
const TaskCard = ({ task }: { task: Task }) => {
  const ref = useRef(null);
  const [dragging, setDragging] = useState<boolean>(false);

  useEffect(() => {
    const el = ref.current;
    invarient(el, "Element not found");

    return draggable({
      element: el!,
      getInitialData: () => ({ task }),
      onDragStart: () => setDragging(true),
      onDrop: () => setDragging(false),
    });
  }, []);

  return (
    <Card
      ref={ref}
      className={cn("my-4", {
        "opacity-50": dragging,
      })}
    >
      <CardHeader>
        <CardTitle>{task.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{task.description}</CardDescription>
        <div>
          {task.createdAt === task.updatedAt
            ? `Created ${timeAgo(new Date(task.createdAt))}`
            : `Updated ${timeAgo(new Date(task.updatedAt))}`}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <DeleteTask taskId={task.id} />
        <UpdateTask task={task} />
      </CardFooter>
    </Card>
  );
};

export default TaskCard;
