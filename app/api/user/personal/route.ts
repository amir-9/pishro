// api/user/personal
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

// ✅ Update personal information
export async function PUT(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    const {
      firstName,
      lastName,
      phone,
      email,
      nationalCode,
      birthDate,
      avatarUrl,
    } = data;

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        firstName,
        lastName,
        phone,
        email,
        nationalCode,
        birthDate: birthDate ? new Date(birthDate) : null,
        avatarUrl,
      },
    });

    return NextResponse.json({ user: updatedUser });
  } catch (error) {
    console.error("Update personal info error:", error);
    return NextResponse.json(
      { error: "Failed to update personal info" },
      { status: 500 }
    );
  }
}
