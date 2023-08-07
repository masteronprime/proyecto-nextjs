'use client'
import Button from "@/app/components/Button";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ItemUser from "./ItemUser";
import { User } from "@prisma/client";

interface UserConstituyenteProps{
  currentUser: User | null;
}

const UserConstituyente: React.FC<UserConstituyenteProps> = ({
  currentUser
}) => {

  const session = useSession()
  const router = useRouter()

  const [isMounted, setIsMounted] = useState(false);


  useEffect(()=>{
    setIsMounted(true)
  },[])

  useEffect(() => {
    console.log(session?.status)
    if (session?.status !== 'authenticated') {
      router.push('/')
    }
  }, [session?.status, router])

  if (!isMounted) return null

  return ( 
    <div className="mt-11 px-8 py-6 grid grid-cols-1 lg:grid-cols-2">
      <div className="flex flex-col gap-y-4 items-center justify-center">
        <div className="relative">
          <div className="w-44 h-44 overflow-hidden rounded-[100%] flex items-center justify-center ">
            <Image
              src={currentUser?.image || "/images/placeholder.jpg"}
              alt="placeholbeder"
              width={"300"}
              height={"300"}
              className="h-full w-full object-cover"
            />
          </div>
          
          <Image
            src="/images/edit.svg"
            alt="placeholbeder"
            width={"48"}
            height={"48"}
            className="rounded-full bg-slate-400 p-2 absolute bottom-0 right-0 hover:cursor-pointer hover:bg-slate-300 transition"
            onClick={() => router.push("/constituyente/codigo")}
          />
        </div>
        
        <Button
          onClick={() => router.push("/constituyente/codigo")}
        >
          Editar
        </Button>
      </div>  
      <div className="flex items-start justify-start gap-y-4 rounded-xl bg-gray-300 flex-col  px-6 sm:px-11 py-5 sm:py-6 mt-6 mb-2">
        <div className="mt-4 text-gray-700 font-bold text-xl ">
          Datos personales
        </div>
        <ItemUser label="Nombre" text={currentUser?.name} />
        <ItemUser label="Codigo" text={currentUser?.codigo} />
        <ItemUser label="Rol" text={currentUser?.typeRole} />
        {
          currentUser?.typeRole!=="Estudiante" && (
            <>
              <ItemUser label="Titulo" text={currentUser?.titulos} />
              <ItemUser label="Lugar" text={currentUser?.lugar} />
              <ItemUser label="Area" text={currentUser?.area} />
              <ItemUser label="Cargo" text={currentUser?.cargo} />
              <ItemUser label="Fecha de grado" text={currentUser?.fechaGrado} />
              <ItemUser label="Lugar Capacitacion" text={currentUser?.lugarCapacitacion} />
              <ItemUser label="Denominacion de capacitacion" text={currentUser?.denominacioncapacitacion} />
              <ItemUser label="Matriculado" text={currentUser?.matriculado} />
            </>
          )
        }

      </div>
    </div>
   );
}
 
export default UserConstituyente;