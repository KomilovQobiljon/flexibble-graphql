import { NextResponse, NextRequest } from "next/server";

export async function POST(request: Request, response: Response){
  console.log(request);

  return NextResponse.json({ result: "Answer" }, { status: 400 })
}