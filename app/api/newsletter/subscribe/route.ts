// app/api/newsletter/subscribe/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { phone } = await req.json();
  if (!phone)
    return NextResponse.json({ error: "phone required" }, { status: 400 });
  try {
    const sub = await prisma.newsletterSubscriber.create({ data: { phone } });
    return NextResponse.json({ ok: true, subId: sub.id });
  } catch (err: any) {
    if (err.code === "P2002") {
      // unique constraint
      return NextResponse.json({ ok: true, message: "already_subscribed" });
    }
    return NextResponse.json({ error: "db_error" }, { status: 500 });
  }
}
