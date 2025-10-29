"use client";

import { useEffect } from "react";
import { useUserLevelStore } from "@/stores/user-level-store";

/**
 * وقتی سطح کاربر تغییر کند، بعد از ۰.۵ ثانیه به سکشن StepsSection اسکرول می‌کند.
 */
export const useScrollToSteps = () => {
  const { level } = useUserLevelStore();

  useEffect(() => {
    if (!level) return;

    const timeout = setTimeout(() => {
      const section = document.getElementById("stepsSection");
      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 500); // ⏳ تاخیر نیم‌ثانیه‌ای

    // 🧹 پاک کردن تایمر در زمان unmount یا تغییر سطح مجدد
    return () => clearTimeout(timeout);
  }, [level]);
};
