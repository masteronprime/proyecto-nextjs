import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import xlsx from 'xlsx';
import bcrypt from "bcrypt";
import { da } from "date-fns/locale";
interface UserExcelData {
  name:string;
  codigo:string;
  role:string;
  typeRole:string;
  password:string;
  lugarcapacitacion:string;
  denominacioncapacitacion:string;
  titulos:string;
  grados:string;
  lugar:string;
  area:string;
  cargo:string;

}


export async function POST(request: Request) {
  try {
    const archivoBuffer = await request.arrayBuffer();
    const archivoUint8Array = new Uint8Array(archivoBuffer);
    
    const workbook = xlsx.read(archivoUint8Array);
    const hoja = workbook.Sheets['Hoja 1'];
   

    const datosJson = xlsx.utils.sheet_to_json<UserExcelData>(hoja);
  

    for (const dato of datosJson) {
      const hashedPassword = await bcrypt.hash(String(dato.password), 12);
      const body =await prisma.user.create({
        data: {
          name: dato.name,
          codigo:String(dato.codigo),
          email:String(dato.codigo),
          role:dato.role,
          typeRole:dato.typeRole,
          hashedPassword:String(hashedPassword),
          lugarCapacitacion:dato.lugarcapacitacion,
          denominacioncapacitacion:dato.denominacioncapacitacion,
          titulos:dato.titulos,
          grados:dato.grados,
          lugar:dato.lugar,
          area:dato.area,
          cargo:dato.cargo
        },
      });
     
     
    }
    return NextResponse.json({msg:"exito"})
  } catch (error) {
    console.log(error)
    return NextResponse.json({msg:"error"},{status:500})
  
  } 
}
