import prisma from "@/app/libs/prismadb"

const getGraduadosSemestre = async () => {

  const graduados2023I = await prisma.semestre.findMany({
    where: {
      name: "2023-I",
      user: {
        estadoAlumno: 'graduado',
      },
      
    },
    include: {
      user: true
    }
  });
  const graduados2022II = await prisma.semestre.findMany({
    where: {
      name: "2022-II",
      user: {
        estadoAlumno: 'graduado',
      },
    },
    include: {
      user: true
    }
  })
  const graduados2022I = await prisma.semestre.findMany({
    where: {
      name: "2022-I",
      user: {
        estadoAlumno: 'graduado',
      },
    },
    include: {
      user: true
    }
  })

  return {
    "2023-I": graduados2023I,
    "2022-II": graduados2022II,
    "2022-I": graduados2022I,
  }
}

export default getGraduadosSemestre