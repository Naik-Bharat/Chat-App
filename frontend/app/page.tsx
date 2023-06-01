'use client';

import { Inter } from 'next/font/google'
import Modal from '@/components/Modal';
import RenderMessageList from '@/components/RenderMessageList';
import MessageInput from '@/components/MessageInput';
import Header from '@/components/Header';
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
    <div>
      {showModal ? (
        <Modal handleSubmit={handleFormSubmit} />
        ): (
        <div className='flex flex-col h-screen'>
          <Header />
          <RenderMessageList msgList={msgList} className='flex-grow' />
          <MessageInput />
        </div>
      )
      }

    </div>
  )
}
