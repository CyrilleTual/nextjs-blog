// requète GET sur la route /api/catégorie


import { CATEGORIES } from "@/utils/categories"
import { NextResponse } from "next/server"
 

export const GET = async  () => {

    return  NextResponse.json(CATEGORIES, {status:200})

}