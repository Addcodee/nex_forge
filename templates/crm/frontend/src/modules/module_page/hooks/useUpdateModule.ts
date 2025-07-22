import { useMutation, useQueryClient } from "@tanstack/react-query";
import { moduleService } from "module_page/services";
import { ModulePayload } from "module_page/types";
import { ErrorMessages } from "shared/lib/consts";
import { StatusType } from "shared/lib/types";

export const useUpdateModule = (id: string | null) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: ModulePayload) => {
      if (id === null) {
        return {
          status: StatusType.ERROR,
          error: ErrorMessages.NoIdFound,
        };
      }

      const res = await moduleService.update(id, payload);

      return res;
    },

    onSuccess: (res) => {
      if (res.status === StatusType.SUCCESS) {
        queryClient.invalidateQueries({ queryKey: ["module-list"] });
      }
    },
  });
};
