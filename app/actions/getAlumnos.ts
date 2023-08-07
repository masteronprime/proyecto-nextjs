import prisma from "@/app/libs/prismadb"

const getAlumnos = async () => {


  const constituyentes = await prisma.user.findMany({
    where: {
      role:"user"
    },
  })


  return constituyentes
}

export default getAlumnos