import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export default function useEditCabin() {
  const queryClient = useQueryClient();
  const { isPending: isEditingCabin, mutate: editCabin } = useMutation({
    mutationFn: ({ newCabin, id }) => createEditCabin(newCabin, id),
    onSuccess: (data) => {
      console.log({ creationData: data });
      toast.success("Cabin edited successfully");

      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isEditingCabin, editCabin };
}
