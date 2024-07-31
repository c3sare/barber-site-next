import { create } from "zustand";

type Bar = "components" | "settings" | null;

type Store = {
  currentOpenBar: Bar;
  toggleBar: (bar: Bar) => void;
  closeBar: () => void;
  openBar: (bar: Bar) => void;
  isOpenLayersBar: boolean;
  toggleLayersBar: () => void;
};

export const useEditorState = create<Store>()((set) => ({
  currentOpenBar: null,
  toggleBar: (bar: Bar) =>
    set((state) => ({
      currentOpenBar:
        state.currentOpenBar !== bar || state.currentOpenBar === null
          ? bar
          : null,
    })),
  closeBar: () => set({ currentOpenBar: null }),
  openBar: (bar: Bar) => set({ currentOpenBar: bar }),
  isOpenLayersBar: false,
  toggleLayersBar: () =>
    set((state) => ({ isOpenLayersBar: !state.isOpenLayersBar })),
}));
