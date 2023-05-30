import React, { useState } from "react";

type Props = {
  handleSubmit: (submittedName: string, submittedRoomID: string) => void
}

const Modal = ({ handleSubmit }: Props) => {
  const [name, setName] = useState("");
  const [roomID, setRoomID] = useState("");

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  }

  const handleRoomIDChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRoomID(event.target.value);
  }

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault;
    handleSubmit(name, roomID);
  }

  return (
    <div className="fixed inset-0 bg-white dark:bg-black">
      <div className="fixed inset-0 flex justify-center items-center">
        <div className="w-[70%] sm:w-[450px]">
          <div className="rounded-lg border-2 border-black dark:border-white px-6 sm:px-10 py-20 space-y-10">
            <div className="space-y-2">
              <h2 className="text-2xl text-center font-bold">Chat App</h2>
              <p className="text-center">Enter details to enter chat room</p>
            </div>
            <form onSubmit={handleFormSubmit} className="space-y-2">
              <p className="text-lg">Name</p>
              <input type="text" name="name" onChange={handleNameChange} placeholder="Dev Sharma" autoFocus className="rounded-sm bg-zinc-200 dark:bg-zinc-900 w-[100%] px-2 py-1" />
              <p className="text-lg">Room ID</p>
              <input type="text" name="roomID" onChange={handleRoomIDChange} placeholder="lobby" className="rounded-sm bg-zinc-200 dark:bg-zinc-900 w-[100%] px-2 py-1" />
              <div className="relative h-12 w-[100%]">
                  <button type="submit" className="absolute bottom-0 right-0 rounded-md bg-blue-800 px-3 py-1 text-white">Enter Room</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;