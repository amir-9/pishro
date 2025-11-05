"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

interface OtpFormProps {
  phone: string;
  countdown: number;
  onVerify?: (code: string) => Promise<void> | void;
  onResend?: () => Promise<void> | void;
}

export function OtpForm({
  phone,
  countdown,
  onVerify,
  onResend,
}: OtpFormProps) {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // ریشهٔ DOM که InputOTP بهش ref می‌فرسته (div یا wrapper)
  const otpRootRef = useRef<HTMLDivElement | null>(null);

  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;

  // تلاش برای فوکوس: تا maxAttempts هر attemptDelay میلی‌ثانیه منتظر می‌شویم
  useEffect(() => {
    let attempts = 0;
    const maxAttempts = 10;
    const attemptDelay = 100; // ms

    const tryFocus = () => {
      attempts++;
      try {
        // داخل ریشه دنبال اولین input بگرد
        const input =
          otpRootRef.current?.querySelector<HTMLInputElement>("input");
        if (input) {
          // اگر پیدا شد فوکوس کن و کار تمام
          input.focus({ preventScroll: false });
          // بعضی اوقات بهتره selection هم ست بشه (برای iOS/Android)
          try {
            input.setSelectionRange(input.value.length, input.value.length);
          } catch {}
          return;
        }
        // ignore
      } catch (err) {
        console.log(err);
      }

      if (attempts < maxAttempts) {
        // تلاش بعدی
        setTimeout(tryFocus, attemptDelay);
      }
    };

    // شروع تلاش
    setTimeout(tryFocus, 50);

    return () => {
      // cleanup: در این نمونه چیزی خاص لازم نیست چون ما فقط timeouts داریم که خودشان پاک می‌شوند
    };
  }, []);

  const handleVerify = async () => {
    if (isLoading || code.length !== 4) return;
    setIsLoading(true);

    try {
      await onVerify?.(code);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendClick = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      await onResend?.();
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // خودکار ارسال وقتی 4 رقم کامل شد
  useEffect(() => {
    if (code.length === 4) {
      handleVerify();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  return (
    <div className="mt-8 flex flex-col items-center gap-6">
      <p className="text-center text-gray-700 font-medium leading-relaxed">
        کد ۴ رقمی ارسال‌شده به{" "}
        <span className="font-bold text-black">{phone}</span> را وارد کنید:
      </p>

      {/* ref را روی wrapper می‌گذاریم */}
      <div ref={otpRootRef} className="w-full flex justify-center">
        <InputOTP
          maxLength={4}
          value={code}
          onChange={(value) => setCode(value.replace(/\D/g, ""))}
          disabled={isLoading}
        >
          <InputOTPGroup className="ltr">
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
        </InputOTP>
      </div>

      {countdown > 0 ? (
        <p className="text-sm text-gray-600">
          ارسال مجدد تا{" "}
          <span className="font-semibold text-gray-800">
            {minutes}:{seconds.toString().padStart(2, "0")}
          </span>
        </p>
      ) : (
        <Button
          className="w-40 h-10 hover:bg-black/5"
          variant="outline"
          onClick={handleResendClick}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-gray-600 border-t-transparent" />
              در حال ارسال...
            </div>
          ) : (
            "ارسال مجدد کد"
          )}
        </Button>
      )}

      <Button
        onClick={handleVerify}
        disabled={code.length !== 4 || isLoading}
        className="w-full h-10 bg-[#d52a16] text-white font-bold text-lg"
      >
        {isLoading ? (
          <div className="flex items-center justify-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            در حال تأیید...
          </div>
        ) : (
          "تأیید کد"
        )}
      </Button>
    </div>
  );
}
