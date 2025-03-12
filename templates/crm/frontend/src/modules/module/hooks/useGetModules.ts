import { useQuery } from "@tanstack/react-query";
import { moduleService } from "module/services/ModuleService";
import { useModuleStore } from "module/store/useModuleStore";
import { ModuleSortType } from "module/types/ModuleType";
import { OrderType } from "shared/lib/types/OrderType";
import { StatusType } from "shared/lib/types/StatusType";

export const useGetModules = (
  page: number,
  sort: {
    sort: ModuleSortType;
    order: OrderType;
  },
  search: string
) => {
  const { setModules } = useModuleStore();
  return useQuery({
    queryKey: ["module-list", page, sort, search],
    queryFn: async () => {
      const res = await moduleService.getAll(page, sort, search);

      if (res.status === StatusType.SUCCESS) {
        setModules(res.data);
      }

      return res;
    },
  });
};
