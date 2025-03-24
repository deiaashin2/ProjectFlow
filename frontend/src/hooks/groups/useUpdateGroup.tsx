import { Group } from "@/hooks/groups/useGroups";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_BASE_URL } from "@/lib/constants";

type UpdateGroup = {
  id: string;
  name: string;
  description: string;
  banner: string;
};

async function updateGroup(data: UpdateGroup): Promise<Group> {
  console.log(data);
  const res = await fetch(`${API_BASE_URL}/groups/${data.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to update group");
  }

  return res.json();
}

export default function useUpdateGroup() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateGroup,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["groups"] }),
  });
}
