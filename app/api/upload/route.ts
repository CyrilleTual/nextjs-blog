import { NextResponse } from "next/server";
import path from 'path';
import { writeFile } from "fs/promises";  // import depuis / promesses imprtant

export const POST = async (req: Request) =>{

    // on recupère le fichier depuis le requète
    const data = await req.formData()
    const file: File | null = data.get("file") as unknown as File; 

    // if there is no file 
    if (!file){
        return NextResponse.json ({message: "No file!"}, {status: 500})  
    }

    // on decompose les composants du file reçu pour le mettre dans le bon dossier 
    const bytes =  await file.arrayBuffer();
    const buffer = Buffer.from(bytes)

    // url de stockage l'image 
    const imageUrl =`/img/${new Date().getTime()}_${file.name}`
    const imagePath = path.join(process.cwd(),`/public${imageUrl}`)

    // écriture du fichier : 
    try {
        await writeFile (imagePath, buffer) 
        return NextResponse.json({ imageUrl }, { status: 200 }); 
    } catch (error) {
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });  
    }

}