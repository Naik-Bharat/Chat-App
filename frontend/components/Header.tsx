import Link from "next/link"

const Header = () => {
  return (
    <header className="py-7">
      <div className='flex justify-between'>
        <Link href='/' className='logo text-2xl font-bold'>Chat App</Link>
        <Link href='https://github.com/Naik-Bharat/chat-app' target={"_blank"}>
          <button className='rounded-md bg-blue-800 px-3 py-1 text-white'>Star project on Github</button>
        </Link>
      </div>
    </header>
  )
}

export default Header