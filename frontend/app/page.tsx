'use client';

import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'
import Modal from '@/components/Modal';
import { useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [showModal, setShowModal] = useState(true);
  const [name, setName] = useState("");
  const [roomID, setRoomID] = useState("");

  const [msgList, setMsgList] = useState<string[]>([]);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080/ws/" + roomID);
    socket.onmessage = ({ data }) => {
      setMsgList((msgList => [...msgList, data]));
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
      {msgList.map((item, index) => (
        <div key={index}>{item}</div>
      ))}
    </div>
  )
}
