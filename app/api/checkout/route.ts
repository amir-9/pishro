// app/api/checkout/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, items, _callbackUrl } = body;

    // ✅ Validate input
    if (!userId || !items || items.length === 0) {
      return NextResponse.json(
        { error: "اطلاعات ارسالی ناقص است" },
        { status: 400 }
      );
    }

    // ✅ Extract all course IDs
    const courseIds = items.map((item: { courseId: string }) => item.courseId);

    // ✅ Fetch courses from DB
    const courses = await prisma.course.findMany({
      where: { id: { in: courseIds } },
      select: { id: true, price: true, discountPercent: true },
    });

    if (courses.length === 0) {
      return NextResponse.json(
        { error: "دوره‌ای با شناسه‌های ارسالی یافت نشد" },
        { status: 400 }
      );
    }

    // 🧮 Calculate total from real DB data
    const total = courses.reduce((sum, course) => {
      return sum + course.price;
    }, 0);

    // ✅ Create order in DB
    const order = await prisma.order.create({
      data: {
        userId,
        items: courses.map((c) => ({ courseId: c.id })), // stored as JSON
        total,
        status: "pending",
      },
    });

    console.log(`[Checkout] Order ${order.id} created. Total: ${total}`);

    // ⚠️ Fake payment URL (until Zarinpal integration)
    const fakePayUrl = `https://sandbox.zarinpal.com/pg/StartPay/fake-${order.id}`;

    return NextResponse.json({
      ok: true,
      orderId: order.id,
      payUrl: fakePayUrl,
      total,
    });
  } catch (err) {
    console.error("[Checkout POST error]:", err);
    return NextResponse.json(
      { error: "خطایی در پردازش سفارش رخ داد" },
      { status: 500 }
    );
  }
}
