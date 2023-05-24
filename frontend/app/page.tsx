'use client';

import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'
import Modal from '@/components/Modal';
import RenderMessage from '@/components/RenderMessage';
import { useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'] })

type message = {
  name: string
  data: string
}

export default function Home() {
  const [showModal, setShowModal] = useState(true);
  const [name, setName] = useState("");
  const [roomID, setRoomID] = useState("");

  const [msgList, setMsgList] = useState<message[]>([]);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080/ws/" + roomID);
    socket.onmessage = ({ data }) => {
      // const JSONData: message = {name: JSON.parse(data).name, data: JSON.parse(data).data};
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
      <div className='container flex flex-col'>
        {msgList.map((item, index) => (
          <RenderMessage message={item} />
        ))}
      </div>
    </div>
  )
}
