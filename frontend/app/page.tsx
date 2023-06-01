'use client';

import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'
import Modal from '@/components/Modal';
import RenderMessageList from '@/components/RenderMessageList';
import { useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'] })

export type Message = {
  name: string
  data: string
}

export default function Home() {
  const [showModal, setShowModal] = useState(true);
  const [name, setName] = useState("");
  const [roomID, setRoomID] = useState("");

  const [msgList, setMsgList] = useState<Message[]>([]);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080/ws/" + roomID);
    socket.onmessage = ({ data }) => {
      setMsgList((msgList => [...msgList, {name: JSON.parse(data).name, data: JSON.parse(data).data}]));
    }
  }, [roomID])

  const handleFormSubmit = (submittedName: string, submittedRoomID: string) => {
    setName(submittedName);
    setRoomID(submittedRoomID);
    setShowModal(false);
  }

  return (
    <div className='mx-6'>
      {showModal && (
        <Modal handleSubmit={handleFormSubmit} />
      )}
      <RenderMessageList msgList={msgList} />

      {!showModal && (
        <div className='fixed bottom-8 inset-x-0 flex mx-8 justify-evenly'>
          <input type='text' placeholder='Type your message here...' autoFocus className='rounded-sm bg-zinc-100 dark:bg-zinc-900 px-2 py-2 w-full' />
          <button className='ml-3 rounded-full py-2 px-3 bg-blue-800'>
            <Image src='/send-btn.svg' alt='Send Button' width={16} height={16} />
          </button>
        </div>
      )}
    </div>
  )
}
