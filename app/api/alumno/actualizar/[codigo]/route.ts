import prisma from "@/app/libs/prismadb";


export async function POST(
  request: Request,
  {
    params
  }:
    {
      params: { codigo: string }
    }
    
) {
  try {
    const { codigo } = params;
    const body = await request.json();
    const originalUser = await prisma.user.findUnique({
      where: { codigo: codigo },
    });
    const updatedUser = await prisma.user.update({
      where: {
        codigo: codigo, 
      },
      data: body, 
    });

    const l = []
     for (const i in updatedUser){
      if ((updatedUser[i as keyof typeof updatedUser]) !== (originalUser![i as keyof typeof originalUser])){
        l.push(i);}}
    console.log(l)
    if (l.length!=0){
        const createSemestre = await prisma.historial.create({
          data: {
            alumnosCodigo: codigo,
            mensaje: "Se actualizó los siguientes datos del usuario: " + l,

          }});
      }else{
        const createSemestre = await prisma.historial.create({
          data: {
            alumnosCodigo: codigo,
            mensaje: "no se modifico ningun dato ",

          }});
      }
    const updatedUserString = JSON.stringify(updatedUser, null, 2);
    return new Response(updatedUserString, {
      headers: { 'Content-Type': 'application/json' },
    }); 
 
    
  }catch (error) {
    console.log('[BILLBOARDS_GET]', error);
    return new Response('Internal Error', { status: 500 });
  }
}
