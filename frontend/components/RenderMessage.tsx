type Props = {
  message: {name: string, data: string}
}

const RenderMessage = ({message}: Props) =>{
  return (
    <div className="rounded-md my-1 py-1 px-2 hover:bg-zinc-900">
      <p className='whitespace-pre-wrap break-words font-bold text-lg'>{message.name}</p>
      <p className="mx-2 whitespace-pre-wrap break-words">{message.data}</p>
    </div>
  )
}

export default RenderMessage