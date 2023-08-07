import prisma from "@/app/libs/prismadb"

const getAlumnosSemestre = async ()=>{

  
  const alumnosSemestre2023I = await prisma.semestre.findMany({
    where:{
      name: "2023-I",
    },
    include:{
      user:true
    }
  })
  const alumnosSemestre2022II = await prisma.semestre.findMany({
    where: {
      name: "2022-II",
    },
    include: {
      user: true
    }
  })
  const alumnosSemestre2022I = await prisma.semestre.findMany({
    where: {
      name: "2022-I",
    },
    include: {
      user: true
    }
  })

  return {
    "2023-I": alumnosSemestre2023I,
    "2022-II":alumnosSemestre2022II,
    "2022-I":alumnosSemestre2022I,
}
}

export default getAlumnosSemestre