import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export function useSetings() {
  const {
    isPending: isLoading,
    data: settings,
    error,
  } = useQuery({ queryKey: ["GET setting"], queryFn: getSettings });

  return { isLoading, settings, error };
}
