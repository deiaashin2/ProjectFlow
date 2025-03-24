import { API_BASE_URL } from "@/lib/constants";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export type Group = {
  id: string;
  userId: string;
  name: string;
  members: number;
  banner: string;
  description: string;
};

async function getGroups(query: string | undefined): Promise<Group[]> {
  const url = new URL(`${API_BASE_URL}/groups`);
  url.searchParams.append("name", query || "");

  const response = await fetch(url);

  if (!response.ok) {
    if (response.status === 404) {
      return [];
    }
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
