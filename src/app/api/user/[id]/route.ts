import prisma from "@/lib/prisma";
import ObjectId from "bson-objectid";
type Props = {
  params: {
    id: string;
  };
};
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: Request, { params }: Props) {
  console.log(params.id);
  const userTasks = await prisma.task.findMany({
    where: {
      userId: params.id,
    },
  });
  console.log(userTasks);
  return new Response(JSON.stringify(userTasks));
}
