"use client";

import Image from "next/image";
import { useDispatch } from "react-redux";
import { addItem, removeItem} from "@/app/features/Car/CarSlice";
import { useEffect, useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { TbShoppingCartOff } from "react-icons/tb";
import { themeBgMap, themeBgMapHOpacity, themeText} from "@/app/themeStyles"
import { useSelector } from "react-redux";
import { selectTheme } from "@/app/features/theme/themeSelector";
import { selectItemsc } from "@/app/features/Car/CarSelector";
import Link from "next/link";

type CardProps = {
  id: number;
  title: string;
  imageUrl: string;
  talla: string;
  precio: number;
  onClick?: () => void;
};

export default function Card({
  title,
  imageUrl,
  precio,
  talla,
  id,
}: CardProps) {
  
  const dispatch = useDispatch();
  const [carrito, setCarrito] =useState<boolean>(false)
    const theme = useSelector(selectTheme);
   const bgClass = themeBgMap[theme]
   const bgClassHOpa = themeBgMapHOpacity[theme]
   const themeTextCard = themeText[theme]
  const itemsC = useSelector(selectItemsc);




   useEffect(() => {
      const find = itemsC.find(num => num.id  === id)
  if (find){setCarrito(true)}
  }, [itemsC,id]); 

  const handleAdd = () => {
    
    if(!carrito){ 
 
      
    dispatch(addItem({ id: id, cant: 1, precio: precio, imgUrl: imageUrl, title: title, talla: talla })) 
    setCarrito(true)
    }else{

       dispatch(removeItem(id))
      setCarrito(false)
    }
  
  };

  return (
    <div className="bg-white flex flex-col items-center shadow-2xl rounded-2xl p-4 mb-6 mx-4 w-[300px]">
      <h1 className="text-2xl font-extrabold mb-4"> {title} </h1>
      <div className={`${themeTextCard} mb-10 flex flex-wrap gap-6`}>
        
        <span className="font-bold">
          Precio: <span className="text-black">$ {precio}</span>{" "}
        </span>
        <span className="font-bold">
          Talla: <span className="text-black">{talla} </span>
        </span>
      </div>

      <Link href={`/itemview/${id}`}>
      <Image
        src={imageUrl}
        alt="Image"
        width={400}
        height={700}
        priority
      />
      </Link>

      <div className="flex flex-wrap items-center justify-around gap-8 pt-4 ">
        <button
          onClick={handleAdd}
          className={`flex flex-wrap items-center justify-center gap-2 text-white font-bold rounded-2xl px-4 py-1 ${bgClassHOpa} ${carrito ? "bg-[#233232]" : `bg-${bgClass}`}  active:scale-95 transition-transform duration-150 ease-in-out`}
        >
          {carrito ? <> Quitar carrito <TbShoppingCartOff /> </>: <>Añadir carrito <FaCartShopping /> </>}
        </button>
      </div>
    </div>
  );
}
