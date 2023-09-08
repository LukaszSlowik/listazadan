import TaskList from "@/components/TaskList";
import PlusIcon from "@/icons/PlusIcon";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main className="  flex  min-h-screen flex-col items-center  gap-8 pt-4">
      <TaskList />
    </main>
  );
}
