import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

type Props = {
  params: {
    userid: string;
  };
};

export const dynamic = "force-dynamic";
export const revalidate = 0;
export async function GET(request: Request, { params }: Props) {
  const { userid } = params;
  const tasks = await prisma.emailsWhiteList.findMany({
    where: {
      userId: userid,
    },
  });
  if (tasks) return NextResponse.json(tasks);
  return NextResponse.json({ message: "Nothing" });
}

export async function POST(request: Request, { params }: Props) {
  const { userid } = params;
  const body = await request.json();
  const { email } = body;
  const response = await prisma.emailsWhiteList.create({
    data: {
      email,
      userId: userid,
    },
  });
  if (response) return NextResponse.json(response);
  return NextResponse.json({ message: "Nothing" });
}
