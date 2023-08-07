import prisma from "@/app/libs/prismadb"

const getEgresadosSemestre = async () => {


  const egresados2023I = await prisma.semestre.findMany({
    where: {
      name: "2023-I",
      user: {
        estadoAlumno: 'egresado',
      },
    },
    include: {
      user: true
    }
  });
  const egresados2022II = await prisma.semestre.findMany({
    where: {
      name: "2022-II",
      user: {
        estadoAlumno: 'egresado',
      },
    },
    include: {
      user: true
    }
  })
  const egresados2022I = await prisma.semestre.findMany({
    where: {
      name: "2022-I",
      user: {
        estadoAlumno: 'egresado',
      },
    },
    include: {
      user: true
    }
  })

  return {
    "2023-I": egresados2023I,
    "2022-II": egresados2022II,
    "2022-I": egresados2022I,
  }
}

export default getEgresadosSemestre