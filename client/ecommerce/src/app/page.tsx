"use client";
import Card from "./components/card";
import ImageSlider from "./components/ImageSlider";
import { useGetItemsQuery } from '@/app/services/api/productsApi'
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
import { setUser } from "@/app/features/auth/authSlice";
import { useProfileQuery } from "@/app/services/api/usersApi";




type filteritems = {

  categoria: filteritem[],
  talla:filteritem[],
  color:filteritem[],
  price_min:number,
  price_max:number

}





export default function Home() {
 const theme = useSelector(selectTheme);
 const dispatch = useDispatch<AppDispatch>();
 const UserFilters = useSelector(selectedFiltersG);
 const [allProducts, setAllProducts] = useState<product[] | undefined>([]);
 const [filteredProducts, setFilteredProducts] = useState<product[] | undefined>([]);
 const { data: Productos, isLoading, error,isFetching } = useGetItemsQuery();
 const { data: profile, isLoading: Loading_Profile , isFetching:Fetching_Profile } = useProfileQuery();



  useEffect(() => {
   
    if(profile && !Loading_Profile && !Fetching_Profile)
      dispatch( setUser ({ isAuthenticated: true, user: profile.user, username: profile.username , role: profile.role})) ;
  }, [profile,dispatch,Fetching_Profile,Loading_Profile]);



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

  
    const filterget: filteritems = {categoria:[],talla:[],color:[],price_min:0,price_max:1000}



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

      item.Tallas.forEach( t =>   {
        
        const tal = filterget.talla.find( i => i.name === t.name)

         if (tal) {
        tal.cant = tal.cant + 1
         }else {
        filterget.talla.push({name: t.name, cant:1})
        }

      }  )





    })
    dispatch(addFilters( {category: filterget.categoria , color: filterget.color, talla: filterget.talla   }  ))
    



}, [allProducts,filteredProducts, dispatch, Productos ]);




useEffect( ( ) => {   
 const filteredItemsbyFilters = allProducts?.filter((pro) => {


  const matchCategory = UserFilters.category.length === 0 || UserFilters.category.some(i => i === pro.category);
  const matchColor = UserFilters.color.length === 0 || UserFilters.color.some(i => i === pro.color);
  const matchTalla = UserFilters.talla.length === 0 || pro.Tallas.some (i => UserFilters.talla.includes(i.name));
  const matchpreciomin = pro.precio >= UserFilters.preciomin  
  const matchpreciomax = pro.precio <= UserFilters.preciomax  

 
  return matchCategory && matchColor && matchTalla && matchpreciomin && matchpreciomax;
});



setFilteredProducts(filteredItemsbyFilters)


},[ allProducts , UserFilters.category ,UserFilters.talla , UserFilters.color, UserFilters.preciomin , UserFilters.preciomax   ])
  

useEffect( ( ) => {  

  if(filteredProducts) dispatch(setItems( filteredProducts.length))
},[dispatch,filteredProducts])




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
            talla={product.Tallas}
            precio={Number(product.precio)}
            id={(product.id)}
          />
        ))}
      </section>


    </div>
  );
}
