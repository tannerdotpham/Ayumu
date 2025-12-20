import React from 'react'
import { ChevronDownCircle } from 'lucide-react'
import { Message } from '@/app/page'
import LoadingMessages from './LoadingMessages'

interface Props
{
  messages: Message[]
  loading?: boolean
}

function Messages({messages=[], loading=false}: Props) 
{
  return (
    <div className={`flex flex-col p-5 ${messages.length > 0 ? "" : "min-h-full"}`}>     
      {!messages.length && (
        <div className='flex flex-col flex-1 items-center justify-end pr-1'>
          <div style={{ height: '520px' }}></div>
          <div className='flex flex-col space-y-10 items-center'>
            {!loading && (
              <>
                <p className='text-gray-500 animate-pulse'>Start a conversation!</p>
                <ChevronDownCircle size={64} className='animate-bounce text-gray-500'/>
              </>
            )}
            <div className='min-h-[40px] flex items-center justify-center'>
              <LoadingMessages loading={loading}/> 
            </div>
          </div>
        </div>
      )}
      <div className='max-w-3xl mx-auto w-full'>
      <div className='p-5 space-y-5'>
        {messages.map((message) => (
          <div key={message.id} className='space-y-5'>
            <div className="pl-48">
              <p className='message bg-blue-950 text-left ml-auto rounded-br-none'>
                {message.sender}
              </p>
            </div>

          <div className='pr-48'>
              <p className='message bg-gray-800 rounded-bl-none'>
                {message.response}
              </p>
            </div>
          </div>
        ))}
      </div>
      {messages.length > 0 && (
        <div className='mt-2 flex'>
          <LoadingMessages loading={loading}/>
        </div>
      )}
      </div>
    </div>
  )
}

export default Messages