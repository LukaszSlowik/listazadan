"use client";
import TrashIcon from "@/icons/TrashIcon";
import { useSortable, SortableContext } from "@dnd-kit/sortable";
import { Column, Id, Task } from "@/types";
import { CSS } from "@dnd-kit/utilities";
import React, { useMemo } from "react";
import PlusIcon from "@/icons/PlusIcon";
import TaskCard from "./TaskCard";

type Props = {
  column: Column;
  deleteColumn: (id: Id) => void;
  updateColumn: (id: Id, title: string) => void;
  createTask: (id: Id) => void;
  deleteTask: (id: Id) => void;
  updateTask: (id: Id, content: string) => void;
  tasks: Task[];
};

const ColumnContainer = ({
  column,
  deleteColumn,
  updateColumn,
  createTask,
  deleteTask,
  updateTask,
  tasks,
}: Props) => {
  const [editMode, setEditMode] = React.useState(false);
  const tasksId = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "column",
      column,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="
      flex
      h-[500px]
      max-h-[500px]
      w-[350px]
      flex-col
      rounded-md
      border-2
      border-rose-500
      bg-columnBackgroundColor
      opacity-60
      "
      ></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="
  flex
  h-[500px]
  max-h-[500px]
  w-[350px]
  flex-col
  rounded-md
  bg-columnBackgroundColor
  "
    >
      <div
        {...attributes}
        {...listeners}
        onClick={() => {
          setEditMode(true);
        }}
        className="text-md rounder-b-none flex h-[60px] cursor-grab items-center justify-between rounded-md bg-mainBackgroundColor p-2 font-bold"
      >
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center bg-columnBackgroundColor px-2 py-1 text-sm">
            0
          </div>
          {!editMode ? (
            column.title
          ) : (
            <input
              className="rounded border bg-black px-2 outline-none focus:border-rose-500"
              value={column.title}
              onChange={(e) => updateColumn(column.id, e.target.value)}
              autoFocus
              onBlur={() => setEditMode(false)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setEditMode(false);
                }
              }}
            />
          )}
        </div>
        <button
          onClick={() => {
            deleteColumn(column.id);
          }}
        >
          <span>
            <TrashIcon
              onClick={() => {
                deleteColumn(column.id);
              }}
              className="h-12 w-12 rounded stroke-gray-500 p-2 px-1 py-2 hover:bg-columnBackgroundColor hover:stroke-white"
            />
          </span>
        </button>
      </div>

      <div className="flex flex-grow flex-col gap-4 overflow-y-auto overflow-x-hidden p-2">
        <SortableContext items={tasksId}>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          ))}
        </SortableContext>
      </div>

      <button
        onClick={() => {
          createTask(column.id);
        }}
        className="flex items-center gap-2 rounded-md border-2 border-columnBackgroundColor border-x-columnBackgroundColor p-4 hover:bg-mainBackgroundColor hover:text-rose-500 active:bg-black"
      >
        <PlusIcon />
        Add a task
      </button>
    </div>
  );
};

export default ColumnContainer;
