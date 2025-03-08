import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Store {
  dashboardCollapsed: boolean;
  setDashboardCollapsed: (
    value: boolean | ((value: boolean) => boolean)
  ) => void;

  dashboardHidden: boolean;
  setDashboardHidden: (value: boolean | ((value: boolean) => boolean)) => void;
}

export const useGlobalStore = create<Store>()(
  persist(
    (set) => ({
      dashboardCollapsed: false,
      setDashboardCollapsed: (args) => {
        set((state) => ({
          dashboardCollapsed:
            typeof args === "function" ? args(state.dashboardCollapsed) : args,
        }));
      },
      dashboardHidden: false,
      setDashboardHidden: (args) => {
        set((state) => {
          set({ dashboardCollapsed: false });
          return {
            dashboardHidden:
              typeof args === "function" ? args(state.dashboardHidden) : args,
          };
        });
      },
    }),
    {
      name: "global-store",
      partialize: (state) => ({
        dashboardCollapsed: state.dashboardCollapsed,
      }),
    }
  )
);
