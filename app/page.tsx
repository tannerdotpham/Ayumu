'use client'

import Image from "next/image";
import { SettingsIcon } from "lucide-react";
import Messages from "@/components/Messages";
import Recorder, { mimeType } from "@/components/Recorder";
import { useRef } from "react";
import { useFormState } from "react-dom";

export default function Home() {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const submitButtonRef = useRef<HTMLInputElement | null>(null);
  // const [state, formAction] = useFormState(run, initialState)
  const uploadAudio = (blob: Blob) => 
    {
      const file = new File([blob], 'audio.webm', {type: mimeType})

      if (fileRef.current)
      {
        const dataTransfer = new DataTransfer()
        dataTransfer.items.add(file)

        if (submitButtonRef.current)
        {
          submitButtonRef.current.click()
        }
      }
    }
  return (
    <main className="bg-black h-screen overflow=y=auto">
      {/* Header */}
      <header className="flex justify-between fixed top-0 text-white w-full p-5">
        <Image 
          alt="Logo"
          src="https://i.imgur.com/cwGu448.jpeg" 
          height={50} 
          width={50}
        />

        <SettingsIcon 
          size={40}
          className="p-2 m-2 rounded-full cursor-pointer bg-white text-black transition-all ease-in-out duration-150 hover:bg-purple-500 hover:text-white"
        />
      </header>
      {/* Form */}

      <form className="flex flex-col bg-black">
        <div className="flex-1 bg-gradient-to-b from-gray-950">
          <Messages />
          
        </div>

        <input type="file" name='audio' hidden ref={fileRef}/>
        <button type="submit" hidden name='submit' ref={submitButtonRef}/>
        <div className="fixed bottom-0 w-full overflow-hidden bg-black rounded=t-3xl">
          <Recorder uploadAudio={uploadAudio}/>

          {/* Voice Synthesizer - voice of Siri */}

        </div>
      </form>
    </main>
  );
}
