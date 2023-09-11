import TaskList from "@/components/TaskList";
import { getServerSession } from "next-auth/next";
import PlusIcon from "@/icons/PlusIcon";
import Image from "next/image";
import options from "@/app/api/auth/[...nextauth]/options";
import LoginButton from "@/components/buttons/LoginButton";

export const dynamic = "force-dynamic";

export default async function Home() {
  const session = await getServerSession(options);
  return (
    <main className="  flex  min-h-screen flex-col items-center  gap-8 overscroll-none pt-4">
      {session ? (
        <>
          {" "}
          <div>User info: {session?.user?.email}</div>
          <TaskList />
        </>
      ) : (
        <>
          <div>Not logged in</div>
          <LoginButton />
        </>
      )}
    </main>
  );
}
