import { useQuery } from "@tanstack/react-query";
import { moduleService } from "module/services";
import { useModuleStore } from "module/store";
import { ModuleSearchType, ModuleSortType } from "module/types";
import { OrderingType } from "shared/lib/types";
import { StatusType } from "shared/lib/types";

export const useGetModuleList = (options: {
  page?: number;
  sort?: {
    sort: ModuleSortType;
    order: OrderingType;
  };
  search?: ModuleSearchType;
  pageSize?: number;
}) => {
  const { setModuleList } = useModuleStore();
  return useQuery({
    queryKey: [
      "module-list",
      options?.page,
      options?.sort,
      options?.search,
      options.pageSize,
    ],
    queryFn: async () => {
      const res = await moduleService.getAll(options);

      if (res.status === StatusType.SUCCESS) {
        setModuleList(res.data);
      }

      return res;
    },
  });
};
