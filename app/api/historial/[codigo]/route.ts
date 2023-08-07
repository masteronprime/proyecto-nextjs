import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";


export async function GET(
  request: Request,
  {
    params
  }:
    {
      params: { codigo: string }
    }
) {


  try {

    const alumno = await prisma.historial.findMany({
      where: {
        alumnosCodigo:params.codigo
      }
    })
    
    return NextResponse.json(alumno)

  } catch (error) {
    console.log('[BILLBOARDS_GET]', error);
    return new NextResponse('Internal Error', { status: 500 })
  }
}
