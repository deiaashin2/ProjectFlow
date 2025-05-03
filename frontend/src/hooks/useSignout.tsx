import { API_BASE_URL } from "@/lib/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function signout() {
  const response = await fetch(`${API_BASE_URL}/api/signout`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error signing out");
  }

  return response.json();
}

export default function useSignout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: signout,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["auth-status"] }),
  });
}
