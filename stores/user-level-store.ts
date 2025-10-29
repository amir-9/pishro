import { create } from "zustand";

interface UserLevelState {
  level: string | null;
  setLevel: (level: string) => void;
}

export const useUserLevelStore = create<UserLevelState>((set) => ({
  level: null,
  setLevel: (level) => set({ level }),
}));
