"use client";
import Image from "next/image";
import { IoMdAddCircle } from "react-icons/io";
import { IoRemoveCircle } from "react-icons/io5";
import { FaRegTrashCan } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { removeItem, updateItem } from "@/app/features/Car/CarSlice";
import { useDeleteItemCarMutation , useUpdateItemCarMutation } from "@/app/services/api/ShoppingApi"
import Link from "next/link";

type caritem = {
  id: string;
  title: string;
  precio: number;
  idProduct: number;
  talla: string;
  imgurl: string;
  cant: number;
};

export const Caritem = ({
  id,
  title,
  idProduct,
  precio,
  talla,
  imgurl,
  cant,
}: caritem) => {
  
  const dispatch = useDispatch();
  const imgurlmin = imgurl.replace("LaCroix/", "LaCroix/tr:h-100/");
  const [deleteItemCar] = useDeleteItemCarMutation();
  const [updateItemCarBD] = useUpdateItemCarMutation();
 

  const reduce = () => {
    if (cant > 1) {
      dispatch(updateItem({ id: id, cant: cant - 1,precio: precio  }));

      try {
        updateItemCarBD({productId: idProduct, talla: talla,  tipo:'SUB'}).unwrap();
      }catch(error){console.log(error)}
    }
    }

  const addm = () => {

      dispatch(updateItem({ id: id, cant: cant + 1 , precio: precio }));
      try {
        updateItemCarBD({productId: idProduct, talla: talla , tipo:'ADD'}).unwrap();
      }catch(error){console.log(error)}
    
  };

  const remove = () => {
    dispatch(removeItem(id));
    
    try {
        deleteItemCar({productId:idProduct , talla:talla }).unwrap();
        }catch(error){console.log(error)}
      
  };

  return (
    <div className="flex flex-wrap justify-around items-center rounded-2xl bg-white w-full h-[120px] sm:w-full mb-4">
      
       <Link href={`/itemview/${idProduct}`} className=" w-[20%]">
        <Image
          src={imgurlmin}
          height={80}
          width={80}
          alt="Logo"
          className="object-contain rounded-2xl"
        />
      </Link>

      <div className="flex flex-col w-[50%] sm:flex-row sm:flex-wrap sm:w-[400px] items-start ml-2 py-2 justify-start sm:gap-4 sm:pr-6">
        <div className="sm:mr-auto mr-4">
        <h1>
        
          Title: 
        </h1>
        <span className="font-bold">{title}</span>{" "}
        <h1>
        
          Talla: <span className="font-bold">{talla}</span>{" "}
        </h1>
      </div>
      <div className="flex flex-wrap justify-between items-start gap-2 mt-2 sm:ml-4">
        <button onClick={reduce}>
          <IoRemoveCircle size={25} />
        </button>
        {cant}
        <button onClick={addm}>
          <IoMdAddCircle size={25} />
        </button>
        <button onClick={remove} className="mx-auto">
          <FaRegTrashCan size={25} />
        </button>
      </div>
</div>
      <div className="flex flex-col items-center justify-center w-[20%] ">
        <h1 className="px-2">Precio: </h1>
        <h1 className="font-bold text-2xl px-2">{precio * cant} $</h1>
      </div>
    </div>
  );
};
