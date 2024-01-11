import { useQuery } from "react-query";
import axios from "axios";
import { Post } from "@prisma/client";

// const getAllPosts = async () => {
//   const { data } = await axios.get(`../api/posts`);
//   return data as Post;
// };
// export function usePosts() {
//   return useQuery({
//     queryKey: ["posts"],
//     queryFn: () => getAllPosts(),
//   });
// }

// même chose mais plus concentré :

export function usePosts() {
  return useQuery("posts", async () => {
    const { data } = await axios.get(`../api/posts`);
    return data as Post;
  });
}
