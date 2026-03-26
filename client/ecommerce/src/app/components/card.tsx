"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { themeText } from "@/app/themeStyles";
import { CiMenuKebab } from "react-icons/ci";
import { useSelector } from "react-redux";
import { selectTheme } from "@/app/features/theme/themeSelector";
import { selectUsername } from  "@/app/features/auth/authSelectors"
import { useRemoveItemMutation , useDeletePhotoMutation } from "@/app/services/api/productsApi";
import  ConfirmationtModal  from "@/app/components/confirmation"
import ImageDefault from "../../../public/default-Image.png";


import Link from "next/link";


type CardProps = {
  id: number;
  title: string;
  imageUrl: string;
  marca: string | null;
  talla: {name:string}[];
  precio: number;
  onClick?: () => void;
};

export default function Card({
  title,
  imageUrl,
  precio,
  talla,
  marca,
  id,
}: CardProps) {

  const theme = useSelector(selectTheme);
  const themeTextCard = themeText[theme];
  const [detail, setDetails] = useState<boolean>(false);
  const User = useSelector(selectUsername);
  const [DeleteItem] = useRemoveItemMutation();
  const [deletePhoto] = useDeletePhotoMutation();
  const [modal, setModal] = useState<boolean>(false);
  const [borrar, setBorrar] = useState<boolean>(false);
  

  
  

   useEffect(() => {
    try {

      if(borrar) {

         DeleteItem({ id: id }).unwrap();

         deletePhoto({ name: imageUrl.split("/").pop() , id: id} ).unwrap();
      }
    } catch (err) {
      console.log(err);
    }
    }, [borrar,DeleteItem, deletePhoto, id,imageUrl]);




  const handleDelete = async () => {

      setModal(true)

    
  };

  return (


    <div className="bg-white relative flex flex-col items-center shadow-2xl rounded-2xl p-4 mb-6 w-dwv sm:w-80 h-114 ">
      
      {modal && <ConfirmationtModal onClose={() => setModal(false)} confirm={() => {setBorrar(true)}} />}
      
      <h1 className="w-full">
        {" "}
        <CiMenuKebab
          size={20}
          className="ml-auto hover:cursor-pointer"
          onClick={() => setDetails(!detail)}
        />{" "}
      </h1>
      {detail && (
        <div className="absolute flex flex-col ml-auto mt-6 bg-gray-200 rounded w-full">
          <Link
            href={`/itemview/${id}`}
            className="shadow-2xl p-2 pl-4"
            onClick={() => setDetails(!detail)}
          >
            info...
          </Link>

          {User && (
            <>
              <Link
                href={{
                  pathname: "/newproduct",
                  query: { mode: "edit",id: id },
                }}
                className="shadow-2xl p-2 pl-4"
                onClick={() => setDetails(!detail)}
              >
                Editar Producto
              </Link>
              <Link
                href="/"
                className="shadow-2xl p-2 pl-4"
                onClick={() => {
                  setDetails(!detail);
                  handleDelete();
                }}
              >
                Eliminar Producto
              </Link>
            </>
          )}
        </div>
      )}

      <h1 className="text-2xl font-extrabold mb-4 text-center"> {title} </h1>
      <div className={`${themeTextCard} mb-2 flex flex-wrap gap-6`}>
        <span className="font-bold">
          Precio: <span className="text-black">$ {precio}</span>{" "}
        </span>
        <span className="font-bold flex flex-wrap gap-2">
          Talla: <span className="text-black flex flex-wrap gap-[5px]"> { talla.map ((item , index) => <span key={index} className="bg-gray-300 rounded-full flex flex-wrap items-center justify-center h-[25px] w-[25px]"> {item.name} </span>) } </span>
        </span>
      </div>

     

        {marca && 
         <div className="w-full flex flex-wrap items-center justify-center mb-2">
             <span>{marca} ®️​</span>
         </div>
        }

     

      <Link href={`/itemview/${id}`} className="mb-2 overflow-hidden ">
        <Image
          className="rounded object-cover"
          src={imageUrl}
          alt="Image"
          width={400}
          height={700}
          priority
        />
      </Link>

      
      
    </div>
  
  );
}
