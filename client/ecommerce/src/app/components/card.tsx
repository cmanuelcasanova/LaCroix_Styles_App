"use client";

import Image from "next/image";
import { useDispatch } from "react-redux";
import { addItem } from "@/app/features/Car/CarSlice";

type CardProps = {
  id: string;
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

  const handleAdd = () => {
    dispatch(addItem({ id: id, cant: 1, precio: precio}));
  };

  return (
    <div className="bg-white flex flex-col items-center shadow-2xl p-4 mb-6 mx-4 w-[300px]">
      <h1 className="text-2xl font-extrabold mb-4"> {title} </h1>
      <h1 className="text-[#ff2992] mb-10">
        {" "}
        <span className="font-bold">
          Precio: <span className="text-black">$ {precio}</span>{" "}
        </span>{" "}
        <span className="font-bold">
          Talla: <span className="text-black">{talla} </span>
        </span>{" "}
      </h1>

      <Image
        src={imageUrl}
        alt="Image"
        width={400}
        height={700}
        loading="lazy"
      />

      <div className="flex flex-wrap items-center justify-around gap-8 pt-4 ">
        <button
          onClick={handleAdd}
          className="bg-[#fe298c] text-white font-bold rounded-2xl px-4 py-1 hover:bg-[#dd3369]"
        >
          Añadir carrito
        </button>
      </div>
    </div>
  );
}
