import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";
import toast from "react-hot-toast";

export function useUpdateSetting() {
  const queryClient = useQueryClient();

  const { isPending: isUpdating, mutate: updateSetting } = useMutation({
    mutationFn: updateSettingApi,
    onError: (err) => {
      toast.error(err.message, {
        id: "PATCH setting",
      });
    },
    onSuccess: (data) => {
      console.log({ updatedSetting: data });

      toast.success("Settings updated successfully!", {
        id: "PATCH setting",
      });

      queryClient.invalidateQueries({ queryKey: ["GET setting"] });
    },
  });

  return { isUpdating, updateSetting };
}
