"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { signIn } from "next-auth/react";
type Props = {};

const SignInButton = (props: Props) => {
  const { data: session } = useSession();
  if (session && session.user) {
  }
  return (
    <div
      onClick={() => signIn("google", { callbackUrl: "/" })}
      className="flex cursor-pointer items-center gap-2 rounded-md border-2 border-columnBackgroundColor border-x-columnBackgroundColor p-4 hover:bg-mainBackgroundColor hover:text-rose-500 active:bg-black"
    >
      Zaloguj
    </div>
  );
};

export default SignInButton;
