'use client'
import Modal from "@/app/components/Modal";
import { useState } from "react";

interface UserItemProps{
  user:any | null
}

const UserItem: React.FC<UserItemProps> = ({
  user
}) => {

  const [isOpen, setIsOpen] = useState(false);

  return ( 
    <>
      <Modal
        isOpen={isOpen}
        onClose={()=>setIsOpen(false)}
      >
        {/* <Image
          alt="logo"
          src={"images/placeholder.jpg"}
          className="border-full p-2"
        /> */}
        <h2 className="text-xl text-center text-gray-600 font-bold" >{ user?.name }</h2>
        <div className="grid grid-cols-2 mt-4">
          <div className="flex flex-col gap-y-2 items-center justify-center ">
            {
              user?.codigo && <div className="flex gap-x-2">
                <div className="font-semibold">Codigo:</div> {user?.codigo}
              </div>
            }
            {
              user?.typeRole && <div className="flex gap-x-2">
                <div className="font-semibold">Tipo:</div> {user?.typeRole}
              </div>
            }
            {
              user?.estadoAlumno && <div className="flex gap-x-2">
                <div className="font-semibold">Estado:</div> {user?.estadoAlumno}
              </div>
            }
          </div>
          <img
            src={user?.image ? user?.image : "/images/placeholder.jpg"}
            alt="logito"
            className="w-48 h-48 rounded-full border-2 border-gray-500 object-cover" />
        </div>
      </Modal>
      <div className="py-2 px-8 flex gap-x-8 justify-between" >
        <div
          onClick={() => setIsOpen(true)}
          className="text-gray-600 hover:cursor-pointer hover:text-gray-500 font-semibold">
          {user.codigo}
        </div>
        <div
          onClick={() => setIsOpen(true)}
          className="text-gray-600 hover:cursor-pointer hover:text-gray-500  truncate">
          {user?.name}
        </div>
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
          {user?.typeRole}
        </code>
      </div>
    </>
   );
}
 
export default UserItem;