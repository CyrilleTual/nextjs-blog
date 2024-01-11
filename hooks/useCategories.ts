import axios from "axios";
import { useQuery } from "react-query";
import { Category } from "@prisma/client";

export function useCategories(){
    return useQuery('categories', async ()=>{
        const {data} = await axios.get('../api/categories');
        return data as Category[];
    })
}