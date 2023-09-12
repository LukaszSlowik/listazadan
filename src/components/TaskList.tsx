"use client";
import React, { useEffect, useMemo, useCallback, useRef } from "react";
import { Id } from "@/types";
import { CSS } from "@dnd-kit/utilities";
import {
  DndContext,
  DragStartEvent,
  DragOverlay,
  DragEndEvent,
  useSensors,
  useSensor,
  PointerSensor,
  UniqueIdentifier,
  MouseSensor,
  TouchSensor,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import TaskContainer from "./TaskContainer";
import { signIn, useSession } from "next-auth/react";
import PlusIcon from "@/icons/PlusIcon";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Task } from "@/lib/validations/Task";
import { getTasks, saveTasks } from "@/lib/fetchFunctions/fetchFunctions";
import ButtonUpdateOrGet from "./buttons/buttons";
import DatabaseIcon from "@/icons/DatabaseIcon";
import SendIcon from "@/icons/SendIcon";
type Props = {};

const TaskList = (props: Props) => {
  const { data: session } = useSession();

  const queryClient = useQueryClient();
  const [updateTasks, setUpdateTasks] = React.useState(false);

  const { data: tasksFromDB = [], isLoading } = useQuery(
    ["tasks", session?.user.id],
    () => getTasks(session?.user.id as string),
    {
      enabled: !!session?.user.id,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: true,
      staleTime: Infinity,
    },
  );

  const { mutate } = useMutation(saveTasks, {
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks", session?.user.id]);
    },
  });

  // const [tasks, setTasks] = React.useState<Task[]>(tasksFromDB);
  const [tasks, setTasks] = React.useState<Task[]>(tasksFromDB);

  useEffect(() => {
    if (tasksFromDB.length === 0) return;
    console.log("tasks will be updated");
    setTasks(tasksFromDB);
  }, [tasksFromDB, updateTasks]);

  const [activeTask, setActiveTask] = React.useState<Task | null>(null);
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10, //300px
    },
  }); // Initialize mouse sensor
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      distance: 10, //300px
    },
  }); // Initialize touch sensor
  const sensors = useSensors(mouseSensor, touchSensor);
  const generateId = () => {
    return Math.floor(Math.random() * 10001).toString();
  };

  const tasksId = React.useMemo(() => {
    if (!Array.isArray(tasks)) return;
    return tasks?.map((task) => task.id);
  }, [tasks]);

  const createTask = () => {
    const taskToAdd: Task = {
      id: generateId(),
      content: `Zadanie ${tasks.length + 1}`,
      index: tasks.length + 1,
      done: false,

      dateOfDone: new Date().toISOString().slice(0, 10),
      userId: session?.user.id as string,
    };
    setTasks([...tasks, taskToAdd]);
  };
  const deleteTask = (id: Id) => {
    console.log("delete task", id);
    const filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);
  };
  const updateTask = (id: Id, content: string) => {
    console.log("update task", id, content);
    const updatedTasks = tasks.map((task) => {
      if (task.id !== id) return task;
      return {
        ...task,
        content,
      };
    });
    setTasks(updatedTasks);
  };
  const onDragStart = (event: DragStartEvent) => {
    console.log(event);
    if (event.active.data.current?.type === "task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    console.log(event);
    const { active, over } = event;
    if (!over) return;
    const activeItemId = active.id;
    const overItemId = over.id;
    if (activeItemId === overItemId) return;
    setTasks((tasks) => {
      const activeItemIndex = tasks.findIndex(
        (task) => task.id === activeItemId,
      );
      const overItemIndex = tasks.findIndex((task) => task.id === overItemId);
      return arrayMove(tasks, activeItemIndex, overItemIndex);
    });
  };
  console.log(tasks);

  const triggerMutation = async () => {
    mutate(tasks);
  };

  const invalidateQuery = () => {
    queryClient.invalidateQueries(["tasks"]);
    // refetch();
    setUpdateTasks((prev) => !prev);
    //
  };

  if (isLoading || !Array.isArray(tasks)) return <div>Ładuje...</div>;

  if (!session || !session.user)
    return (
      <div>
        <p>Nie jesteś zalogowany</p>
        <button
          onClick={() => signIn()}
          className="flex cursor-pointer items-center gap-2 rounded-md border-2 border-columnBackgroundColor border-x-columnBackgroundColor p-4 hover:bg-mainBackgroundColor hover:text-rose-500 active:bg-black"
        >
          Zaloguj
        </button>
      </div>
    );

  return (
    <>
      <div className="flex flex-wrap gap-4">
        <ButtonUpdateOrGet refetch={invalidateQuery}>
          <DatabaseIcon />
          Pobierz z bazy
        </ButtonUpdateOrGet>
        {/* <button onClick={handleGetData}>Test get data</button> */}
        <ButtonUpdateOrGet
          mutateVersion={true}
          triggerMutation={triggerMutation}
        >
          Aktualizuj
          <SendIcon />
        </ButtonUpdateOrGet>
        <button
          onClick={() => {
            createTask();
          }}
          className="  flex items-center gap-2 rounded-md border-2 border-columnBackgroundColor border-x-columnBackgroundColor p-4 hover:bg-mainBackgroundColor hover:text-rose-500 active:bg-black"
        >
          <PlusIcon className="h-6 w-6" />
          Dodaj zadanie
        </button>
      </div>

      <div
        className="
      
      flex
      h-[500px]
      max-h-[500px]
      w-[350px]
      touch-none
      flex-col
      overflow-y-auto
      overscroll-none
      rounded-md
      bg-columnBackgroundColor"
      >
        {" "}
        <DndContext
          sensors={sensors}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          //onDragOver={onDragOver}
        >
          <div className=" flex  flex-col gap-4 p-2">
            <SortableContext items={tasksId as UniqueIdentifier[]}>
              {tasks?.map((task) => (
                <TaskContainer
                  task={task}
                  key={task.id}
                  createTask={createTask}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                />
              ))}
            </SortableContext>
          </div>
          <DragOverlay>
            {activeTask && (
              <TaskContainer
                task={activeTask}
                createTask={createTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />
            )}
          </DragOverlay>
        </DndContext>
      </div>
    </>
  );
};

export default TaskList;
