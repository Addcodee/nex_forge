import { useQuery } from "@tanstack/react-query";
import { moduleService } from "module/services";
import { useModuleStore } from "module/store";
import { ErrorMessages } from "shared/lib/consts";
import { StatusType } from "shared/lib/types";

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
