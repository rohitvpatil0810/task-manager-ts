import CreateTask from "../Task/CreateTask";
import TaskColumn from "../Task/TaskColumn";
import { TaskStatus, useTask } from "../Task/TaskProvider";
import TaskCard from "@/components/Task/TaskCard";

const Home = () => {
  const taskContext = useTask();

  return (
    <div>
      <CreateTask />
      <div className="flex w-full space-x-16 p-10">
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
