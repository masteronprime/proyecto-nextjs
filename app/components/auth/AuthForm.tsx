'use client'

import Button from "@/app/components/Button";
import Input from "@/app/components/Input";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { toast } from 'react-hot-toast' 
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';


//@ts-ignore
const AuthForm = () => {
  const session = useSession() || null
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session?.status === 'authenticated') {
      router.refresh()
      router.push('/administrador')
    }
  }, [session?.status, router])



  const {
    register,
    handleSubmit,
    formState: {
      errors
    } } = useForm<FieldValues>({
      defaultValues: {
        email: '',
        password: ''
      }
    })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (!data.email || !data.password) return 
    setIsLoading(true)
    signIn('credentials', {
      ...data,
      redirect: false
    })
      .then((callback) => {
        if (callback?.error) {
          console.log(callback?.error)
          toast.error('El usuario no existe')
        }
        if (callback?.ok && !callback?.error) {
          toast.success('¡Entro correctamente!')
          router.push('/administrador')
        }
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <div className="
      mt-8
      sm:mx-auto
      sm:w-full
      sm:max-w-md
    ">
      <div className="
        bg-[rgba(255,255,255,0.9)]
        px-4
        py-8
        shadow
        sm:rounded-lg
        sm:px-10
      ">
        <form
          className="space-y-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            id="email"
            label="Código"
            type="text"
            register={register}
            errors={errors}
            disabled={isLoading}
            placeholder="Ingrese su codigo institucional"
          />
          <Input
            id="password"
            label="Contraseña"
            type="password"
            register={register}
            errors={errors}
            disabled={isLoading}
            placeholder="Ingrese su contraseña"

          />
          <div>
            <Button
              disabled={isLoading}
              fullWidth
              type="submit"
            >
              Entrar
            </Button>
          </div>
        </form>
        <div className="
          mt-6
        ">
          <div className="relative">
            <div className="
              absolute
              inset-0
              flex
              items-center
            ">
              <div className="w-full border-t border-gray-300" />

            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Inicio seguro
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
          
        </div>
      </div>

    </div>
  );
}

export default AuthForm;