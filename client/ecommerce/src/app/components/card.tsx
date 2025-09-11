"use client";

import Image from "next/image";
import { useDispatch } from "react-redux";
import { addItem, removeItem } from "@/app/features/Car/CarSlice";
import { useEffect, useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { TbShoppingCartOff } from "react-icons/tb";
import { themeBgMap, themeBgMapHOpacity, themeText } from "@/app/themeStyles";
import { CiMenuKebab } from "react-icons/ci";
import { AppDispatch } from "../store";
import { useSelector } from "react-redux";
import { selectTheme } from "@/app/features/theme/themeSelector";
import { selectUsername } from "../features/auth/authSelectors";
import { selectItemsc } from "@/app/features/Car/CarSelector";
import { useRemoveItemMutation , useDeletePhotoMutation } from "@/app/services/api/productsApi";
import  ConfirmationtModal  from "@/app/components/confirmation"
import Link from "next/link";
import { useCreateItemCarMutation } from "@/app/services/api/ShoppingApi"

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
  const dispatch = useDispatch<AppDispatch>();
  const [carrito, setCarrito] = useState<boolean>(false);
  const theme = useSelector(selectTheme);
  const bgClass = themeBgMap[theme];
  const bgClassHOpa = themeBgMapHOpacity[theme];
  const themeTextCard = themeText[theme];
  const itemsC = useSelector(selectItemsc);
  const [detail, setDetails] = useState<boolean>(false);
  const UserS = useSelector(selectUsername);
  const [DeleteItem] = useRemoveItemMutation();
  const [deletePhoto] = useDeletePhotoMutation();
  const [modal, setModal] = useState<boolean>(false);
  const [borrar, setBorrar] = useState<boolean>(false);
  const [addItemCar] = useCreateItemCarMutation ();


  useEffect(() => {
    const find = itemsC.find((num) => num.id === id);
    if (find) {
      setCarrito(true);
    }
  }, [itemsC, id]);

  const handleAdd = () => {
    if (!carrito) {
      dispatch(
        addItem({
          id: id,
          cant: 1,
          precio: precio,
          imgUrl: imageUrl,
          title: title,
          talla: talla,
        })
      );
      setCarrito(true);

      try {
        addItemCar({
        title: title,
        talla: talla,
        cantidad: 1,
        precio: precio,
        userId: 1
      }).unwrap();
    }catch(error){console.log(error)}

    








    } else {
      dispatch(removeItem(id));
      setCarrito(false);
    }
  };


   useEffect(() => {
    try {

      if(borrar) {

         DeleteItem({ id: id }).unwrap();
         deletePhoto({ name: imageUrl.split("/").pop() }).unwrap();
      }
    } catch (err) {
      console.log(err);
    }
    }, [borrar,DeleteItem, deletePhoto, id,imageUrl]);




  const handleDelete = async () => {

      setModal(true)

    
  };

  return (


    <div className="bg-white relative flex flex-col items-center shadow-2xl rounded-2xl p-4 mb-6 mx-4 w-[300px]">
      
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

          {UserS && (
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
          className="rounded"
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
          className={`flex flex-wrap items-center justify-center gap-2 text-white font-bold rounded px-4 py-1 ${bgClassHOpa} ${
            carrito ? "bg-gray-500" : `bg-${bgClass}`
          }  active:scale-95 transition-transform duration-150 ease-in-out`}
        >
          {carrito ? (
            <>
              {" "}
              Quitar carrito <TbShoppingCartOff />{" "}
            </>
          ) : (
            <>
              Añadir carrito <FaCartShopping />{" "}
            </>
          )}
        </button>
      </div>
    </div>
  
  );
}
