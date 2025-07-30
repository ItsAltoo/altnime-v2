import { create } from "zustand";

interface YearState {
  selectedYear: number;
  setYear: (year: number) => void;
}

export const useYearStore = create<YearState>((set) => ({
  selectedYear: new Date().getFullYear(), // default tahun sekarang
  setYear: (year) => set({ selectedYear: year }),
}));
