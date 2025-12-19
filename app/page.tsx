'use client'

import Image from "next/image";
import { SettingsIcon } from "lucide-react";
import Messages from "@/components/Messages";
import Recorder, { mimeType } from "@/components/Recorder";
import { useRef, useState } from "react";
import { useFormState } from "react-dom";
import Osaka from '@/img/image.png'

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
  const submitButtonRef = useRef<HTMLInputElement | null>(null);
  // const [state, formAction] = useFormState(run, initialState)
  const [messages, setMessages] = useState<Message[]>([]);

  const uploadAudio = async (blob: Blob) => 
    {
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
    }
  return (
    <main className="bg-black h-screen overflow=y=auto">
      {/* Header */}
      <header className="flex justify-between fixed top-0 text-white w-full p-5">
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

      <form className="flex flex-col bg-black">
        <div className="flex-1 bg-gradient-to-b from-gray-950">
          <Messages messages={messages}/>
        </div>

        <input type="file" name='audio' hidden ref={fileRef}/>
        <button type="submit" hidden ref={submitButtonRef}/>
        <div className="fixed bottom-0 w-full overflow-hidden bg-black rounded=t-3xl">
          <Recorder uploadAudio={uploadAudio}/>

          {/* Voice Synthesizer - voice of Siri */}

        </div>
      </form>
    </main>
  );
}
