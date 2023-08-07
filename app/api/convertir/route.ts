import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import xlsx from 'xlsx';
import bcrypt from "bcrypt";
interface UserExcelData {
  name:string;
  codigo:string;
  role:string;
  typeRole:string;
  estadoAlumno:string;
  password:string;

}


export async function POST(request: Request) {
  try {
    const archivoBuffer = await request.arrayBuffer();
    const archivoUint8Array = new Uint8Array(archivoBuffer);
    console.log(archivoUint8Array)
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
          estadoAlumno:dato.estadoAlumno,
          hashedPassword:String(hashedPassword)
        },
      });
    }
    return NextResponse.json({msg:"exito"})
  } catch (error) {
    return NextResponse.json({msg:"error"},{status:500})
  
  } 
}
