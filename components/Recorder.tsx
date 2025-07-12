import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import activeSiri from '@/img/siri.gif'
import inactiveSiri from '@/img/inactive.png'
import { useFormStatus } from 'react-dom'

export const mimeType = 'audio/webm'

function Recorder({uploadAudio}: { uploadAudio: (blob: Blob) => void}) {
  const mediaRecorder = useRef<MediaRecorder | null>(null)
  const {pending} = useFormStatus()
  const [permission, setPermission] = useState(false)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [recordingStatus, setRecordingStatus] = useState('inactive')
  const [audioChunks, setAudioChunks] = useState<Blob[]>([])
  
  useEffect(() => 
  {
    getMicPermission()
  }, [])
  const getMicPermission = async() => 
  {
    if ("MediaRecorder" in window)
    {
      try
      {
          const streamData = await navigator.mediaDevices.getUserMedia(
            {
            audio: true,
            video: false
          })
          setPermission(true),
          setStream(streamData)
      } 
      catch (err: any)
      {
        alert(err.message)
      }
    }
    else
      {
        alert("The MediaRecorder API is not supported for your browser")
      }
  }
    const startRec = async () => 
    {
      if (stream === null || pending) return
      
      setRecordingStatus('recording')

      const media = new MediaRecorder(stream, {mimeType})
      mediaRecorder.current = media
      mediaRecorder.current.start()

      let localAudioChunks: Blob[] = []
      mediaRecorder.current.ondataavailable = (event) =>
      {
        if (typeof event.data === 'undefined' || event.data.size === 0) return
        
        localAudioChunks.push(event.data)
      }
      setAudioChunks(localAudioChunks)
    }

    const stopRec = async () =>
    {
      if (mediaRecorder.current === null || pending) return
      
      setRecordingStatus('inactive')
      mediaRecorder.current.stop()
      mediaRecorder.current.onstop = () => 
      {
        const audioBlob = new Blob(audioChunks, {type: mimeType})
        const audioUrl = URL.createObjectURL(audioBlob)
        uploadAudio(audioBlob)
        setAudioChunks([])
      }
    }
  return (
    <div className='flex items-center justify-center text-white'>
      {!permission && (
        <button onClick={getMicPermission}></button>
      )}

      {pending && (
        <Image 
          src={activeSiri}
          height={350}
          width={350}
          priority
          alt='Recording'
          className='assistant grayscale'
        />
      )}
    

      {permission && recordingStatus === 'inactive' && !pending && (
        <Image
          src={inactiveSiri}
          height={350}
          width={350}
          onClick={startRec}
          priority={true}
          alt='Not Recording'
          className='assistant cursor-pointer hover:scale-110 duration-150 transition-all ease-in-out'
        />
      )}

      {recordingStatus === 'recording' && (
        <Image 
          src={activeSiri}
          height={350}
          width={350}
          onClick={stopRec}
          priority={true}
          alt='Recording'
          className='grayscale cursor-pointer hover:scale-110 duration-150 transition-all ease-in-out'
        />
      )}
    
    </div>
  )
}

export default Recorder