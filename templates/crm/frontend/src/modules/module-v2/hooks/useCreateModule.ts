import { useMutation, useQueryClient } from "@tanstack/react-query";
import { moduleService } from "module/services";
import { ModulePayload } from "module/types";
import { StatusType } from "shared/lib/types";

export const useCreateModule = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: ModulePayload) => {
      const res = await moduleService.create(payload);

      return res;
    },
    onSuccess: (res) => {
      if (res.status === StatusType.SUCCESS) {
        queryClient.invalidateQueries({ queryKey: ["module-list"] });
      }
    },
  });
};
