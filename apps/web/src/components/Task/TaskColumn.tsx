import { cn, invarient } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import {
  dropTargetForElements,
  ElementDragPayload,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { Task, TaskStatus, useTask } from "./TaskProvider";
import { Alert, AlertTitle } from "@//components/ui/alert";

type Props = {
  title: TaskStatus;
  children: React.ReactNode;
};

const TaskColumn = ({ title, children }: Props) => {
  const taskContext = useTask();
  const ref = useRef(null);
  const [isDraggedOver, setIsDraggedOver] = useState(false);

  const onDrop = (source: ElementDragPayload) => {
    setIsDraggedOver(false);
    const task = source.data.task as Task;
    taskContext?.changeStatus(task.id, title);
  };

  useEffect(() => {
    const el = ref.current;
    invarient(el, "Element not found");
    return dropTargetForElements({
      element: el!,
      onDragEnter: () => setIsDraggedOver(true),
      onDragLeave: () => setIsDraggedOver(false),
      onDrop: ({ source }) => onDrop(source),
    });
  }, []);

  return (
    <div
      id={title}
      ref={ref}
      className={cn("h-screen w-1/3 rounded-lg border-2 p-4", {
        "bg-gray-600": isDraggedOver,
      })}
    >
      <Alert className="mb-4">
        <AlertTitle>{title}</AlertTitle>
      </Alert>
      {children}
    </div>
  );
};

export default TaskColumn;
