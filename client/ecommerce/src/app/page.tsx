"use client";
import Card from "./components/card";
import ImageSlider from "./components/ImageSlider";
import { useGetItemsQuery } from './services/api/productsApi.ts'
import LoadingModal from "./components/Loadingpage";
import { useSelector } from "react-redux";
import { selectTheme } from "@/app/features/theme/themeSelector";
import { SocialIcon } from 'react-social-icons'




export default function Home() {
//  const items = useSelector(selectItems);
 const theme = useSelector(selectTheme);
  
 const { data: itemsP, isLoading, error,isFetching } = useGetItemsQuery();

  

if (isLoading || isFetching) return <LoadingModal />;
if (error) return <p>Error al cargar los datos</p>;



const filteredItems = itemsP?.filter((pro) => {

  if (!pro.Category?.name) return false;

  if (theme === "ALL") return true;

  return pro.Category.name === theme;
});



  return (
    <div className="flex flex-col items-center justify-center">
      

      <ImageSlider />

      <h1 className="font-bold text-3xl my-8 "> Shopping with US </h1>

      <section className="flex flex-wrap items-center sm:justify-start w-[350px] sm:w-[1000px]">
        {filteredItems?.map((product) => (
          

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

        <div className="flex flex-wrap justify-between items-center gap-2 sm:gap-4 mt-20 my-6">
           <SocialIcon url="https://instagram.com" />
            <SocialIcon url="https://youtube.com" />
          <SocialIcon url="https://x.com" />
           <SocialIcon url="https://facebook.com" />
            <SocialIcon url="https://www.threads.com" />
            <SocialIcon url="https://www.tiktok.com/" />
            <SocialIcon url="https://www.whatsapp.com/" />
           
         
         

        </div>

    </div>
  );
}
