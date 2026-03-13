import prisma from '../lib/prisma';
import { initialData } from './seed';
import { countries } from './seed-countries';



async function main() {

  // 1. Borrar registros previos
  // await Promise.all( [

  await prisma.orderAddress.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.receiptItem.deleteMany();
  await prisma.receipt.deleteMany();


  await prisma.userAddress.deleteMany();
  await prisma.user.deleteMany();
  await prisma.country.deleteMany();
  
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  
  await prisma.parte.deleteMany();
  // await prisma.instrumento.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.encargado.deleteMany();
  await prisma.supplier.deleteMany();
  await prisma.comprobante.deleteMany();
  await prisma.configuration.deleteMany();

  // ]);
  
  const { categories, products, users, configurations, partes, instrumentos, customers, encargados, suppliers, } = initialData;
  
  await prisma.configuration.createMany({
    data: configurations
  });
    const createdConfiguration = await prisma.configuration.findMany();
    const CONFIG1 = createdConfiguration[0].id;
    const CONFIG2 = createdConfiguration[1].id;

    await prisma.comprobante.createMany({
      data: initialData.comprobantes.map((c, index) => ({
        ...c,
        codCon: index < 6 ? CONFIG1 : CONFIG2
      }))
    });    
    
  await prisma.supplier.createMany({
    data: suppliers
  });
  await prisma.encargado.createMany({
    data: encargados
  });
  await prisma.customer.createMany({
    data: customers
  });
  await prisma.parte.createMany({
    data: partes
  });

  await prisma.user.createMany({
    data: users
  });

  await prisma.country.createMany({
    data: countries
  });



  //  Categorias
  // {
  //   name: 'Shirt'
  // }
  const categoriesData = categories.map( (name) => ({ name }));
  
  await prisma.category.createMany({
    data: categoriesData
  });

  
  const categoriesDB = await prisma.category.findMany();
  
  const categoriesMap = categoriesDB.reduce( (map, category) => {
    map[ category.name.toLowerCase()] = category.id;
    return map;
  }, {} as Record<string, string>); //<string=shirt, string=categoryID>
  
  

  // Productos

  products.forEach( async(product) => {

    const { type, images, ...rest } = product;

    const dbProduct = await prisma.product.create({
      data: {
        ...rest,
        categoryId: categoriesMap[type]
      }
    })


    // Images
    const imagesData = images.map( image => ({
      url: image,
      productId: dbProduct.id
    }));

    await prisma.productImage.createMany({
      data: imagesData
    });

  });





  console.log( 'Seed ejecutado correctamente' );
}









( () => {

  if ( process.env.NODE_ENV === 'production' ) return;


  main();
} )();