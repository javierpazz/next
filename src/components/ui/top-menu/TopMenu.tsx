"use client";
import { useEffect, useState } from 'react';

import Link from "next/link";
import { IoSearchOutline, IoCartOutline } from "react-icons/io5";

import { titleFont } from "@/config/fonts";
import { useCartStore, useUIStore } from "@/store";
// import { getConfigs } from '@/actions';

export const TopMenu = () => {
// ///////////////////////
//   const [name, setName] = useState("");
//   const [salePoint, setSalePoint] = useState("");
//   const [codCon, setCodCon] = useState('');
//   const [configurationObj, setConfigurationObj] = useState({});
  
//   const [punto, setPunto] = useState(localStorage.getItem('punto')||"");


// // 1. Primero obtenemos configuración si no hay
//   useEffect(() => {
//     const fetchConfi = async () => {
//       try {
//         // const { data } = await stutzApi.get(`/api/configurations/`);
//         const configs = await getConfigs();
//         if (configs) {
//         const conf = configs[0];
//         setPunto(conf._id); // <-- actualizamos el estado después de setItem
//         setConfigurationObj(conf);
//         setCodCon(conf._id);
//         setName(conf.name);
//         setSalePoint(conf.codCon);
//         guardaLocal(conf);
//         }
//       } catch (error) {
//         console.error('Error al cargar configuración:', error);
//       }
//     };
    
//     if (!punto) {
//       fetchConfi();
//     }
//   }, [punto]);
  
  
//   const guardaLocal = (conf : any) => {
//     localStorage.setItem('punto', conf._id);
//     localStorage.setItem('puntonum', conf.codCon);
//     localStorage.setItem('nameCon', conf.name);
//   };
// ///////////////////////

  const openSideMenu = useUIStore((state) => state.openSideMenu);
  const totalItemsInCart = useCartStore((state) => state.getTotalItems());
  
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, [])
  


  return (
    <nav className="flex px-5 justify-between items-center w-full">
      {/* Logo */}
      <div>
        <Link href="/">
          <span className={`${titleFont.className } antialiased font-bold`}>
            Punto de Venta
            {/* {localStorage.getItem('nameCon')||""} */}
          </span>
          <span> | Shop</span>
        </Link>
      </div>

      {/* Center Menu */}
      {/* <div className="hidden sm:block">
        <Link
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          href="/gender/men"
        >
          Hombres
        </Link>
        <Link
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          href="/gender/women"
        >
          Mujeres
        </Link>
        <Link
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          href="/gender/kid"
        >
          Niños
        </Link>
      </div> */}

      {/* Search, Cart, Menu */}
      <div className="flex items-center">
        <Link href="/search" className="mx-2">
          <IoSearchOutline className="w-5 h-5" />
        </Link>

        <Link href={
          ( (totalItemsInCart === 0 ) && loaded )
            ? '/empty'
            : "/cart"
        } className="mx-2">
          <div className="relative">
            {  ( loaded && totalItemsInCart > 0) && (
              <span className="fade-in absolute text-xs px-1 rounded-full font-bold -top-2 -right-2 bg-blue-700 text-white">
                {totalItemsInCart}
              </span>
            )}
            <IoCartOutline className="w-5 h-5" />
          </div>
        </Link>

        <button
          onClick={openSideMenu}
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
        >
          Menú
        </button>
      </div>
    </nav>
  );
};
