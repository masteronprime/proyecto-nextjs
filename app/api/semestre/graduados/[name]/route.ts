import prisma from "@/app/libs/prismadb";

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
    const { name } = params;

    const semestres = await prisma.semestre.findMany({
      where: {
        name: name,
        user: {
          estadoAlumno: 'graduado',
        },
      },
      include:{
        user:true
      }
    });
    return new Response(JSON.stringify(semestres), {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.log('[BILLBOARDS_GET]', error);
    return new Response('Internal Error', { status: 500 });
  }
}
