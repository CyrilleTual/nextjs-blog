import axios from "axios";
import { useQuery } from "react-query";
import { CommentWithUser } from "@/types";

export function useComments(postSlug : string) {
  return useQuery("comments", async () => {
    const { data } = await axios.get(`../api/comments?postSlug=${postSlug}`);
    return data as CommentWithUser[];
  });
}
