'use client'
import Button from "@/app/components/Button";
import Input from "@/app/components/Input";
import { User } from "@prisma/client";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { CldUploadButton } from "next-cloudinary";



interface UpdateUserProps{
  currentUser:User | undefined | null
}

const UpdateUser: React.FC<UpdateUserProps> = ({ currentUser }) => {

  const session = useSession() || null
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false);
  
  const {
    register,
    handleSubmit, 
    setValue,
    watch,
    formState: {
      errors
    } } = useForm<FieldValues>({
      defaultValues: {
        name: currentUser?.name || "",
        codigo:currentUser?.codigo || null,
        image: currentUser?.image || null,
        titulos: currentUser?.titulos || "",
        grados: currentUser?.grados || "",
        lugar: currentUser?.lugar ||"",
        area: currentUser?.area ||"",
        cargo: currentUser?.cargo ||"",
        fechaGrado: currentUser?.fechaGrado ||null,
        fechaCapacitacion: currentUser?.fechaCapacitacion || null,
        lugarCapacitacion: currentUser?.lugarCapacitacion ||"",
        denominacioncapacitacion: currentUser?.denominacioncapacitacion ||"",
      }
    })

  const image = watch('image');

  const handleUpload = (result: any) => {
    setValue('image', result?.info?.secure_url, {
      shouldValidate: true
    })
  }


  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true)
    console.log(data)
    try {
      setIsLoading(true)
      await axios.post(`/api/alumno/actualizar/${currentUser?.codigo}`, {
        ...data,
        fechaGrado: new Date(data.fechaGrado),
        fechaCapacitacion: new Date(data.fechaCapacitacion)
      })
      router.refresh()
      toast.success("Actualizado correctamente")
      router.push(`/constituyente`)
    } catch (error) {
      toast.error('Algo ha salido mal')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    console.log(session?.status)
    if (session?.status !== 'authenticated') {
      router.push('/')
    }
  }, [session?.status, router])

  return (
    <div className="mt-11 px-8 py-6 flex flex-col gap-y-4 items-center justify-center">
      <div className="relative">

        <div className="w-56 h-56 overflow-hidden rounded-[100%] flex items-center justify-center ">
          <Image
            src={currentUser?.image || "/images/placeholder.jpg"}
            alt="placeholbeder"
            width={"300"}
            height={"300"}
            className="h-full w-full object-cover"
          />
        </div>
        
        <CldUploadButton
          options={{ maxFiles: 1 }}
          onUpload={handleUpload}
          uploadPreset="juar7bjz"
        >
          <Image
            src="/images/edit.svg"
            alt="placeholbeder"
            width={"48"}
            height={"48"}
            className="rounded-full bg-slate-400 p-2 absolute bottom-5 right-5 hover:cursor-pointer hover:bg-slate-300 transition bg-cover"
          />
        </CldUploadButton>
        
      </div>
      <div className="text-gray-700 font-semibold text-xl mt-4">
        Datos personales
      </div>
      <form
        className="mt-6 "
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid  items-center justify-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4  w-3/4 gap-y-3  px-11 py-1 mx-auto ">
          <Input
            id="name"
            label="Nombre"
            type="text"
            register={register}
            errors={errors}
            disabled={isLoading}
            value={currentUser?.name}
          />
          <Input
            id="codigo"
            label="Codigo"
            type="text"
            register={register}
            errors={errors}
            disabled={isLoading}
            value={currentUser?.codigo}
          />

          {
            currentUser?.typeRole!=="Estudiante" && (
              <>
                <Input
                  id="titulos"
                  label="Titulo"
                  type="text"
                  register={register}
                  errors={errors}
                  disabled={isLoading}
                />
                <Input
                  id="grados"
                  label="Grado"
                  type="text"
                  register={register}
                  errors={errors}
                  disabled={isLoading}
                />
                <Input
                  id="lugarCapacitacion"
                  label="lugar"
                  type="text"
                  register={register}
                  errors={errors}
                  disabled={isLoading}
                />
                <Input
                  id="area"
                  label="Area"
                  type="text"
                  register={register}
                  errors={errors}
                  disabled={isLoading}
                />
                <Input
                  id="cargo"
                  label="Cargo"
                  type="text"
                  register={register}
                  errors={errors}
                  disabled={isLoading}
                />
                <Input
                  id="fechaGrado"
                  label="Fecha de grado"
                  type="datetime-local"
                  register={register}
                  errors={errors}
                  disabled={isLoading}
                />
                <Input
                  id="fechaCapacitacion"
                  label="Fecha de ultima capacitacion"
                  type="datetime-local"
                  register={register}
                  errors={errors}
                  disabled={isLoading}
                />
                <Input
                  id="denominacioncapacitacion"
                  label="Denominaicon de ultima capacitacion"
                  type="text"
                  register={register}
                  errors={errors}
                  disabled={isLoading}
                />
              </>
            )
          }
        </div>
         
        <div className="mt-11 px-11">
          <Button
            disabled={isLoading}
            fullWidth
            type="submit"
          >
            Actualizar
          </Button>
        </div>
      </form>
    </div>
  );
}

export default UpdateUser;