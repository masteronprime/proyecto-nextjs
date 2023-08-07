'use client'

import { signOut } from "next-auth/react";
import { MainNav } from "./main-nav";
import Button from "@/app/components/Button";

interface NavbarProps{
  role:string | undefined | null
}

const Navbar: React.FC<NavbarProps> = ({
  role
}) => {

  return (
    <div className="border-b bg-[#3341c5]">
      <div className="flex h-16 items-center px-4">
        <MainNav role={role} className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <Button
            danger
            onClick={() => {
              signOut()
              }}>
            Cerrar sesion
          </Button>
        </div>
      </div>
    </div>
  )
}
 
export default Navbar;