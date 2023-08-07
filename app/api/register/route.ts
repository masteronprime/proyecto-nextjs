import bcrypt from "bcrypt";

import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(
  request: Request
) {
  //Traemos toda la data
  const body = await request.json();
  const {
    codigo,
    name,
    password,
    role,
  } = body;

  //Encryptamos la contraseña
  const hashedPassword = await bcrypt.hash(password, 12);

  //Creamos el nuevo usuario
  const user = await prisma.user.create({
    data: {
      codigo,  
      name,
      hashedPassword,
      email: codigo,
      role,

    }
  });

  return NextResponse.json(user);
}