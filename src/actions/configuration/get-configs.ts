'use server';

import prisma from '@/lib/prisma';


export const getConfigs = async() => {


  try {

    const data = await prisma.configuration.findMany({
      where: {
        codCon: "0001",
      },})

    if ( !data ) return null;

    const configs = data.map(item => ({
        ...item,
        _id: item.id.toString(), // agregamos _id
      }));


    return configs;

    
  } catch (error) {
    console.log(error);
    throw new Error('Error al obtener Configuracion por slug');
  }



}