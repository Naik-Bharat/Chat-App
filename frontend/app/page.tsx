'use client';

import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const socket = new WebSocket("ws://localhost:8080/ws/123");
  socket.onmessage = ({ data }) => {
    console.log(data);
  };

  return (
    <div className='mx-6'>
    </div>
  )
}
