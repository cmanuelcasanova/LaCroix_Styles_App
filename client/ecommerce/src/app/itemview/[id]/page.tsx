"use client";

import { useState, useEffect } from "react";
import LoadingModal from "../../components/Loadingpage";
import { useParams } from "next/navigation";
import { skipToken } from "@reduxjs/toolkit/query";
import toast, { Toaster } from "react-hot-toast";
import { themeBg, themeBgMapHOpacity } from "@/app/themeStyles";
import { COLOR_PALETTE } from "@/app/components/params";
import { useSelector } from "react-redux";
import { selectTheme } from "@/app/features/theme/themeSelector";
import { FaCartShopping } from "react-icons/fa6";
import { TbArrowBackUp } from "react-icons/tb";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { selectUsername } from "@/app/features/auth/authSelectors";
import { addItem } from "@/app/features/Car/CarSlice";
import { selectRole } from "@/app/features/auth/authSelectors";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css"
import {
  useRemoveItemMutation,
  useDeletePhotoMutation,
  useGetItemQuery,
} from "@/app/services/api/productsApi";
import ConfirmationtModal from "@/app/components/confirmation";
import {
  useCreateItemCarMutation,
} from "@/app/services/api/ShoppingApi";

interface imagenes {

    original: string,
    thumbnail: string
}


export default function Item() {
  const params = useParams();
  const id_item = params?.id?.toString();
  const UserRole = useSelector(selectRole);
  const theme = useSelector(selectTheme);
  const tBg = themeBg[theme];
  const tBgH = themeBgMapHOpacity[theme];
  const router = useRouter();
  const dispatch = useDispatch();
  const [DeleteItem] = useRemoveItemMutation();
  const [deletePhoto] = useDeletePhotoMutation();
  const [modal, setModal] = useState<boolean>(false);
  const [borrar, setBorrar] = useState<boolean>(false);
  const [addItemCarBD] = useCreateItemCarMutation();
  const user = useSelector(selectUsername);
  const [selectedTallas, setSelectedTallas] = useState<string[]>([]);
  const [ImagenesArray, setImagenesArray] = useState<imagenes[]>([]);




  const {
    data: item,
    isLoading,
    error,
    isFetching,
  } = useGetItemQuery(id_item ? { id: id_item } : skipToken);

  useEffect(() => {
    try {
      if (borrar && item?.id) {
        DeleteItem({ id: item?.id }).unwrap();

        item.product_images.forEach ( i => { deletePhoto({ name: i.imageurl.split("/").pop() }).unwrap(); })
       
        router.push("/");
      }
    } catch (err) {
      console.log(err);
    }
  }, [borrar, DeleteItem, deletePhoto, item?.id, router, item?.product_images]);


    useEffect(() => {
  
      if(item) {
          const  images = item.product_images.map ( i => {


          return ( {  original: i.imageurl,
              thumbnail: i.imageurl.replace("LaCroix/", "LaCroix/tr:h-100/")  } )

          })

        setImagenesArray(images)
      }


    }, [item]);




  const handleDelete = async () => {
    setModal(true);
  };

  if (isLoading || isFetching) return <LoadingModal />;
  if (error || !item) return <p>Artículo no encontrado</p>;

  const handleAdd = () => {
    if (selectedTallas.length == 0) {
      toast("Debe seleccionar talla...");
      return;
    }

    toast("​🟢​ Agregado al carrito");
    selectedTallas.forEach((t) => {
      dispatch(
        addItem({
          id: item.id + t,
          idProduct: item.id,
          cant: 1,
          precio: item.precio,
          imgUrl: item.product_images[0].imageurl,
          title: item.title,
          talla: t,
          mode: "user",
        })
      );
    });

    if (user) {
      console.log(item);
      selectedTallas.forEach((t) => {
        try {
          addItemCarBD({
            title: item.title,
            talla: t,
            cantidad: 1,
            precio: item.precio,
            productId: item.id,
            mode: "user",
          }).unwrap();
        } catch (error) {
          console.log(error);
        }
      });
    }
    setSelectedTallas([]);
  };

  const tonglechange = (item: string) => {
    if (!selectedTallas.includes(item)) {
      setSelectedTallas([...selectedTallas, item]);
    } else {
      setSelectedTallas((prevItems) => prevItems.filter((j) => j !== item));
    }
  };




  return (
    <div className={`flex flex-col items-center justify-center `}>
      <Toaster />
      {modal && (
        <ConfirmationtModal
          onClose={() => setModal(false)}
          confirm={() => {
            setBorrar(true);
          }}
        />
      )}
      <div className="bg-white flex flex-col items-center shadow-2xl mt-20 rounded-2xl p-4 mb-6 mx-4 w-dwv">
        
       
          <ImageGallery items={ ImagenesArray }  additionalClass="custom-gallery-ItemView"/>
       

        <div className="flex flex-wrap justify-around items-center gap-4 mt-6 text-2xl font-extrabold w-full">
          <h1 className="mr-auto"> {item.title} </h1>
          <h1 className="ml-auto"> {item.precio} $ </h1>
        </div>

        <h1 className="mr-auto mt-4 mb-2"> COLOR: </h1>

        <div
          className="h-[30px] w-[30px] border-black border-2 mr-auto"
          style={{
            background: COLOR_PALETTE.find((c) => item.color === c.label)
              ?.value,
          }}
        ></div>

        <h1 className="mr-auto mt-4 mb-2"> TALLA: </h1>

        <div className="flex flex-wrap gap-2 mr-auto">
          {item.Tallas.map((element, index) => (
            <div
              key={index}
              className={`flex flex-col items-center justify-center h-[40px] w-[40px] rounded-full mr-auto font-bold ${
                selectedTallas.includes(element.name)
                  ? "bg-green-300 hover:bg-green-200  "
                  : "bg-gray-300 hover:bg-gray-200"
              } `}
              onClick={() => tonglechange(element.name)}
            >
              {element.name}
            </div>
          ))}
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
          className={`rounded ${tBg} text-white w-full p-2 flex items-center gap-2 justify-center ${tBgH} active:scale-95 transition-transform duration-150 ease-in-out`}
        >
          Añadir carrito <FaCartShopping className="" />
        </button>

        {UserRole === "ADMIN" && (
          <>
            <button
              onClick={() => {
                router.push(`/newproduct?mode=edit&id=${item.id}`);
              }}
              className="bg-green-300 mt-4  rounded text-white w-full p-2 flex items-center gap-2 justify-center active:scale-95 transition-transform duration-150 ease-in-out"
            >
              {" "}
              Actualizar Producto
            </button>

            <button
              onClick={() => {
                handleDelete();
              }}
              className="bg-red-400 mt-4  rounded text-white w-full p-2 flex items-center gap-2 justify-center active:scale-95 transition-transform duration-150 ease-in-out"
            >
              {" "}
              Eliminar Producto
            </button>
          </>
        )}
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
