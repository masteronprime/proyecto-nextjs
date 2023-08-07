import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";


export async function POST(
  request: Request,
  {
    params
  }:
    {
      params: { name: string }
    }
) {


  try {
    const { alumnosCodigo } = await request.json()

    const createSemestre = await prisma.semestre.create({
      data:{
        name:params.name,
        alumnosCodigo,

      }
    })
    
    return NextResponse.json(createSemestre)

  } catch (error) {
    console.log('[CREATE_SEMESTRE]', error);
    return new NextResponse('Internal Error', { status: 500 })
  }
}

export async function GET(
  request: Request,
  {
    params
  }:
    {
      params: { name: string }
    }
) {


  try {
    const semestres = await prisma.semestre.findMany({
      where:{
        name: params.name
      },
      include:{
        user: true
      }
    })
    

    return NextResponse.json(semestres)

  } catch (error) {
    console.log('[GET_SEMESTRES]');
    return new NextResponse('Internal Error', { status: 500 })
  }
}