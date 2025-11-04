"use client";

import { useEffect } from "react";
import { useForm, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { TextInput } from "./TextInput";
import { PasswordInput } from "./PasswordInput";
import {
  loginSchema,
  signupSchema,
  Variant,
  LoginFormValues,
  SignupFormValues,
} from "@/lib/schemas/authSchema";

interface AuthFormProps {
  variant: Variant;
  onSubmit?: (data: LoginFormValues | SignupFormValues) => void;
}

export function AuthForm({ variant, onSubmit }: AuthFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormValues | SignupFormValues>({
    mode: "onChange",
    resolver: zodResolver(variant === "signup" ? signupSchema : loginSchema),
  });

  useEffect(() => reset(), [variant, reset]);

  const handleFormSubmit = (data: LoginFormValues | SignupFormValues) => {
    onSubmit?.(data);
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex flex-col gap-4 mt-8"
    >
      <TextInput
        id="username"
        label="شماره تلفن"
        placeholder="شماره تلفن"
        icon={<Phone className={cn(errors.username && "text-red-500")} />}
        {...register("username")}
        error={errors.username?.message as string}
      />

      <PasswordInput
        id="password"
        label="رمز عبور"
        placeholder="رمز عبور"
        {...register("password")}
        error={errors.password?.message as string}
      />

      {variant === "signup" && (
        <PasswordInput
          id="confirmPassword"
          label="تکرار رمز عبور"
          placeholder="رمز عبور خود را وارد کنید"
          {...register("confirmPassword")}
          error={
            (errors as FieldErrors<SignupFormValues>).confirmPassword
              ?.message as string
          }
        />
      )}

      <Button
        type="submit"
        className="mt-6 w-full h-10 max-w-[306px] bg-[#d52a16] text-white font-bold text-xl mx-auto"
      >
        {variant === "login" ? "ورود" : "ثبت نام"}
      </Button>
    </form>
  );
}
