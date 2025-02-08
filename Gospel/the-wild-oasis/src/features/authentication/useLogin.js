import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const navigate = useNavigate();
  const { isPending: isLoading, mutate: login } = useMutation({
    mutationFn: async ({ email, password }) => {
      await loginApi({ email, password });
    },
    onSuccess: () => {
      console.log("SUCCESS");
      navigate("/dashboard");
    },
    onError: (error) => {
        toast.error(error.message)
    }
  });

  return { login, isLoading };
}
