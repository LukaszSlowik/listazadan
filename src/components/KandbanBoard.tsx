"use client";
import PlusIcon from "@/icons/PlusIcon";
import { Column, Id, Task } from "@/types";
import React, { useMemo } from "react";
import ColumnContainer from "./ColumnContainer";
import {
  DndContext,
  DragStartEvent,
  DragOverlay,
  DragEndEvent,
  useSensors,
  useSensor,
  PointerSensor,
  DragOverEvent,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import TaskCard from "./TaskCard";

type Props = {};

const KandbanBoard = (props: Props) => {
  const [mounted, setMounted] = React.useState(false);

  const [columns, setColumns] = React.useState<Column[]>([]);
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3, //300px
      },
    }),
  );
  const columnsId = useMemo(() => {
    return columns.map((column) => column.id);
  }, [columns]);

  const [activeColumn, setActiveColumn] = React.useState<Column | null>(null);
  const [activeTask, setActiveTask] = React.useState<Task | null>(null);
  console.log(columns);

  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  const createNewColumn = () => {
    const columnToAdd: Column = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
    };
    setColumns([...columns, columnToAdd]);
  };
  const generateId = () => {
    return Math.floor(Math.random() * 10001);
  };
  const deleteColumn = (id: Id) => {
    console.log("delete column", id);
    const filteredColumns = columns.filter((column) => column.id !== id);
    setColumns(filteredColumns);
    const newTasks = tasks.filter((task) => task.columnId !== id);
    setTasks(newTasks);
  };
  const updateColumn = (id: Id, title: string) => {
    console.log("update column", id, title);

    const updatedColumns = columns.map((column) => {
      if (column.id !== id) return column;
      return {
        ...column,
        title,
      };
    });
    setColumns(updatedColumns);
  };
  const createTask = (columnId: Id) => {
    console.log("create task", columnId);
    const taskToAdd: Task = {
      id: generateId(),
      content: `Task ${tasks.length + 1}`,
      columnId: columnId,
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
    if (event.active.data.current?.type === "column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }
    if (event.active.data.current?.type === "task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    setActiveColumn(null);
    setActiveTask(null);
    const { active, over } = event;
    if (!over) return;
    const activeColumnId = active.id;
    const overColumnId = over.id;
    if (activeColumnId === overColumnId) return;
    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex(
        (column) => column.id === activeColumnId,
      );
      const overColumnIndex = columns.findIndex(
        (column) => column.id === overColumnId,
      );

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  };
  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;
    const activeId = active.id;
    const overId = over.id;
    if (activeId === overId) return;
    const isActiveATask = active.data.current?.type === "task";
    const isOverATask = over.data.current?.type === "task";
    if (!isActiveATask) return;

    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);

        //if (tasks[activeIndex].columnId !== tasks[overIndex].columnId) {
        tasks[activeIndex].columnId = tasks[overIndex].columnId;
        // }
        return arrayMove(tasks, activeIndex, overIndex);
      });
      const isOverAColumn = over.data.current?.type === "column";
      if (isOverAColumn && isActiveATask) {
        setTasks((tasks) => {
          const activeIndex = tasks.findIndex((t) => t.id === activeId);
          // const overIndex = tasks.findIndex((t) => t.id === overId);

          //if (tasks[activeIndex].columnId !== tasks[overIndex].columnId) {
          tasks[activeIndex].columnId = overId;
          // }
          return arrayMove(tasks, activeIndex, activeIndex);
        });
      }
    }
  };

  return (
    <div
      className="
    m-auto
    flex
    min-h-screen
    w-full
    items-center
    overflow-x-auto
    overflow-y-hidden
    px-[40px]
    
    "
    >
      <DndContext
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
        sensors={sensors}
      >
        <div className="m-auto flex gap-4">
          <div className="flex gap-4">
            <SortableContext items={columnsId}>
              {columns.map((column) => (
                <ColumnContainer
                  column={column}
                  key={column.id}
                  deleteColumn={deleteColumn}
                  updateColumn={updateColumn}
                  createTask={createTask}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                  tasks={tasks.filter((task) => task.columnId === column.id)}
                />
              ))}
            </SortableContext>
          </div>
          <button
            onClick={createNewColumn}
            className="
    border-color-mainBorderColor
  flex
    h-[60px]
   w-44
    cursor-pointer
    gap-2
   
    rounded-lg
    border-2
    bg-mainBackgroundColor
    p-4
    ring-rose-500
    hover:ring-2
    "
          >
            <PlusIcon className="h-6 w-6" />
            <span>Add column</span>
          </button>
        </div>
        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnContainer
                column={activeColumn}
                deleteColumn={deleteColumn}
                updateColumn={updateColumn}
                createTask={createTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
                tasks={tasks.filter(
                  (task) => task.columnId === activeColumn.id,
                )}
              />
            )}
            {activeTask && (
              <TaskCard
                task={activeTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />
            )}
          </DragOverlay>,
          document.body,
        )}
      </DndContext>
    </div>
  );
};

export default KandbanBoard;
