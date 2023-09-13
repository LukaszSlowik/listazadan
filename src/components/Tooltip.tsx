import { cn } from "@/lib/utils";
import React from "react";

type Position = "top-right" | "top-left" | "bottom-right" | "bottom-left";
type Props = {
  text: string;
  children: React.ReactNode;
  position: Position;
  transition?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

const Tooltip = ({
  text,
  transition,
  position,
  children,
  className,
  ...props
}: Props) => {
  return (
    <div className={cn("group relative")}>
      {children}
      <span
        className={cn(
          "invisible absolute z-50  whitespace-nowrap rounded-md border-2 border-columnBackgroundColor border-x-columnBackgroundColor bg-slate-800 p-2 text-sm text-slate-300 opacity-0  group-hover:visible group-hover:opacity-100",
          { transition: transition },
          {
            "translate-y-2/3 group-hover:bottom-full  group-hover:-translate-x-1/2 group-hover:-translate-y-1/4":
              position === "top-left",
            "translate-y-2/3 group-hover:bottom-full group-hover:-translate-y-1/4 group-hover:translate-x-1/2":
              position === "top-right",
            " -translate-x-3/4 -translate-y-2/3 group-hover:translate-y-1/4":
              position === "bottom-left",
            "-translate-y-2/3 group-hover:top-full group-hover:translate-x-1/2 group-hover:translate-y-1/4":
              position === "bottom-right",
          },
          className,
        )}
      >
        {text}
      </span>
    </div>
  );
};

export default Tooltip;
