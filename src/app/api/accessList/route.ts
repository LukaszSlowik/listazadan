import prisma from "@/lib/prisma";
type Props = {
  params: {
    id: string;
  };
};
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: Request, { params }: Props) {
  const { searchParams } = new URL(request.url);

  const response = await prisma.emailsWhiteList.findMany({
    where: {
      //userId: params.id,
      email: searchParams.get("email") as string,
    },
  });
  console.log("response", response);
  //findmany from user where userId form response is euqal to user email
  const users = await prisma.user.findMany({
    where: {
      id: {
        in: response.map((item) => item.userId),
      },
    },
    select: {
      id: true,
      email: true,
    },
  });

  console.log(response);
  return new Response(JSON.stringify(users));
}
