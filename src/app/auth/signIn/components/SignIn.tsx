"use client";
import React, { useRef, useId, useState } from "react";
import { signIn } from "next-auth/react";
import CancelButton from "@/components/buttons/CancelButton";
import GoogleLoginButton from "./GoogleSignInButton";
import LineWithCenteredText from "@/components/LineWithCenteredText";
type Props = {
  callbackUrl?: string;
};

const SignIn = ({ callbackUrl }: Props) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const userNameId = useId();
  const passwordId = useId();

  const onSubmit = async () => {
    console.log(username);
    const result = await signIn("credentials", {
      username,
      password,
      redirect: true,
      callbackUrl: "/",
    });
    console.log(username);
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2 ">
      <div className="flex flex-col gap-4 rounded-md px-7 py-4 shadow">
        <div className="flex flex-col">
          <label htmlFor={userNameId}>Email</label>
          <input
            type="text"
            name="userName"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            id={userNameId}
            className="rounded-md border-2 border-gray-300 p-2 text-black"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor={passwordId}>Hasło</label>
          <input
            type="password"
            name="userName"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id={passwordId}
            className="rounded-md border-2 border-gray-300 p-2 text-black"
          />
        </div>
        <div className="flex flex-row justify-between gap-2">
          <button
            onClick={() => onSubmit()}
            className="flex items-center justify-center  gap-2 rounded-md border-2 border-columnBackgroundColor border-x-columnBackgroundColor p-4 text-center hover:bg-mainBackgroundColor hover:text-rose-500 active:bg-black"
          >
            Zaloguj
          </button>
          <CancelButton callbackUrl={callbackUrl} />
        </div>
        {/* <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
          <hr className="border-gray-400" />
          <p className="text-center text-sm">LUB</p>
          <hr className="border-gray-400" />
        </div> */}
        <LineWithCenteredText className="my-5 before:bg-stone-700 after:bg-stone-700 ">
          lub
        </LineWithCenteredText>
        <GoogleLoginButton />
      </div>
    </div>
  );
};

export default SignIn;
