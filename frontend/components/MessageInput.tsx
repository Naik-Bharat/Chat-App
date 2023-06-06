import Image from "next/image"
import React, { useState } from "react";

type Props = {
  handleMessageSubmission: (data: string) => void
}

const MessageInput = ({ handleMessageSubmission }: Props) => {
  const [data, setData] = useState("");

  const handleDataChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData(event.target.value);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleMessageSubmission(data);
    setData("");
  }

  return (
    <form onSubmit={handleSubmit} className='flex justify-evenly h-10 my-8'>
      <input type='text' onChange={handleDataChange} value={data} placeholder='Type your message here...' autoFocus className='rounded-sm bg-zinc-100 dark:bg-zinc-900 px-2 py-2 flex-grow' />
      <button type='submit' className='ml-3 rounded-full py-2 px-3 bg-blue-800'>
        <Image src='/send-btn.svg' alt='Send Button' width={16} height={16} />
      </button>
    </form>
  )
}

export default MessageInput
