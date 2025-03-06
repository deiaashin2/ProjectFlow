import { useSuspenseQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "@/lib/constants";

type Group = {
  id: string;
  userId: string;
  name: string;
  members: number;
  banner: string;
  description: string;
};

async function getGroups(): Promise<Group[]> {
  const response = await fetch(`${API_BASE_URL}/groups`);

  if (!response.ok) {
    throw new Error("Error fetching groups");
  }

  return response.json();
}

export default function useGroups() {
  return useSuspenseQuery({ queryKey: ["groups"], queryFn: getGroups });
}
