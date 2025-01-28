import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export default function useCreateCabin() {
  const queryClient = useQueryClient();
  const { isPending: isCreatingCabin, mutate: createCabin } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: (data) => {
      console.log({ creationData: data });
      toast.success("Cabin created successfully");

      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isCreatingCabin, createCabin };
}
