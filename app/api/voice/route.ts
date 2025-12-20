import { NextResponse } from "next/server";
import { AssemblyAI } from "assemblyai";
// import { GoogleGenerativeAI } from "@google/generative-ai";
import Groq from "groq-sdk";

export const runtime = 'nodejs';

export async function POST(request: Request)
{
    const form = await request.formData();
    const file = form.get('file') as File | null;

    if (!file) {
        return NextResponse.json({ error: 'No audio file provided' }, { status: 400 });
    }

    const assembly = new AssemblyAI({apiKey: process.env.ASSEMBLYAI_API_KEY!});
    const uploadUrl = await assembly.files.upload(await file.arrayBuffer());
    const transcription = await assembly.transcripts.transcribe({
        audio_url: uploadUrl,
    });
    
    // const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    // const model = genAI.getGenerativeModel({model: 'gemini-2.5-flash'});
    // const completion  = await model.generateContent({
    //     contents: [{role: 'user', parts: [{text: transcription.text ?? ''}]}],
    // });
    const groq = new Groq({
        apiKey: process.env.GROQ_API_KEY!,
    });
    
    const completion = await groq.chat.completions.create({
        messages: [
            {
                role: 'user',
                content: transcription.text ?? '',
            },
        ],
        model: 'allam-2-7b',
    });

    return NextResponse.json({
        text: transcription.text,
        reply: completion.choices[0]?.message?.content || '',
    });
}