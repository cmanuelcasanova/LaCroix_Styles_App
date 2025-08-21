"use client";
import { Caritem } from "../components/caritem";
import { selectItemsc } from "@/app/features/Car/CarSelector";
import { selectItems } from "@/app/features/items/itemsSelectors";
import { useSelector } from "react-redux";
import { TbShoppingCartOff } from "react-icons/tb";

export default function Shopping() {

  
  const itemsC = useSelector(selectItemsc);
  const items = useSelector(selectItems);

const calculartotal = ():number => {return itemsC.reduce((totale, item) => totale + item.precio,0 )}
 
console.log(itemsC)
return (
    <div className="flex flex-col items-center">
      <div className="w-[700px] h-[800px] flex flex-col items-center rounded-2xl mt-20 bg-gray-300 px-8">
        <h1 className="text-2xl font-bold my-10">Shopping Cart</h1>

        {itemsC.length ===0 && <TbShoppingCartOff size={80}/>}

        {itemsC.map((product) => {

         
          const match = items.find((item) => item.id === product.id);

          if (!match) return null // Evita errores si no hay coincidencia
          
         
          //setTotal((prev) => (prev + product.precio))
          return (
            <Caritem
              key={match.id}
              title={match.name}
              talla={match.talla}
              precio={match.price}
              id={match.id}
              cant={product.cant}
              imgurl={match.photo}
            />
          );
        })}

        <br />
        <br />

       
        <h1 className="text-2xl font-bold ml-auto mr-4">Total: $ {calculartotal()} </h1>
      </div>
    </div>
  );
}
