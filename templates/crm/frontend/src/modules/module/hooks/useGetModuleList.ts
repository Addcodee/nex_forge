import { useQuery } from "@tanstack/react-query";
import { moduleService } from "module/services/ModuleService";
import { useModuleStore } from "module/store/useModuleStore";
import { ModuleSortType } from "module/types/ModuleType";
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
