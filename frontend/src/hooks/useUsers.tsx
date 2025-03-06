import { useSuspenseQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "@/lib/constants";

export type User = {
  username: string;
  email: string;
  password: string;
  avatar: string;
  online: boolean;
  role: string;
  createdAt: string;
};

async function getUsers(): Promise<User[]> {
  const response = await fetch(`${API_BASE_URL}/users`);

  if (!response.ok) {
    throw new Error("Error fetching users");
  }
  return response.json();
}

export default function useUsers() {
  return useSuspenseQuery({ queryKey: ["users"], queryFn: getUsers });
}
