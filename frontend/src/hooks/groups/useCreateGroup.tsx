import { API_BASE_URL } from "@/lib/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function createGroup(name: string) {
  const response = await fetch(`${API_BASE_URL}/api/groups/`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({ name: name }),
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error creating group");
  }

  return response.json();
}

export default function useCreateGroup() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createGroup,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["groups"] }),
  });
}
