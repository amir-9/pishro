// @/lib/sms.ts
import { URLSearchParams } from "url";
const MELI_USERNAME = process.env.MELIPAYAMAK_USERNAME!;
const MELIPAYAMAK_API_KEY = process.env.MELIPAYAMAK_API_KEY!;
const MELI_SENDER = process.env.MELIPAYAMAK_SENDER!; // e.g. "5000XXXXXXX"

/**
 * Send SMS via Melipayamak REST API
 * Docs: https://www.melipayamak.com/docs/
 */
export async function sendSmsMelipayamak(phone: string, text: string) {
  if (!MELI_USERNAME || !MELIPAYAMAK_API_KEY || !MELI_SENDER) {
    throw new Error(
      "Melipayamak credentials are missing in environment variables."
    );
  }

  const url = "https://api.payamak-panel.com/post/Send.asmx/SendSimpleSMS2";

  // Prepare parameters in form-urlencoded format
  const params = new URLSearchParams({
    username: MELI_USERNAME,
    password: MELIPAYAMAK_API_KEY,
    to: phone,
    from: MELI_SENDER,
    text,
    isflash: "false",
  });

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });

  const responseText = await res.text();

  if (!res.ok || responseText.includes("Error")) {
    console.error("Melipayamak API error:", responseText);
    throw new Error("Failed to send SMS via Melipayamak");
  }

  return responseText;
}
