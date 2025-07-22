import { useMutation, useQueryClient } from "@tanstack/react-query";
import { moduleService } from "module/services/ModuleService";
import { StatusType } from "shared/lib/types/StatusType";

export const useDeleteModule = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await moduleService.remove(id);

      return res;
    },
    onSuccess: (res) => {
      if (res.status === StatusType.SUCCESS) {
        queryClient.invalidateQueries({ queryKey: ["module-list"] });
      }
    },
  });
};
