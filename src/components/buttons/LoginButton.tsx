"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { signIn } from "next-auth/react";
type Props = {};

const LoginButton = (props: Props) => {
  return (
    <div
      onClick={() => signIn("google", { callbackUrl: "/" })}
      className="flex cursor-pointer items-center gap-2 rounded-md border-2 border-columnBackgroundColor border-x-columnBackgroundColor p-4 hover:bg-mainBackgroundColor hover:text-rose-500 active:bg-black"
    >
      LoginIn
    </div>
  );
};

export default LoginButton;
