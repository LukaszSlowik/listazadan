import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

const LineWithCenteredText = ({ children, className, ...props }: Props) => {
  return (
    <div
      className={cn(
        "mx-auto   flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default LineWithCenteredText;
//className="mx-auto my-10 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
