import { API_BASE_URL } from "@/lib/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function createGroup(data: {
  name: string;
  description: string;
  banner: File;
}) {
  const response = await fetch(`${API_BASE_URL}/groups`, {
    method: "POST",
    body: JSON.stringify({
      ...data,
      members: Math.floor(Math.random() * 100),
      banner: "https://picsum.photos/640/480",
    }),
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
