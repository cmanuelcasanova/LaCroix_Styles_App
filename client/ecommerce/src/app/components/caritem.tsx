"use client";
import Image from "next/image";
import { IoMdAddCircle } from "react-icons/io";
import { IoRemoveCircle } from "react-icons/io5";
import { FaRegTrashCan } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { removeItem, updateItem } from "@/app/features/Car/CarSlice";

type caritem = {
  id: string;
  title: string;
  precio: number;
  talla: string;
  imgurl: string;
  cant: number;
};

export const Caritem = ({
  id,
  title,
  precio,
  talla,
  imgurl,
  cant,
}: caritem) => {
  const dispatch = useDispatch();

  const imgurlmin = imgurl.replace("LaCroix/", "LaCroix/tr:w-100,h-100/");


  const reduce = () => {
    if (cant > 1) {
      dispatch(updateItem({ id: id, cant: cant - 1,precio: precio * (cant-1) }));
    }
    }

  const addm = () => {
      dispatch(updateItem({ id: id, cant: cant + 1, precio: precio * (cant+1) }));
    
  };

  const remove = () => {
    dispatch(removeItem(id));
  };

  return (
    <div className="flex flex-wrap justify-between rounded-2xl bg-white w-full mb-4">
      <Image
        src={imgurlmin}
        height={100}
        width={100}
        alt="Logo"
        className="object-contain rounded-l-2xl"
      />

      <div className="flex flex-col items-center mr-auto ml-2 py-6 justify-start">
        <h1>
          {" "}
          Title: <span className="font-bold">{title}</span>{" "}
        </h1>
        <h1>
          {" "}
          Talla: <span className="font-bold">{talla}</span>{" "}
        </h1>
      </div>
      <section className="flex flex-wrap justify-between items-center gap-2 mr-10 ml-4">
        <button onClick={reduce}>
          <IoRemoveCircle size={25} />
        </button>
        {cant}
        <button onClick={addm}>
          <IoMdAddCircle size={25} />
        </button>
        <button onClick={remove} className="ml-6">
          <FaRegTrashCan size={25} />
        </button>
      </section>

      <div className="flex flex-col  mr-6 items-center justify-center w-[120px]">
        <h1 className="px-2">Precio: </h1>
        <h1 className="font-bold text-3xl px-2">{precio * cant} $</h1>
      </div>
    </div>
  );
};
