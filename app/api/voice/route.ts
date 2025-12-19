import { NextResponse } from "next/server";
import { AssemblyAI } from "assemblyai";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const runtime = 'nodejs';

export async function POST(request: Request)
{
    const form = await request.formData();
    const file = form.get('file') as File | null;

    const client = new AssemblyAI({apiKey: process.env.ASSEMBLY_API_KEY!});
    const upload = await client.files.upload(await file?.arrayBuffer());

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
    const model = genAI.getGenerativeModel({model: 'gemini-2.5-flash'});
}