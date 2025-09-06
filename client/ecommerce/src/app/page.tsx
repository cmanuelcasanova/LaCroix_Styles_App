"use client";
import Card from "./components/card";
import ImageSlider from "./components/ImageSlider";
import { useGetItemsQuery } from './services/api/productsApi.ts'
import  ErrorConection  from "../app/components/errorConection"
import LoadingModal from "./components/Loadingpage";
import { useSelector } from "react-redux";
import { selectTheme } from "@/app/features/theme/themeSelector";
import { selectedFiltersG } from "@/app/features/selectedFilter/selectedFilterSelector"
import { addFilters } from "@/app/features/filter/FilterSlice" 
import { setItems } from "@/app/features/items/itemsSlice" 
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { useState , useEffect } from "react";
import { filteritem } from "@/app/features/filter/FilterTypes"
import { product } from "@/app/services/api/queryTypes" 


type filteritems = {

  categoria: filteritem[],
  talla:filteritem[],
  color:filteritem[]

}





export default function Home() {
 const theme = useSelector(selectTheme);
const dispatch = useDispatch<AppDispatch>();
 const UserFilters = useSelector(selectedFiltersG);
 const [allProducts, setAllProducts] = useState<product[] | undefined>([]);
 const [filteredProducts, setFilteredProducts] = useState<product[] | undefined>([]);
 
  

  
 const { data: Productos, isLoading, error,isFetching } = useGetItemsQuery();

useEffect( ()=> {  
    const ProductbySeccion = Productos?.filter((pro) => {

      if (!pro.Seccion?.name) return false;

      if (theme === "ALL") return true;

      
      return pro.Seccion.name === theme;
    });
    setAllProducts(ProductbySeccion)
},[ Productos, theme ])

   

 useEffect(() => {
   if (!filteredProducts || !filteredProducts || filteredProducts.length === 0) return;

  
    const filterget: filteritems = {categoria:[],talla:[],color:[]}


    filteredProducts?.forEach((item) =>{

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
    })
    dispatch(addFilters( {category: filterget.categoria , color: filterget.color, talla: filterget.talla   }  ))
    dispatch(setItems( filteredProducts.length))



}, [allProducts,filteredProducts, dispatch, Productos ]);




useEffect( ( ) => {   
 const filteredItemsbyFilters = allProducts?.filter((pro) => {


  const matchCategory = UserFilters.category.length === 0 || UserFilters.category.some(i => i === pro.category);
  const matchColor = UserFilters.color.length === 0 || UserFilters.color.some(i => i === pro.color);
  const matchTalla = UserFilters.talla.length === 0 || UserFilters.talla.some(i => i === pro.talla);
  

  return matchCategory && matchColor && matchTalla;
});
setFilteredProducts(filteredItemsbyFilters)

},[ allProducts , UserFilters.category ,UserFilters.talla , UserFilters.color  ])
  







if (isLoading || isFetching) return <LoadingModal />;
if (error) return <ErrorConection />;


  return (
    <div className="flex flex-col items-center justify-center">
      

      <ImageSlider />

      <h1 className="font-bold text-3xl my-8 "> Shopping with US </h1>

      <section className="flex flex-wrap items-center sm:justify-start w-[350px] sm:w-[1000px]">
        { filteredProducts  ?.map((product) => (
          

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
