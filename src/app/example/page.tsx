import TaskList from "@/components/TaskList";
import Tooltip from "@/components/Tooltip";
import PlusIcon from "@/icons/PlusIcon";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default function ExamplePage() {
  return (
    <main className="  flex  min-h-screen flex-col items-center  gap-8 overscroll-none pt-4">
      <div>example</div>
      <div className="m-20 flex border">
        <Tooltip text="some tooltip" position="top-left">
          <div className="text-2xl">test main</div>
        </Tooltip>
      </div>

      <div className="m-20 flex border">
        <Tooltip text="some tooltip" position="top-right">
          <div className="text-2xl">test main</div>
        </Tooltip>
      </div>
      <div className="m-20 flex border">
        <Tooltip text="some tooltip" position="bottom-right">
          <div className="text-2xl">test main</div>
        </Tooltip>
      </div>

      <div>poniżej</div>
    </main>
  );
}
