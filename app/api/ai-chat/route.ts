import { chatSession } from "@/configs/AIModel"
import { NextResponse } from "next/server"

export async function POST(req:any) {
    const {prompt} = await req.json()

    try{
        const result  = await chatSession(prompt)
    
        return NextResponse.json({result:result})
    }catch(e){
        return NextResponse.json({error:e})
    }
    
}