"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

interface OtpFormProps {
  phone: string;
  countdown: number;
  onVerify?: (code: string) => void;
  onResend?: () => void;
}

export function OtpForm({
  phone,
  countdown,
  onVerify,
  onResend,
}: OtpFormProps) {
  const [code, setCode] = useState("");
  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;

  const handleVerify = () => {
    onVerify?.(code);
  };

  const handleResendClick = () => {
    onResend?.();
  };

  return (
    <div className="mt-8 flex flex-col items-center gap-6">
      {/* پیام بالای صفحه */}
      <p className="text-center text-gray-700 font-medium leading-relaxed">
        کد ۴ رقمی ارسال‌شده به{" "}
        <span className="font-bold text-black">{phone}</span> را وارد کنید:
      </p>

      {/* ورودی کد با shadcn */}
      <InputOTP
        maxLength={4}
        value={code}
        onChange={(value) => setCode(value.replace(/\D/g, ""))}
      >
        <InputOTPGroup className="ltr">
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
        </InputOTPGroup>
      </InputOTP>

      {/* تایمر یا دکمه ارسال مجدد */}
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
        >
          ارسال مجدد کد
        </Button>
      )}

      {/* دکمه تایید */}
      <Button
        onClick={handleVerify}
        disabled={code.length !== 4}
        className="w-full h-10 bg-[#d52a16] text-white font-bold text-lg"
      >
        تایید کد
      </Button>
    </div>
  );
}
