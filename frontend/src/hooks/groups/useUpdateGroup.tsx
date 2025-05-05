import { Group } from "@/hooks/groups/useGroups";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_BASE_URL } from "@/lib/constants";

type UpdateGroup = {
  id: string;
  name: string;
  description: string;
  banner: File;
};

async function updateGroup(data: UpdateGroup): Promise<Group> {
  const formData = new FormData();
  formData.append("name", data.name);

  if (data.description) {
    formData.append("description", data.description);
  }

  if (data.banner) {
    formData.append("banner", data.banner);
  }

  const res = await fetch(`${API_BASE_URL}/api/groups/${data.id}/`, {
    method: "PUT",
    credentials: "include",
    body: formData,
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to update group");
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
