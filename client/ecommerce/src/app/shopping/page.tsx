"use client";
import { Caritem } from "../components/caritem";
import { selectItemsc } from "@/app/features/Car/CarSelector";
import { selectItems } from "@/app/features/items/itemsSelectors";
import { h1 } from "framer-motion/client";
import { useSelector } from "react-redux";

export default function Shopping() {
  const itemsC = useSelector(selectItemsc);
  const items = useSelector(selectItems);

  console.log(items.length);
  console.log(itemsC.length);

  return (
    <div className="mt-20 flex flex-col items-center">
      <div className="w-[700px] h-[800px] flex flex-col items-center rounded-2xl mt-20 bg-gray-300 px-8">
        <h1 className="text-2xl font-bold  mb-10">Shopping Cart</h1>

        {itemsC.map((product) => {
          const match = items.find((item) => item.id === product.id);

          if (!match) return null; // Evita errores si no hay coincidencia

          return (
            <Caritem
              key={match.id}
              title={match.name}
              talla={match.talla}
              precio={match.price}
              id={match.id}
              imgurl={match.photo}
            />
          );
        })}
      </div>
    </div>
  );
}
