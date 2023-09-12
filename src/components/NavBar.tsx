import React from "react";
import { getServerSession } from "next-auth";
import SignInOutButton from "./buttons/SignInOut";
import Link from "next/link";
import SettingIcon from "@/icons/SettingIcon";
type Props = {};

const NavBar = async (props: Props) => {
  const session = await getServerSession();
  return (
    <nav className="sticky z-10 min-w-full    p-4 drop-shadow-xl">
      <div className="mx-auto flex flex-col items-center justify-between sm:flex-row">
        <h1 className="mb-2 grid place-content-center text-2xl font-bold text-white md:mb-0">
          <Link
            href="/"
            className="text-white/80 no-underline hover:text-white"
          >
            Lista Zadań
          </Link>
        </h1>

        <div className="flex flex-row items-center justify-center gap-4 align-middle text-xl text-white sm:justify-evenly lg:text-2xl">
          <SignInOutButton className="flex cursor-pointer items-center gap-2 rounded-md border-2 border-columnBackgroundColor border-x-columnBackgroundColor p-2 hover:bg-mainBackgroundColor hover:text-rose-500 active:bg-black" />
          <Link className=" cursor-pointer" href="/settings">
            {session?.user && <SettingIcon className="h-6 w-6" />}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
