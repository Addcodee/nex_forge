import { ModuleDetails, ModuleList } from "module_page/types/ModuleType";
import { create } from "zustand";

type Details = ModuleDetails | null;

interface Store {
  moduleList: ModuleList;
  setModuleList: (
    value: ModuleList | ((value: ModuleList) => ModuleList)
  ) => void;

  moduleDetails: ModuleDetails | null;
  setModuleDetails: (value: Details | ((value: Details) => Details)) => void;
}

export const useModuleStore = create<Store>()((set) => ({
  moduleList: {
    count: 0,
    results: [],
  },
  setModuleList: (value) => {
    set((state) => ({
      moduleList: typeof value === "function" ? value(state.moduleList) : value,
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
