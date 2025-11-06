// api/user/pay
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

// ✅ Update pay info
export async function PUT(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { cardNumber, shebaNumber, accountOwner } = await req.json();

    const user = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        cardNumber,
        shebaNumber,
        accountOwner,
      },
    });

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Pay info update error:", error);
    return NextResponse.json(
      { error: "Failed to update payment info" },
      { status: 500 }
    );
  }
}
