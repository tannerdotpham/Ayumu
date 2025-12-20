'use client'

import Image from "next/image";
import { SettingsIcon } from "lucide-react";
import Messages from "@/components/Messages";
import Recorder, { mimeType } from "@/components/Recorder";
import { useRef, useState } from "react";
import { useFormState } from "react-dom";
import Osaka from '@/img/image.png'
import TTS from "./api/voice/TTS";

const initialState =
{
  sender: '',
  response: '',
  id: ''
}

export type Message =
{
  sender: string
  response: string
  id: string
}

export default function Home() {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const submitButtonRef = useRef<HTMLButtonElement | null>(null);
  // const [state, formAction] = useFormState(run, initialState)
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const uploadAudio = async (blob: Blob) => 
    {
      setLoading(true);
      try {
        const form = new FormData();
        form.append('file', blob, 'audio.webm');
        
        const res = await fetch('/api/voice', { method: 'POST', body: form });
        const data = await res.json();
        if (data.error) {
          console.error(data.error);
          return;
        }
        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            sender: data.text ?? "",
            response: data.reply ?? "",
          },
        ]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  return (
    <main className="bg-black h-screen flex flex-col overflow-hidden">
      {/* Header */}
      <header className="flex justify-between fixed top-0 text-white w-full p-5 z-10 bg-gray-950">
        <Image 
          alt="Logo"
          src={Osaka} 
          height={50} 
          width={50}
        />

        <SettingsIcon 
          size={40}
          className="p-2 m-2 rounded-full cursor-pointer bg-gray-900 text-white  transition-all ease-in-out duration-150 hover:bg-black hover:text-white"
        />
      </header>
      {/* Form */}

      <form className="flex flex-col bg-black flex-1 min-h-0">
        <div className="flex-1 bg-gradient-to-b from-gray-950 overflow-y-auto pt-20 pb-96">
          <Messages messages={messages} loading={loading}/>
        </div>

        <input type="file" name='audio' hidden ref={fileRef}/>
        <button type="submit" hidden ref={submitButtonRef}/>
        <div className="fixed bottom-0 w-full overflow-hidden bg-black rounded=t-3xl">
          <Recorder uploadAudio={uploadAudio} loading={loading}/>
          {/* Voice Synthesizer */}
          <div>
            <TTS />
          </div>

        </div>
      </form>
    </main>
  );
}
