import { useQuery } from "react-query";
import axios from "axios";


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
    return data;
  });
}

const getPostByCatSlug = async (slug: string) => {
  const { data } = await axios.get(`../api/posts/byCategory/${slug}`);

  return data 
};

export function usePostsByCategory(slug: string) {
 return useQuery({
   queryKey: ["post", slug],
   queryFn: () => getPostByCatSlug(slug),
   enabled: !!slug, // execute que si on a un slug
 });
}