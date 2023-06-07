import Image from "next/image"
import React, { useRef, useState } from "react";

type Props = {
  handleMessageSubmission: (data: string) => void
}

const MessageInput = ({ handleMessageSubmission }: Props) => {
  const [data, setData] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const handleDataChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    // adjust height of textarea
    event.target.style.height = "auto";
    event.target.style.height = `${event.target.scrollHeight}px`;

    // change value of data
    setData(event.target.value);
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // handle submit when pressed enter
    if (event.key == "Enter" && !event.shiftKey) {
      event.preventDefault();
      formRef.current?.dispatchEvent(new Event('submit', {bubbles: true, cancelable: true}));
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleMessageSubmission(data);
    setData("");
  }

  return (
    <form onSubmit={handleSubmit} ref={formRef} className='flex justify-evenly my-8'>
      <textarea onChange={handleDataChange} onKeyDown={handleKeyPress} value={data} rows={1} placeholder='Type your message here...' autoFocus className='resize-none max-h-48 rounded-sm bg-zinc-100 dark:bg-zinc-900 px-2 py-2 h-auto flex-grow' />
      <button type='submit' className='ml-3 rounded-full self-end h-10 py-2 px-3 bg-blue-800'>
        <Image src='/send-btn.svg' alt='Send Button' width={16} height={16} />
      </button>
    </form>
  )
}

export default MessageInput
