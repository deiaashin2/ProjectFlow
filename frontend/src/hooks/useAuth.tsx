import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "@/lib/constants";

type User = {
  id: number;
  name: string;
  email: string;
};

async function getAuth(): Promise<{
  isAuthenticated: boolean;
  user: User | null;
}> {
  const response = await fetch(`${API_BASE_URL}/api/auth`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error fetcing auth status");
  }

  return response.json();
}

const useAuth = () => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["auth-status"],
    queryFn: getAuth,
  });

  return {
    isAuthenticated: data?.isAuthenticated ?? false,
    user: data?.user ?? null,
    error: error ?? null,
    isError,
    isPending,
  };
};

export default useAuth;
