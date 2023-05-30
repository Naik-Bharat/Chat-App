import { Message } from "@/app/page"

//renders list of messages
const RenderMessageList = ({msgList}: {msgList: Message[]}) => {
  return (
    <div className='container flex flex-col'>
      {msgList.map((item, index) => (
        <RenderMessage message={item} />
      ))}
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