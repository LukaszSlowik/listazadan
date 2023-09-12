"use client";
import React from "react";
import { useSession, signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import { signIn } from "next-auth/react";
import { cn } from "@/lib/utils";
type Props = {} & React.HTMLAttributes<HTMLDivElement>;

const SignInOutButton = ({ className, ...props }: Props) => {
  const { data: session } = useSession();
  if (session && session.user) {
    return (
      <div
        onClick={() => signOut()}
        className={cn(
          "flex cursor-pointer items-center gap-2 rounded-md border-2 border-columnBackgroundColor border-x-columnBackgroundColor p-4 hover:bg-mainBackgroundColor hover:text-rose-500 active:bg-black",
          className,
        )}
      >
        Wyloguj
      </div>
    );
  }
  return (
    <div
      onClick={() => signIn()}
      className="flex cursor-pointer items-center gap-2 rounded-md border-2 border-columnBackgroundColor border-x-columnBackgroundColor p-4 hover:bg-mainBackgroundColor hover:text-rose-500 active:bg-black"
    >
      Zaloguj
    </div>
  );
};

export default SignInOutButton;
