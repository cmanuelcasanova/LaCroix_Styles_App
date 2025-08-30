"use client";
import Card from "./components/card";
import ImageSlider from "./components/ImageSlider";

import { useEffect } from "react";
import { useGetItemsQuery } from './services/api/productsApi.ts'
import LoadingModal from "./components/Loadingpage";


export default function Home() {
//  const items = useSelector(selectItems);
  
 const { data: itemsP, isLoading, error } = useGetItemsQuery();

  

useEffect(() => {
    if (isLoading) {
      <LoadingModal />
    } else if (error) {
      console.error("Error al cargar los datos:", error);
    } 
  }, [isLoading, itemsP, error]);

  


  return (
    <div className="flex flex-col items-center justify-center">
      <ImageSlider />

      <h1 className="font-bold text-3xl my-8 "> Man & Woman</h1>

      <section className="flex flex-wrap items-center sm:justify-start w-[350px] sm:w-[1000px]">
        {itemsP?.map((product) => (
          <Card
            key={product.id}
            title={product.title}
            imageUrl={product.imageUrl}
            talla={product.talla}
            precio={Number(product.precio)}
            id={(product.id)}
          />
        ))}
      </section>
    </div>
  );
}
