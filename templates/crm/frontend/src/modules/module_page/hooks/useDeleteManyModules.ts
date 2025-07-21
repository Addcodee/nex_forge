import { useMutation, useQueryClient } from "@tanstack/react-query";
import { moduleService } from "module/services/ModuleService";
import { StatusType } from "shared/lib/types/StatusType";

export const useDeleteManyModules = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (ids: string[]) => {
      const errors: string[] = [];
      for (const id of ids) {
        const res = await moduleService.remove(id);

        if (res.status === StatusType.ERROR) {
          errors.push(id);
        }
      }
      return errors;
    },
    onSuccess: (errors) => {
      if (Array.isArray(errors) && errors.length === 0) {
        queryClient.invalidateQueries({ queryKey: ["module-list"] });
      }
    },
  });
};
