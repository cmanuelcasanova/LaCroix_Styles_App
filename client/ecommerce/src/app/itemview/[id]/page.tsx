"use client";

import Image from "next/image";
import { useState } from "react";
//import { themeBgMap, themeBgMapHOpacity, themeText } from "@/app/themeStyles";
//import { useSelector } from "react-redux";
//import { selectTheme } from "@/app/features/theme/themeSelector";
import { useGetItemQuery } from "../../services/api/productsApi.ts";
import LoadingModal from "../../components/Loadingpage";
import { useParams } from "next/navigation";
import { skipToken } from "@reduxjs/toolkit/query";
import { themeBg } from "@/app/themeStyles"
import { useSelector } from "react-redux";
import { selectTheme } from "@/app/features/theme/themeSelector";
import { FaCartShopping } from "react-icons/fa6";
import { TbShoppingCartOff } from "react-icons/tb";
import { TbArrowBackUp } from "react-icons/tb";
import { useRouter } from "next/navigation";

interface itemProps {
  id: string;
}

export default function Item({ id }: itemProps) {
  //const theme = useSelector(selectTheme);
  const params = useParams();
  const id_item = params?.id?.toString();
     const theme = useSelector(selectTheme);
     const tBg = themeBg[theme]
     const [carrito, setCarrito] =useState<boolean>(false)
      const router = useRouter();

  const {
    data: item,
    isLoading,
    error,
    isFetching,
  } = useGetItemQuery(id_item ? { id: id_item } : skipToken);

  if (isLoading || isFetching) return <LoadingModal />;
  if (error || !item) return <p>Artículo no encontrado</p>;

  return (

    <div className="flex flex-col items-center justify-center">
    <div className="bg-white flex flex-col items-center shadow-2xl mt-20 rounded-2xl p-4 mb-6 mx-4 w-dwv">
      <Image
        className="rounded-b-2xl shadow-2xl p-1 rounded-t-2xl"
        src={item.imageUrl}
        alt="Image"
        width={400}
        height={700}
        priority
      />

      <div className="flex flex-wrap justify-around items-center gap-4 mt-6 text-2xl font-extrabold w-full">
        <h1 className="mr-auto"> {item.title} </h1>
        <h1 className="ml-auto"> {item.precio} $ </h1>
      </div>

      <h1 className="mr-auto mt-4 mb-2"> COLOR: </h1>

      <div className="h-[30px] w-[30px] border-black border-2 mr-auto bg-gray-400"></div>

      <h1 className="mr-auto mt-4 mb-2"> TALLA: </h1>

      <div className="flex flex-col items-center justify-center h-[40px] w-[40px] rounded-full mr-auto font-bold bg-gray-300 ">
        {item.talla}
      </div>

        <h1 className="mr-auto mt-4 mb-2"> DETALLES: </h1>

        <textarea className="mr-auto" name="Detalles" id="Detalles" defaultValue="------">
       
          
        </textarea>

        <button className={`${tBg} rounded w-full p-2 flex items-center gap-2 justify-center active:scale-95 transition-transform duration-150 ease-in-out`}> {carrito ? <> Quitar carrito <TbShoppingCartOff className="bg-white"/> </>: <>Añadir carrito <FaCartShopping className="text-white"/> </>} </button>

    </div>

    
    <button className="bg-white p-2 px-20 mt-4 rounded-2xl flex flex-wrap items-center gap-2 active:scale-95 transition-transform duration-150 ease-in-out"
    onClick={()=> router.push("/")}
    > <><TbArrowBackUp /> Volver </> 
    
    </button>
    </div>
    
  );
}
