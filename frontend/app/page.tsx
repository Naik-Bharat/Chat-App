'use client';

import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'
import Modal from '@/components/Modal';
import { useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080/ws/123");
    socket.onmessage = ({ data }) => {
      console.log(data);
    }
  })

  const [showModal, setShowModal] = useState(true);
  const [name, setName] = useState("");
  const [roomID, setRoomID] = useState("");

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
    </div>
  )
}
