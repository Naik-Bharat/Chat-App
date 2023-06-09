import Image from "next/image"
import React, { useEffect, useRef, useState } from "react";

type Props = {
  handleMessageSubmission: (data: string) => void
}

const MessageInput = ({ handleMessageSubmission }: Props) => {
  const [data, setData] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    adjustTextAreaHeight();
  }, [data]);

  const handleDataChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    // change value of data
    setData(event.target.value);
  }

  const adjustTextAreaHeight = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }

  const isPhone = () => {
    const userAgent = navigator.userAgent.toLocaleLowerCase();
    return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (isPhone()) {
      return;
    }
    // handle submit when pressed enter
    if (event.key == "Enter" && !event.shiftKey) {
      event.preventDefault();
      formRef.current?.dispatchEvent(new Event('submit', {bubbles: true, cancelable: true}));
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (data.trim() != "") {
      handleMessageSubmission(data);
      setData("");
    }
  }

  return (
    <form onSubmit={handleSubmit} ref={formRef} className='flex justify-evenly my-8'>
      <textarea onChange={handleDataChange} onKeyDown={handleKeyPress} ref={textAreaRef} value={data} rows={1} required placeholder='Type your message here...' autoFocus className='resize-none max-h-48 rounded-sm bg-zinc-100 dark:bg-zinc-900 px-2 py-2 h-auto flex-grow' />
      <button type='submit' className='ml-3 rounded-full self-end h-10 px-3'>
        <Image src='/send-btn.svg' alt='Send Button' width={40} height={40} />
      </button>
    </form>
  )
}

export default MessageInput
