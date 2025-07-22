import { useQuery } from "@tanstack/react-query";
import { moduleService } from "module_page/services";
import { useModuleStore } from "module_page/store";
import { ErrorMessages } from "shared/lib/consts";
import { StatusType } from "shared/lib/types";

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
