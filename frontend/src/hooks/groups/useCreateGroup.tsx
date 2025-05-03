import { API_BASE_URL } from "@/lib/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function createGroup(data: {
  name: string;
  description: string;
  banner: File;
}) {
  const response = await fetch(`${API_BASE_URL}/api/groups`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(data),
    headers: { "content-type": "application/json" },
  });

  if (!response.ok) {
    throw new Error("Error creating group");
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
