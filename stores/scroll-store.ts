import { create } from "zustand";

interface ScrollState {
  activeSection: string | null; // سکشن فعلی
  isScrolling: boolean; // آیا در حال اسکرول خودکار هستیم؟
  targetSection: string | null; // سکشنی که به سمتش می‌ریم
  setActiveSection: (id: string | null) => void;
  setIsScrolling: (value: boolean) => void;
  setTargetSection: (id: string | null) => void;
}

export const useScrollStore = create<ScrollState>((set) => ({
  activeSection: null,
  isScrolling: false,
  targetSection: null,
  setActiveSection: (id) => set({ activeSection: id }),
  setIsScrolling: (value) => set({ isScrolling: value }),
  setTargetSection: (id) => set({ targetSection: id }),
}));
