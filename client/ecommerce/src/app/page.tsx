"use client";
import Card from "./components/card";
import ImageSlider from "./components/ImageSlider";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectItems } from "@/app/features/items/itemsSelectors";
import { useGetItemsQuery } from '../app/features/api/apiSlice'


export default function Home() {
  const items = useSelector(selectItems);
  
 const { data: itemsP, isLoading, error } = useGetItemsQuery();

  

useEffect(() => {
    if (isLoading) {
      console.log("Cargando...");
    } else if (error) {
      console.error("Error al cargar los datos:", error);
    } else if (itemsP) {
      console.log("Items recibidos:", itemsP);
    }
  }, [isLoading, itemsP, error]);

  


  return (
    <div className="flex flex-col items-center justify-center">
      <ImageSlider />

      <h1 className="font-bold text-3xl my-8 "> Man & Woman</h1>

      <section className="flex flex-wrap items-center sm:justify-start w-[350px] sm:w-[1000px]">
        {items.map((product) => (
          <Card
            key={product.id}
            title={product.name}
            imageUrl={product.photo}
            talla={product.talla}
            precio={product.price}
            id={product.id}
          />
        ))}
      </section>
    </div>
  );
}
