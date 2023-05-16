type Props = {
  isVisible: boolean
}

const Modal = ({ isVisible }: Props) => {
  return isVisible? (
    <div className="fixed inset-0 bg-white dark:bg-black">
      <div className="fixed inset-0 flex justify-center items-center">
        <div className="w-[70%] sm:w-[450px]">
          <div className="rounded-lg border-2 border-black dark:border-white px-6 sm:px-10 py-20 space-y-10">
            <div className="space-y-2">
              <h2 className="text-2xl text-center font-bold">Chat App</h2>
              <p className="text-center">Enter details to enter chat room</p>
            </div>
            <form className="space-y-2">
              <p className="text-lg">Name</p>
              <input type="text" name="name" placeholder="Jason" className="rounded-sm border border-black dark:border-white w-[100%] px-2 py-1" />
              <p>Room ID</p>
              <input type="text" name="roomID" placeholder="123" className="rounded-sm border border-black dark:border-white w-[100%] px-2 py-1" />
              <div className="relative h-12 w-[100%]">
                  <button type="submit" className="absolute bottom-0 right-0 rounded-md bg-blue-800 px-3 py-1 text-white">Enter Room</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}

export default Modal;