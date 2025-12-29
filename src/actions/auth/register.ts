'use server';

import prisma from '@/lib/prisma';
import bcryptjs from 'bcryptjs'
import { getConfigs } from '../configuration/get-configs';
// import * as bcrypt from 'bcrypt';


export const registerUser = async( name: string, email: string, password: string ) => {


  try {
    
    // const customer = await prisma.customer.create({
    //   data: {
    //       codCus: name,
    //       nameCus: rest.nameCus,
    //       emailCus: rest.emailCus,
    //   },
    //   select: {
    //     id: true,
    //     name: true,
    //     email: true,
    //   }
    // })

////******* */

/////numera cliente
    // 0. Obtener Punto de Venta
        let pVenta = "";
        const configs = await getConfigs();
        if (configs) {
        const conf = configs[0];
        pVenta = conf._id;
        }

      let cliNumero = 0;
        const configuracion = await prisma.configuration.findUnique(
          {
            where: { id: pVenta },
          }
        );
        if (configuracion) {
          configuracion.numIntCli += 1;
          // await configuracion.save({ session });
          await prisma.configuration.update(
            {
              where: { id: pVenta },
              data: {
                numIntCli: { increment: 1 },
              },
            }
          );
          cliNumero = configuracion.numIntCli;
        } else {
          throw new Error('Configuración no encontrada');
        }
/////numera cliente

      const customer = await 
      prisma.customer.create(
        {data: {
          codCus: String(cliNumero),
          nameCus: name,
          emailCus: email,
        }
      }
      );
////******* */
    
    const user = await prisma.user.create({
      data: {
        name: name,
        email: email.toLowerCase(),
        password: bcryptjs.hashSync( password ),
        role: "client",
      },
      select: {
        id: true,
        name: true,
        email: true,
      }
    })

    return {
      ok: true,
      user: user,
      message: 'Usuario creado'
    }

  } catch (error) {
    console.log(error);

    return {
      ok: false,
      message: 'No se pudo crear el usuario'
    }
  }

  

}