import { API_BASE_URL } from "@/lib/constants";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export type Group = {
  id: string;
  userId: string;
  name: string;
  members: number;
  banner: string | null;
  mime_type: string | null;
  description: string;
};

async function getGroups(query: string | undefined): Promise<Group[]> {
  const url = new URL(`${API_BASE_URL}/api/groups/`);

  if (query) {
    url.searchParams.append("name", query);
  }

  const response = await fetch(url, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error fetching groups");
  }

  return response.json();
}

export default function useGroups(query: string | undefined) {
  return useQuery({
    queryKey: ["groups", { query }],
    queryFn: () => getGroups(query),
    retry: 1,
    placeholderData: keepPreviousData,
  });
}
