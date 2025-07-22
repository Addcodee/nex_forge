import { useQuery } from "@tanstack/react-query";
import { moduleService } from "module_page/services/ModuleService";
import { useModuleStore } from "module_page/store/useModuleStore";
import ErrorMessages from "shared/lib/consts/errors";
import { StatusType } from "shared/lib/types/StatusType";

export const useGetModuleDetails = (id: string | null) => {
  const { setModuleDetails } = useModuleStore();

  return useQuery({
    queryKey: [`module-list-${id}`],
    queryFn: async () => {
      if (id === null) {
        return {
          status: StatusType.ERROR,
          error: ErrorMessages.NoIdFound,
        };
      }

      const res = await moduleService.getById(id);

      if (res.status === StatusType.SUCCESS) {
        setModuleDetails(res.data);
      }

      return res;
    },
    enabled: id !== null,
  });
};
