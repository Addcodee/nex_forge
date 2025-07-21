import { ModuleDetails, ModuleList } from "module/types/ModuleType";
import { create } from "zustand";

type Details = ModuleDetails | null;

interface Store {
  modules: ModuleList;
  setModules: (value: ModuleList | ((value: ModuleList) => ModuleList)) => void;

  moduleDetails: ModuleDetails | null;
  setModuleDetails: (value: Details | ((value: Details) => Details)) => void;
}

export const useModuleStore = create<Store>()((set) => ({
  modules: {
    count: 0,
    results: [],
  },
  setModules: (value) => {
    set((state) => ({
      modules: typeof value === "function" ? value(state.modules) : value,
    }));
  },

  moduleDetails: null,
  setModuleDetails: (value) => {
    set((state) => ({
      moduleDetails:
        typeof value === "function" ? value(state.moduleDetails) : value,
    }));
  },
}));
