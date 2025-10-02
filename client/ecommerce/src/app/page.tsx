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
import { selectUsername } from "@/app/features/auth/authSelectors";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { themeBg } from "@/app/themeStyles"
import { PiEmptyBold } from "react-icons/pi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { addSelectFilters } from "@/app/features/selectedFilter/selectedFilterSlice" 





type filteritems = {

  categoria: filteritem[],
  talla:filteritem[],
  color:filteritem[],
  price_min:number,
  price_max:number

}





export default function Home() {
 const itemsforpage = 9
 const theme = useSelector(selectTheme);
 const Username = useSelector(selectUsername);
 const dispatch = useDispatch<AppDispatch>();
 const bgClass = themeBg[theme]
 const [paginf, setPagInf] = useState<number>(0)
 const [pagsup, setPagSup] = useState<number>(itemsforpage)
 const [currentPage, setCurrentPage] = useState<number>(0)
 const [totalpaginas, setTotalpaginas] = useState<number>(0)
 const UserFilters = useSelector(selectedFiltersG);
 const [allProducts, setAllProducts] = useState<product[] | undefined>([]);
 const [filteredProducts, setFilteredProducts] = useState<product[] | undefined>([]);
 const { data: Productos, isLoading, error,isFetching } = useGetItemsQuery();
 const { data: profile, isLoading: Loading_Profile , isFetching:Fetching_Profile } = useProfileQuery(undefined, {skip: !Username});


useEffect (() => {

if (filteredProducts) setTotalpaginas(Math.ceil(filteredProducts.length / itemsforpage))

},[filteredProducts])



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
  const matchSearch = UserFilters.search.length === 0 || pro.title.toLowerCase().includes(UserFilters.search.toLowerCase())

 
  return matchCategory && matchColor && matchTalla && matchpreciomin && matchpreciomax && matchSearch;
});



setFilteredProducts(filteredItemsbyFilters)


},[ allProducts , UserFilters.category ,UserFilters.talla , UserFilters.color, UserFilters.preciomin , UserFilters.preciomax ,UserFilters.search  ])
  

useEffect( ( ) => {  

  if(filteredProducts) dispatch(setItems( filteredProducts.length))
},[dispatch,filteredProducts])


useEffect(()=> {

  setPagInf (  (itemsforpage*currentPage)  )
  setPagSup (  (itemsforpage*(currentPage+1))  )

},[currentPage])


if (isLoading || isFetching) return <LoadingModal />;
if (error) return <ErrorConection />;




const handleft = () => {
 
  if( currentPage > 0 ) setCurrentPage( prev => prev - 1 )

}

const handright = () => {

  console.log("boton +")

  if( currentPage +1 < totalpaginas ) setCurrentPage( prev => prev +1) 
  
}

const handleClick = (i:number) => {

  setCurrentPage(i)


}



return (
    <div className="flex flex-col items-center justify-center">
      

      <ImageSlider />

      <h1 className="font-bold text-3xl my-8 "> Shopping with US </h1>

     
      { UserFilters.search &&
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6 ">
          <h1 className="font-extrabold text-black "  >  {`Resultados de la busqueda:  " ${UserFilters.search} " `}</h1>
          <IoIosCloseCircleOutline size={20} className="bg-gray-600 rounded-full text-white" onClick={()=> dispatch(addSelectFilters({search: ""})) }/>
       </div>
      }

      {filteredProducts && filteredProducts?.length > 0 ? 
      <section className="flex flex-wrap items-center sm:justify-start w-[350px] sm:w-[1000px]">
        { filteredProducts  ?.slice(paginf,pagsup).map((product) => (
          

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
      : <div className="flex flex-col items-center justify-center my-8"> 
          <PiEmptyBold size={70} className="text-gray-600"/>
          <h1> No hay resultados</h1>
        </div>
        }


      <div className="flex flex-wrap gap-2 mt-10 text-gray-500">
        <button className="bg-white p-2 rounded-2xl shadow mr-4" disabled={currentPage===0}  onClick={handleft}> <IoIosArrowBack /> </button>
        {Array.from({ length: totalpaginas }, (_, index) => <button key={index} className={`${ index+1 === currentPage+1 ? `${bgClass} underline text-black` : "bg-white" } p-2 rounded-2xl shadow  `} onClick={()=> handleClick(index)}> {index + 1} </button>)} 
        <button className="bg-white p-2 rounded-2xl shadow ml-4" disabled={currentPage+1===totalpaginas} onClick={handright}> <IoIosArrowForward /> </button>
      </div>

    </div>
  );
}
