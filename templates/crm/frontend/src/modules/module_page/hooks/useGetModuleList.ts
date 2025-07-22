import { useQuery } from "@tanstack/react-query";
import { moduleService } from "module_page/services";
import { useModuleStore } from "module_page/store";
import { ModuleSortType } from "module_page/types";
import { OrderingType } from "shared/lib/types";
import { StatusType } from "shared/lib/types";

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
