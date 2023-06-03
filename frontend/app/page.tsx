'use client';

import { Inter } from 'next/font/google'
import Modal from '@/components/Modal';
import RenderMessageList from '@/components/RenderMessageList';
import MessageInput from '@/components/MessageInput';
import Header from '@/components/Header';
import { useEffect, useRef, useState } from 'react';

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

  const socketRef = useRef<WebSocket | null>(null);

  const addNewMessage = (data: string) => {
    if (socketRef.current) {
      socketRef.current.send(JSON.stringify({name: name, data: data}));
      setMsgList((msgList => [...msgList, {name: name, data: data}]));
    }
  }

  useEffect(() => {
    if (roomID) {
    socketRef.current = new WebSocket("ws://localhost:8080/ws/" + roomID);
    socketRef.current.onmessage = ({ data }) => {
      setMsgList((msgList => [...msgList, {name: JSON.parse(data).name, data: JSON.parse(data).data}]));
    }
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
          <MessageInput handleMessageSubmission={addNewMessage} />
        </div>
      )
      }

    </div>
  )
}
