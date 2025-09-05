"use client";
import Card from "./components/card";
import ImageSlider from "./components/ImageSlider";
import { useGetItemsQuery } from './services/api/productsApi.ts'
import  ErrorConection  from "../app/components/errorConection"
import LoadingModal from "./components/Loadingpage";
import { useSelector } from "react-redux";
import { selectTheme } from "@/app/features/theme/themeSelector";
import { addFilters } from "@/app/features/filter/FilterSlice" 
import { setItems } from "@/app/features/items/itemsSlice" 
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { useEffect } from "react";
import { filteritem } from "@/app/features/filter/FilterTypes"


type filteritems = {

  categoria: filteritem[],
  talla:filteritem[],
  color:filteritem[]

}





export default function Home() {
 const theme = useSelector(selectTheme);
const dispatch = useDispatch<AppDispatch>();
  

  
 const { data: itemsP, isLoading, error,isFetching } = useGetItemsQuery();


    const filteredItems = itemsP?.filter((pro) => {

      if (!pro.Seccion?.name) return false;

      if (theme === "ALL") return true;

      return pro.Seccion.name === theme;
    });

   

 useEffect(() => {
   if (!itemsP || !filteredItems || itemsP.length === 0) return;

  
    const filterget: filteritems = {categoria:[],talla:[],color:[]}


    filteredItems?.forEach((item) =>{

      const cat = filterget.categoria.find( i => i.name === item.category)
      
      if (cat) {
        cat.cant = cat.cant + 1
      }else {
        filterget.categoria.push({name: item.category, cant:1})
      }

      const col = filterget.color.find( i => i.name === item.color)
      
      if (col) {
        col.cant = col.cant + 1
      }else {
        filterget.color.push({name: item.color, cant:1})
      }

      const tal = filterget.talla.find( i => i.name === item.talla)

      if (tal) {
        tal.cant = tal.cant + 1
      }else {
        filterget.talla.push({name: item.talla, cant:1})
      }

       


      //filterget.categoria.push(item.category)
     // filterget.talla.push(item.talla)
      //filterget.color.push(item.color)
    })
    dispatch(addFilters( {category: filterget.categoria , color: filterget.color, talla: filterget.talla   }  ))
    dispatch(setItems( filteredItems.length))
}, [filteredItems, dispatch, itemsP ]);



if (isLoading || isFetching) return <LoadingModal />;
if (error) return <ErrorConection />;


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


    </div>
  );
}
