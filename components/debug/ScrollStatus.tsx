"use client";

import { useEffect } from "react";
import { useScrollStore } from "@/stores/scroll-store";

const ScrollStatus = () => {
  const { activeSection, targetSection, isScrolling } = useScrollStore();

  // 🧠 لاگ تغییرات در کنسول
  useEffect(() => {
    console.log("📍 Active section changed:", activeSection);
  }, [activeSection]);

  useEffect(() => {
    console.log("🎯 Target section changed:", targetSection);
  }, [targetSection]);

  useEffect(() => {
    console.log("🌀 Scrolling state:", isScrolling ? "Started" : "Stopped");
  }, [isScrolling]);

  return (
    <div className="fixed bottom-20 left-20 bg-black/95 text-white text-3xl p-6 rounded-md z-50 flex flex-col gap-4 ltr">
      <p>📍 Active: {activeSection ?? "None"}</p>
      <p>🎯 Target: {targetSection ?? "None"}</p>
      <p>🌀 Scrolling: {isScrolling ? "Yes" : "No"}</p>
    </div>
  );
};

export default ScrollStatus;
