import { API_BASE_URL } from "@/lib/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Group } from "./useGroups";

async function deleteGroup(groupId: string): Promise<Group> {
  const response = await fetch(`${API_BASE_URL}/api/groups/${groupId}/`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`Error deleting group ${groupId}`);
  }

  return response.json();
}

export default function useDeleteGroup() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
  });
}
