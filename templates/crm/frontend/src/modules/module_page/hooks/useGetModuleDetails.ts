import { useQuery } from "@tanstack/react-query";
import { moduleService } from "module/services/ModuleService";
import { useModuleStore } from "module/store/useModuleStore";
import ErrorMessages from "shared/lib/consts/errors";
import { StatusType } from "shared/lib/types/StatusType";

export const useGetModuleDetails = (id: string | undefined) => {
  const { setModuleDetails } = useModuleStore();

  return useQuery({
    queryKey: [`module-list-${id}`],
    queryFn: async () => {
      if (!id) {
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
