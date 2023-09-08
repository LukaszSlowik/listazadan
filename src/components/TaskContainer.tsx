"use client";

import React from "react";
import { Id } from "@/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TrashIcon from "@/icons/TrashIcon";
import { UniqueIdentifier } from "@dnd-kit/core";
import { Task } from "@/lib/validations/Task";

type Props = {
  task: Task;
  createTask: (id: string) => void;
  deleteTask: (id: string) => void;
  updateTask: (id: string, content: string) => void;
};

const TaskContainer = ({ task, deleteTask, updateTask }: Props) => {
  const [mouseIsOver, setMouseIsOver] = React.useState(false);
  const [editMode, setEditMode] = React.useState(false);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id as UniqueIdentifier,
    data: {
      type: "task",
      task,
    },
    disabled: editMode,
  });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
    setMouseIsOver(false);
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="relative flex h-[70px] min-h-[70px] cursor-grab items-center rounded-xl border-2 border-rose-500 bg-mainBackgroundColor p-2.5 text-left opacity-30 "
      ></div>
    );
  }

  if (editMode)
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="relative flex h-[70px] min-h-[70px] cursor-grab items-center rounded-xl bg-mainBackgroundColor p-2.5 text-left hover:ring-2 hover:ring-inset hover:ring-rose-500"
      >
        <textarea
          autoFocus
          onBlur={toggleEditMode}
          //defaultValue={task.content}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) toggleEditMode();
          }}
          value={task.content}
          onChange={(e) => {
            updateTask(task.id as string, e.target.value);
          }}
          placeholder="Task content here"
          className="h-[90%] w-full resize-none rounded border-none bg-transparent text-white focus:outline-none"
        />
      </div>
    );

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={toggleEditMode}
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
      className="task relative flex h-[70px] min-h-[70px] cursor-grab items-center rounded-xl bg-mainBackgroundColor p-2.5 text-left hover:ring-2 hover:ring-inset hover:ring-rose-500"
    >
      <p className="my-auto h-[90%] w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap">
        {task.content}
      </p>
      {mouseIsOver && (
        <button
          onClick={() => {
            deleteTask(task.id as string);
          }}
          className="absolute right-4 top-1/2  -translate-y-1/2 rounded bg-columnBackgroundColor stroke-white p-2 opacity-60 hover:opacity-100"
        >
          <TrashIcon />
        </button>
      )}
    </div>
  );
};
export default TaskContainer;
