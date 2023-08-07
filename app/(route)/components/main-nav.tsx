'use client'

import { useParams, usePathname, useRouter } from "next/navigation"
import Link from "next/link";
import { cn } from "@/app/libs/utils";


interface MainNavProps{
  role: string | undefined | null
  className:any
}

export function MainNav({
  className,
  role,
  ...props
}: MainNavProps ) {

  
  const router = useRouter()

  const routesAdmin = [
    {
      href: `/administrador`,
      label: 'Inicio',
    },
    {
      href: `/administrador/historial`,
      label: 'Historial',
    },
    {
      href: `/administrador/migrar`,
      label: 'Migrar base de datos',
    },
    {
      href: `http://ccomputo.unsaac.edu.pe/`,
      label: 'Centro de computo ',
    },
  ]

  const routesUser = [
    {
      href: `/constituyente`,
      label: 'Inicio',
    },
    {
      href: `https://www.unsaac.edu.pe/`,
      label: 'Unsaac Oficial',
    },
    {
      href: `http://ccomputo.unsaac.edu.pe/`,
      label: 'Centro de computo ',
    },
  ]

  return (
    <nav
      className={cn('flex items-center space-x-4 lg:space-x-6', className)}
    >
      <img
        src="images/logoInfo.png"
        alt="Logo unsaac"
        className="hidden sm:block rounded-2xl h-16 py-2 hover:cursor-pointer hover:opacity-80 transition"
        onClick={() => router.push("/")}
      />

      
      {role==="admin"&& routesAdmin.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(`text-sm sm:text-md font-medium text-gray-100 transition-colors hover:text-primary hover:opacity-80 text-center`)}
        >
          {route.label}
        </Link>
      ))}

      {role === "user" && routesUser.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(`text-sm sm:text-md font-medium text-gray-100 transition-colors hover:text-primary hover:opacity-80 text-center`)}
        >
          {route.label}
        </Link>
      ))}

    </nav>
  )
}