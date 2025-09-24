"use client";

import Image from "next/image";

import { useState, useEffect} from "react";
import LoadingModal from "../../components/Loadingpage";
import { useParams } from "next/navigation";
import { skipToken } from "@reduxjs/toolkit/query";
import { themeBg , themeBgMapHOpacity } from "@/app/themeStyles";
import { COLOR_PALETTE } from "@/app/components/params"
import { useSelector } from "react-redux";
import { selectTheme } from "@/app/features/theme/themeSelector";
import { FaCartShopping } from "react-icons/fa6";
import { TbShoppingCartOff } from "react-icons/tb";
import { TbArrowBackUp } from "react-icons/tb";
import { useRouter } from "next/navigation";
import { selectItemsc } from "@/app/features/Car/CarSelector";
import { useDispatch } from "react-redux";
import { selectUsername } from  "@/app/features/auth/authSelectors"
import { addItem, removeItem} from "@/app/features/Car/CarSlice";
import { selectRole } from "@/app/features/auth/authSelectors";
import { useRemoveItemMutation , useDeletePhotoMutation , useGetItemQuery} from "@/app/services/api/productsApi";
import  ConfirmationtModal  from "@/app/components/confirmation"
import { useCreateItemCarMutation , useDeleteItemCarMutation } from "@/app/services/api/ShoppingApi"




interface itemProps {
  id: string;
}

export default function Item({ id }: itemProps) {
  //const theme = useSelector(selectTheme);
  const params = useParams();
  const id_item = params?.id?.toString();
  const UserRole = useSelector(selectRole);
  const theme = useSelector(selectTheme);
  const tBg = themeBg[theme];
  const tBgH = themeBgMapHOpacity[theme];
  const [carrito, setCarrito] = useState<boolean>(false);
  const router = useRouter();
  const itemsC = useSelector(selectItemsc);
  const dispatch = useDispatch();
  const [DeleteItem] = useRemoveItemMutation();
  const [deletePhoto] = useDeletePhotoMutation();
  const [modal, setModal] = useState<boolean>(false);
  const [borrar, setBorrar] = useState<boolean>(false);
  const [addItemCar] = useCreateItemCarMutation ();
  const [deleteItemCar] = useDeleteItemCarMutation();
  const user = useSelector(selectUsername);
  const [selectedTallas, setSelectedTallas] = useState<string[]>([])

  const {
    data: item,
    isLoading,
    error,
    isFetching,
  } = useGetItemQuery(id_item ? { id: id_item } : skipToken);

  
  useEffect(() => {
      try {
  
        if(borrar && item?.id) {
  
           DeleteItem({ id: item?.id }).unwrap();
           deletePhoto({ name: item.imageUrl.split("/").pop() }).unwrap();
           router.push("/");
        }
      } catch (err) {
        console.log(err);
      }
      }, [borrar,DeleteItem, deletePhoto, item?.id, item?.imageUrl,router]);
  
  
  const handleDelete = async () => {

      setModal(true)

    
  };

  console.log(item)
  useEffect(() => {
    const find = itemsC.find((num) => num.id === item?.id);
    if (find) {
      setCarrito(true);
    }
  }, [itemsC, item?.id]);

  if (isLoading || isFetching) return <LoadingModal />;
  if (error || !item) return <p>Artículo no encontrado</p>;

  const handleAdd = () => {
    
    if(!carrito){ 
 
      
    dispatch(addItem({ id: item.id, cant: 1, precio: item.precio, imgUrl: item.imageUrl, title: item.title, talla: item.talla })) 
    setCarrito(true)
    if (user) {
      try {
        addItemCar({
        title: item.title,
        talla: item.talla,
        cantidad: 1,
        precio: item.precio,
        productId: item.id
      }).unwrap();
    }catch(error){console.log(error)}
  }

    }else{

       dispatch(removeItem(item.id))
      setCarrito(false)
       if (user) {
      try {
      
        deleteItemCar({productId: item.id}).unwrap();
        }catch(error){console.log(error)}
       }
    }
  
  };

  

  return (
    <div className={`flex flex-col items-center justify-center `}>

        {modal && <ConfirmationtModal onClose={() => setModal(false)} confirm={() => {setBorrar(true)}} />}
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

        <div
          className="h-[30px] w-[30px] border-black border-2 mr-auto"
          style={{ background:  COLOR_PALETTE.find((c)=> item.color === c.label )?.value }}
        ></div>

        <h1 className="mr-auto mt-4 mb-2"> TALLA: </h1>

        <div className="flex flex-wrap gap-2 mr-auto">
        {   item.Tallas.map( (element, index) =>   
        <div key={index} className="flex flex-col items-center justify-center h-[40px] w-[40px] rounded-full mr-auto font-bold bg-gray-300 ">
          { element.name}
        </div>)
        }
      </div>

        <h1 className="mr-auto mt-4 mb-2"> DETALLES: </h1>

        <textarea
          className="mr-auto"
          name="Detalles"
          id="Detalles"
          defaultValue="------"
        ></textarea>

        <button
          onClick={handleAdd}
          className={` ${carrito ? 'bg-gray-500' : tBg} rounded text-white w-full p-2 flex items-center gap-2 justify-center ${tBgH} active:scale-95 transition-transform duration-150 ease-in-out`}
        >
          {" "}
          {carrito ? (
            <>
              {" "}
              Quitar carrito <TbShoppingCartOff className="" />{" "}
            </>
          ) : (
            <>
              Añadir carrito <FaCartShopping className="" />{" "}
            </>
          )}{" "}
        </button>

        {UserRole==="ADMIN" && <>
        <button
          onClick={ ()=> {router.push(`/newproduct?mode=edit&id=${item.id}`);}}
          className= "bg-green-300 mt-4  rounded text-white w-full p-2 flex items-center gap-2 justify-center active:scale-95 transition-transform duration-150 ease-in-out"
        > Actualizar Producto 
        </button>
        
        <button
          onClick={ ()=> {handleDelete()}}
          className= "bg-red-400 mt-4  rounded text-white w-full p-2 flex items-center gap-2 justify-center active:scale-95 transition-transform duration-150 ease-in-out"
        > Eliminar Producto 
        </button>
        </>
        
        
        }

      </div>

      <button
        className="bg-white p-2 px-20 mt-4 rounded-2xl flex flex-wrap items-center gap-2 hover:bg-gray-200 active:scale-95 transition-transform duration-150 ease-in-out"
        onClick={() => router.push("/")}
      >
        {" "}
        <>
          <TbArrowBackUp /> Volver{" "}
        </>
      </button>
    </div>
  );
}
