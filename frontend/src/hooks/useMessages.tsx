import { useQuery } from "@tanstack/react-query";
import { messagesData } from "@/lib/mock-data";

type Message = {
  username: string;
  avatar: string;
  timestamp: string;
  content: string;
};

async function getMessages(): Promise<Message[]> {
  // Replace with fetch to messages
  const messages = await new Promise<Message[]>((resolve) =>
    setTimeout(() => resolve(messagesData), 2500)
  );
  return messages;
}

function useMessages() {
  return useQuery({
    queryKey: ["messages"],
    queryFn: getMessages,
  });
}

export default useMessages;
