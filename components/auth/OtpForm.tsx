"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
    <div className="mt-8 flex flex-col items-center gap-4">
      <p className="text-center text-gray-700 font-medium">
        کد ۴ رقمی ارسال‌شده به{" "}
        <span className="font-bold text-black">{phone}</span> را وارد کنید:
      </p>

      <Input
        maxLength={4}
        value={code}
        onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
        className="text-center text-2xl tracking-[10px] w-40 border-b-2 border-black"
      />

      {countdown > 0 ? (
        <p className="text-sm text-gray-600">
          ارسال مجدد تا {minutes}:{seconds.toString().padStart(2, "0")}
        </p>
      ) : (
        <Button variant="outline" onClick={handleResendClick}>
          ارسال مجدد کد
        </Button>
      )}

      <Button
        className="w-full h-10 bg-[#d52a16] text-white font-bold text-lg"
        onClick={handleVerify}
        disabled={code.length !== 4}
      >
        تایید کد
      </Button>
    </div>
  );
}
