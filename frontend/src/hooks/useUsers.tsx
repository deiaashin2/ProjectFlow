import { useSuspenseQuery } from "@tanstack/react-query";

export type User = {
  username: string;
  email: string;
  name: string;
  id: string;
  password: string;
  avatar: string;
  online: boolean;
  role: string;
  createdAt: string;
};

async function getUsers(): Promise<User[]> {
  const response = await fetch("https://67c79ebcc19eb8753e7a2f85.mockapi.io/api/v1/users");

  if (!response.ok) {
    throw new Error("Error fetching users");
  }
  return response.json();
}

export default function useUsers() {
  return useSuspenseQuery({ queryKey: ["users"], queryFn: getUsers });
}
