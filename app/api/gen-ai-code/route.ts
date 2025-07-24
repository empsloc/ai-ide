import { GenAICode } from "@/configs/AIModel"
import { NextResponse } from "next/server"

export async function POST(req:any) {
    const {prompt} = await req.json()
     try {
        const result = await GenAICode(prompt)
        return NextResponse.json({result:JSON.parse(result)})
     } catch (e) {
      return NextResponse.json({error:e})
     }
}