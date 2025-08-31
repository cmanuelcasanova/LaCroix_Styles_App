"use client";

import Image from "next/image";
//import { useState } from "react";
//import { themeBgMap, themeBgMapHOpacity, themeText } from "@/app/themeStyles";
//import { useSelector } from "react-redux";
//import { selectTheme } from "@/app/features/theme/themeSelector";
import { useGetItemQuery } from "../../services/api/productsApi.ts";
import LoadingModal from "../../components/Loadingpage";
import { useParams } from 'next/navigation';
import { skipToken } from '@reduxjs/toolkit/query';



interface itemProps {
  id: string;
}

export default function Item({ id }: itemProps) {
  //const theme = useSelector(selectTheme);
 const params = useParams();
const id_item = params?.id?.toString();



const { data:item, isLoading, error, isFetching} = useGetItemQuery(id_item ? {id: id_item} : skipToken );


  if (isLoading || isFetching) return <LoadingModal />;
  if (error || !item) return <p>Artículo no encontrado</p>;


  



  return (
    <div className="bg-white flex flex-col items-center shadow-2xl mt-20 rounded-2xl p-4 mb-6 mx-4 w-dwv">
      
      
      <h1 className="text-2xl font-extrabold mb-4"> {item.title} </h1>

      <Image
              src={item.imageUrl}
              alt="Image"
              width={400}
              height={700}
              priority
            />
    </div>
  );
}
