import { capitalizeFirstLetter } from "@/lib/utils";
import { useAuth } from "../Auth/AuthProvider";
import CreateTask from "../Task/CreateTask";
import TaskColumn from "../Task/TaskColumn";
import { TaskStatus, useTask } from "../Task/TaskProvider";
import TaskCard from "@/components/Task/TaskCard";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import SearchTask from "../Task/SearchTask";

const Home = () => {
  const auth = useAuth();
  const taskContext = useTask();

  return (
    <div className="md:h-screen md:overflow-hidden p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold">
          Welcome, {capitalizeFirstLetter(auth?.user?.firstName!)}
        </h1>
        <div className="w-fit flex items-center space-x-4">
          <div className="hidden md:block">
            <SearchTask />
          </div>
          <CreateTask />
          <Button onClick={auth?.logout}>
            <LogOut size={20} />
          </Button>
        </div>
      </div>
      <div className="md:hidden pt-4">
        <SearchTask />
      </div>
      <div className="flex flex-col md:flex-row h-full space-y-12 md:space-y-0 space-x-0 md:space-x-12 pt-4 pb-8">
        <TaskColumn title={TaskStatus.TODO}>
          {taskContext?.tasks
            .filter((task) => task.status === TaskStatus.TODO)
            .map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
        </TaskColumn>
        <TaskColumn title={TaskStatus.IN_PROGRESS}>
          {taskContext?.tasks
            .filter((task) => task.status === TaskStatus.IN_PROGRESS)
            .map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
        </TaskColumn>
        <TaskColumn title={TaskStatus.DONE}>
          {taskContext?.tasks
            .filter((task) => task.status === TaskStatus.DONE)
            .map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
        </TaskColumn>
      </div>
    </div>
  );
};

export default Home;
