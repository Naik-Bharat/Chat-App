import { Message } from "@/app/page"

//renders list of messages
const RenderMessageList = ({ msgList, className }: {msgList: Message[], className: string}) => {
  return (
    <div className={className}>
      <div className='container flex flex-col'>
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
    <div className="rounded-sm my-1 py-1 px-2 hover:bg-zinc-900">
      <p className='whitespace-pre-wrap break-words font-bold text-lg'>{message.name}</p>
      <p className="mx-2 whitespace-pre-wrap break-words">{message.data}</p>
    </div>
  )
}

export default RenderMessageList