import { Message } from "@/app/page"
import { useEffect, useRef } from "react"

//renders list of messages
const RenderMessageList = ({ msgList }: {msgList: Message[]}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const contaierElement = containerRef.current;
    const lastMessageElement = contaierElement?.lastChild as HTMLDivElement;

    if (lastMessageElement) {
      lastMessageElement.scrollIntoView();
    }
  }, [msgList])
  return (
    <div>
      <div ref={containerRef} className='container flex flex-col'>
        {msgList.map((item, index) => (
          <RenderMessage key={index} message={item} />
        ))}
      </div>
    </div>
  )
}

// renders a single message
const RenderMessage = ({ message }: {message: Message}) =>{
  return (
    <div className="rounded-sm my-1 py-1 px-2 hover:bg-zinc-100 dark:hover:bg-zinc-900">
      <p className='whitespace-pre-wrap break-words font-bold text-lg'>{message.name}</p>
      <p className="mx-2 whitespace-pre-wrap break-words">{message.data}</p>
    </div>
  )
}

export default RenderMessageList
