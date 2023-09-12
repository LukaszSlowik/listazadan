import prisma from "@/lib/prisma";
import * as bcrypt from "bcrypt";
type RequestBody = {
  username: string;
  password: string;
};
export const dynamic = "force-dynamic";
export const revalidate = 0;
export async function POST(request: Request) {
  console.log("Will be login ");
  const body: RequestBody = await request.json();

  const user = await prisma.user.findFirst({
    where: {
      email: body.username,
    },
  });
  if (user && (await bcrypt.compare(body.password, user.password as string))) {
    const { password, ...userWithoutPass } = user;
    return new Response(JSON.stringify(userWithoutPass));
  }
  return new Response(JSON.stringify({ message: "Nothing" }));
}
