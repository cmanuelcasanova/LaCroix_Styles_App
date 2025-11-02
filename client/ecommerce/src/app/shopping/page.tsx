"use client";
import { Caritem } from "../components/caritem";
import { selectItemsc } from "@/app/features/Car/CarSelector";
import { useSelector } from "react-redux";
import { TbShoppingCartOff } from "react-icons/tb";
import { TbArrowBackUp } from "react-icons/tb";
import { useRouter } from "next/navigation";

export default function Shopping() {

  
  const itemsC = useSelector(selectItemsc);
   const router = useRouter();
  

const calculartotal = ():number => {return itemsC.reduce((totale, item) => totale + (item.precio*item.cant),0 )}
 

return (
    <div className="flex flex-col items-center">
      <div className="w-dvw sm:w-[700px] h-[800px] flex flex-col items-center rounded-2xl mt-20 bg-gray-300 px-8">
        <h1 className="text-2xl font-bold my-10">Shopping Cart</h1>

        {itemsC.length ===0 && <TbShoppingCartOff size={80}/>}

        {itemsC.map((product) => {

         
          
         
          //setTotal((prev) => (prev + product.precio))
          return (
            <Caritem
              key={product.id}
              title={product.title}
              idProduct={product.idProduct}
              talla={product.talla}
              precio={product.precio}
              id={product.id}
              cant={product.cant}
              imgurl={product.imgUrl}
            />
          );
        })}

        <br />
        <br />

        <div className="flex flex-wrap w-[150px] rounded-2xl items-center justify-center ml-auto bg-white p-2">
        <h1 className="text-2xl font-bold ">Total: {calculartotal()} $ </h1>
        </div>
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
