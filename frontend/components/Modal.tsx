import React, { useState } from "react";

type Props = {
  handleSubmit: (submittedName: string, submittedRoomID: string) => void
}

const Modal = ({ handleSubmit }: Props) => {
  const [name, setName] = useState("");
  // boolean whether name is alphanumeric
  const [nameAlpha, setNameAlpha] = useState(true);
  // boolean whether name follows size constraints
  const [nameSize, setNameSize] = useState(true);

  const [roomID, setRoomID] = useState("");
  // boolean whether roomID is alphanumeric
  const [roomIDAlpha, setRoomIDAlpha] = useState(true);
  // boolean whether roomID follows size constraints
  const [roomIDSize, setRoomIDSize] = useState(true);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nameValue = event.target.value;
    setName(nameValue);
    if (nameValue) {
      setNameAlpha(/^[a-zA-Z0-9]+$/.test(nameValue));
      setNameSize(nameValue.length <= 20);
    }
  }

  const handleRoomIDChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const roomIDValue = event.target.value
    setRoomID(roomIDValue);
    if (roomIDValue) {
      setRoomIDAlpha(/^[a-zA-Z0-9]+$/.test(roomIDValue));
      setRoomIDSize(roomIDValue.length <= 20);
    }
  }

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSubmit(name, roomID);
  }

  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <div className="w-[70%] sm:w-[450px]">
        <div className="rounded-lg border-2 border-black dark:border-white px-6 sm:px-10 py-20 space-y-10">
          <div className="space-y-2">
            <h2 className="text-2xl text-center font-bold">Chat App</h2>
            <p className="text-center">Enter details to enter chat room</p>
          </div>
          <form onSubmit={handleFormSubmit} className="space-y-2">
            <p className="text-lg">Name</p>
            <input type="text" onChange={handleNameChange} pattern="[A-Za-z0-9]+" maxLength={20} required autoFocus placeholder="Dev Sharma" className="rounded-sm bg-zinc-200 dark:bg-zinc-900 w-[100%] px-2 py-1" />
            {!nameAlpha && (
              <p className="text-sm text-red-600 text-right">Name should be alphanumeric</p>
            )}
            {!nameSize && (
              <p className="text-sm text-red-600 text-right">Name should be less than 20 characters</p>
            )}
            <p className="text-lg">Room ID</p>
            <input type="text" onChange={handleRoomIDChange} pattern="[A-Za-z0-9]+" maxLength={20} required placeholder="lobby" className="rounded-sm bg-zinc-200 dark:bg-zinc-900 w-[100%] px-2 py-1" />
            {!roomIDAlpha && (
              <p className="text-sm text-red-600 text-right">Room ID should be alphanumeric</p>
            )}
            {!roomIDSize && (
              <p className="text-sm text-red-600 text-right">Room ID should be less than 20 characters</p>
            )}
            <div className="relative h-12 w-[100%]">
                <button type="submit" className="absolute bottom-0 right-0 rounded-md bg-blue-800 px-3 py-1 text-white">Enter Room</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Modal;
