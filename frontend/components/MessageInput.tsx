import Image from "next/image"

const MessageInput = () => {
  return (
    <div className='flex justify-evenly h-10 mb-8'>
      <input type='text' placeholder='Type your message here...' autoFocus className='rounded-sm bg-zinc-100 dark:bg-zinc-900 px-2 py-2 flex-grow' />
      <button className='ml-3 rounded-full py-2 px-3 bg-blue-800'>
        <Image src='/send-btn.svg' alt='Send Button' width={16} height={16} />
      </button>
    </div>
  )
}

export default MessageInput