import { useQuery } from "@tanstack/react-query";
import { moduleService } from "module_page/services/ModuleService";
import { useModuleStore } from "module_page/store/useModuleStore";
import { ModuleSortType } from "module_page/types/ModuleType";
import { OrderingType } from "shared/lib/types/OrderingType";
import { StatusType } from "shared/lib/types/StatusType";

export const useGetModuleList = (options: {
  page?: number;
  sort?: {
    sort: ModuleSortType;
    order: OrderingType;
  };
  search?: string;
}) => {
  const { setModuleList } = useModuleStore();
  return useQuery({
    queryKey: ["module-list", options?.page, options?.sort, options?.search],
    queryFn: async () => {
      const res = await moduleService.getAll(options);

      if (res.status === StatusType.SUCCESS) {
        setModuleList(res.data);
      }

      return res;
    },
  });
};
