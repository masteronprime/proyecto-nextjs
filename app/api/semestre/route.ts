import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(
  request: Request
) {

  try {
    
    const body = await request.json()
    const { name
     


     }= body;

    const semestre = await prisma.user.create({
      data:{ name
       
      }
    })

    return NextResponse.json(semestre)


  } catch (error) {
    console.log('[BILLBOARDS_GET]', error);
    return new NextResponse('Internal Error', { status: 500 })
  }
}
