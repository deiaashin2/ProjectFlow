import { API_BASE_URL } from "@/lib/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type invite = {
  id : string;
  email : string;
}

async function invite(data : invite) {
  const response = await fetch(`${API_BASE_URL}/api/groups/${data.id}/invite/`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({ email: data.email }),
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error inviting member");
  }

  return response.json();
}

export default function useInvite() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: invite,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["groups", ] }),
  });
}
