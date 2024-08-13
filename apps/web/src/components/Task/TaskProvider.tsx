import APIEndpoints from "@/config/apiEndpoints";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useToast } from "../ui/use-toast";

export enum TaskStatus {
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
}

interface TaskProviderProps {
  children: React.ReactNode;
}

interface TaskContextProps {
  loading: boolean;
  tasks: Task[];
  createTask: (title: string, description: string) => Promise<boolean>;
  searchTasks: (query: string, status?: TaskStatus) => Promise<void>;
  getTask: (id: string) => Promise<void>;
  updateTask: (
    id: string,
    title: string,
    description: string
  ) => Promise<boolean>;
  deleteTask: (id: string) => Promise<boolean>;
  changeStatus: (id: string, status: TaskStatus) => Promise<void>;
  error: Record<string, string> | null;
  clearError: () => void;
}

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

const TaskProvider = ({ children }: TaskProviderProps) => {
  const { toast } = useToast();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Record<string, string> | null>(null);

  const clearError = () => {
    setError(null);
  };

  const createTask = async (
    title: string,
    description: string
  ): Promise<boolean> => {
    try {
      const response = await axios.post(
        APIEndpoints.TASK.CREATE,
        {
          title,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setTasks((prev) => [response.data.data, ...prev]);
      toast({ description: response.data.message });
      clearError();
      return true;
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        setError(error.response.data.data);
      } else {
        toast({ description: "Something went wrong. Please try again." });
      }
      return false;
    }
  };

  const getTasks = async () => {
    try {
      const response = await axios.get(APIEndpoints.TASK.GET, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setTasks(response.data.data);
    } catch (error) {
      console.error("Error in getTasks (provider): ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const searchTasks = async (query: string, status?: TaskStatus) => {
    try {
      const response = await axios.get(APIEndpoints.TASK.GET, {
        params: { query, status },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setTasks(response.data.data);
    } catch (error) {
      console.error("Error in searchTasks (provider): ", error);
    }
  };

  const getTask = async (id: string) => {
    try {
      const response = await axios.get(APIEndpoints.TASK.GET_ONE(id), {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data.data;
    } catch (error) {
      console.error("Error in getTask (provider): ", error);
    }
  };

  const updateTask = async (
    id: string,
    title: string,
    description: string
  ): Promise<boolean> => {
    try {
      const response = await axios.put(
        APIEndpoints.TASK.UPDATE(id),
        {
          title,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? response.data.data : task))
      );
      toast({ description: response.data.message });
      clearError();
      return true;
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        setError(error.response.data.data);
      } else {
        toast({ description: "Something went wrong. Please try again." });
      }
      return false;
    }
  };

  const deleteTask = async (id: string): Promise<boolean> => {
    try {
      const response = await axios.delete(APIEndpoints.TASK.DELETE(id), {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setTasks((prev) => prev.filter((task) => task.id !== id));
      toast({ description: response.data.message });
      return true;
    } catch (error) {
      toast({ description: "Something went wrong. Please try again." });
      return false;
    }
  };

  const changeStatus = async (id: string, status: TaskStatus) => {
    try {
      const response = await axios.put(
        APIEndpoints.TASK.CHANGE_STATUS(id),
        {
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? response.data.data : task))
      );
      toast({ description: response.data.message });
    } catch (error) {
      toast({ description: "Something went wrong. Please try again." });
    }
  };

  return (
    <TaskContext.Provider
      value={{
        loading,
        tasks,
        createTask,
        searchTasks,
        getTask,
        updateTask,
        deleteTask,
        changeStatus,
        error,
        clearError,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;

export const useTask = () => {
  return useContext(TaskContext);
};
