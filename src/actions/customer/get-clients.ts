'use server';

import prisma from '@/lib/prisma';

interface Email {
  userEmail?: string;
}

export const getClients = async({
  userEmail,
}: Email) => {


  try {

    const data = await prisma.customer.findMany({
      where: {
        emailCus: userEmail,
      },})

    if ( !data ) return null;

    const clients = data.map(item => ({
        ...item,
        _id: item.id.toString(), // agregamos _id
      }));


    return clients;

    
  } catch (error) {
    console.log(error);
    throw new Error('Error al obtener Configuracion por slug');
  }



}