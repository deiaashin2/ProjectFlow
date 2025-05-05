import { User } from "@/hooks/useUsers";
import { API_BASE_URL } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";

async function getMembers(groupId: string): Promise<User[]> {
  const url = new URL(`${API_BASE_URL}/api/groups/${groupId}/members/`);

  const response = await fetch(url, {
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error fetching groups");
  }

  return response.json();
}

export default function useMembers(groupId: string) {
  return useQuery({
    queryKey: ["groups"],
    queryFn: () => getMembers(groupId),
  });
}
