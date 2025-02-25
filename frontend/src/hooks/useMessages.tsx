import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { messagesData } from "@/lib/mock-data";

export type Message = {
  username: string;
  avatar: string;
  timestamp: string;
  content: string;
};

const MESSAGE_LIMIT = 15;

export function useMessages() {
  return useSuspenseInfiniteQuery({
    queryKey: ["messages"],
    queryFn: getMessages,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
}

async function getMessages({
  pageParam,
}: {
  pageParam: number;
}): Promise<{ data: Message[]; currentPage: number; nextPage: number | null }> {
  // Replace with fetch to messages passing in cursor

  return new Promise((resolve) =>
    setTimeout(() => {
      resolve({
        data: messagesData.slice(pageParam, pageParam + MESSAGE_LIMIT),
        currentPage: pageParam,
        nextPage:
          pageParam + MESSAGE_LIMIT < messagesData.length
            ? pageParam + MESSAGE_LIMIT
            : null,
      });
    }, 1500)
  );
}

export default useMessages;
