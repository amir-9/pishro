// app/api/otp/send/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendSmsMelipayamak } from "@/lib/sms";

function generateOtpDigits(length = 4) {
  const min = 10 ** (length - 1);
  const max = 10 ** length - 1;
  return (Math.floor(Math.random() * (max - min + 1)) + min).toString();
}

export async function POST(req: Request) {
  try {
    const { phone } = await req.json();
    if (!phone || !/^09\d{9}$/.test(phone)) {
      return NextResponse.json({ error: "phone_invalid" }, { status: 400 });
    }

    const code = generateOtpDigits(4);
    const expiresAt = new Date(Date.now() + 2 * 60 * 1000); // valid for 2 minutes

    // Save OTP to DB (using Prisma)
    await prisma.otp.create({
      data: { phone, code, expiresAt },
    });

    // Prepare SMS text
    const text = `کد تایید شما: ${code}\nاین کد تا ۲ دقیقه معتبر است.`;

    // Send SMS
    try {
      const response = await sendSmsMelipayamak(phone, text);
      console.log("SMS sent:", response);
    } catch (err) {
      console.error("SMS send failed:", err);
      return NextResponse.json({ error: "sms_failed" }, { status: 500 });
    }

    return NextResponse.json({ ok: true, expiresAt });
  } catch (err) {
    console.error("OTP send error:", err);
    return NextResponse.json({ error: "internal" }, { status: 500 });
  }
}
