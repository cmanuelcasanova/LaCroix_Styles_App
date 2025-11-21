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
import { useState , useEffect , useRef } from "react";
import { filteritem } from "@/app/features/filter/FilterTypes"
import { product } from "@/app/services/api/queryTypes" 
import { setUser } from "@/app/features/auth/authSlice";
import { useLazyProfileQuery } from "@/app/services/api/usersApi";
import { selectUsername } from "@/app/features/auth/authSelectors";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { themeBg } from "@/app/themeStyles"
import { PiEmptyBold } from "react-icons/pi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { addSelectFilters } from "@/app/features/selectedFilter/selectedFilterSlice" 
import { useGetHomeImagesQuery } from "@/app/services/api/fileApi"
import { BiArrowToLeft } from "react-icons/bi";
import { BiArrowToRight } from "react-icons/bi";





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
 const first_time = useRef(true)
 const bgClass = themeBg[theme]
 const [paginf, setPagInf] = useState<number>(0)
 const [pagsup, setPagSup] = useState<number>(itemsforpage)
 const [currentPage, setCurrentPage] = useState<number>(0)
 const [totalpaginas, setTotalpaginas] = useState<number>(0)
 const UserFilters = useSelector(selectedFiltersG);
 const [allProducts, setAllProducts] = useState<product[] | undefined>([]);
 const [filteredProducts, setFilteredProducts] = useState<product[] | undefined>([]);
 const { data: Productos, isLoading, error,isFetching } = useGetItemsQuery();
 const { data: HomeImages } = useGetHomeImagesQuery();
 const [ images, setImages ] = useState<string[]>([])
 
 const [play_LazyGetProfile, { data: profile,isLoading: Loading_Profile, isFetching:Fetching_Profile}] = useLazyProfileQuery();

useEffect (() => {

if (filteredProducts) setTotalpaginas(Math.ceil(filteredProducts.length / itemsforpage))

},[filteredProducts])



useEffect(() => {

    if(first_time) {
      first_time.current=(false)
    }

    try {
      
      const result = play_LazyGetProfile().unwrap 

    }catch(error_profile){ console.log(error_profile)}

  
}, [Username,play_LazyGetProfile]);



useEffect(() => {

  if(HomeImages) {

    setImages(HomeImages.map( i => i.imageurl  ))

  }

},[HomeImages])


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

if(UserFilters.orderPrice===1) filteredItemsbyFilters?.sort((a,b) => a.precio - b.precio )
if(UserFilters.orderPrice===2) filteredItemsbyFilters?.sort((a,b) => b.precio - a.precio )

setFilteredProducts(filteredItemsbyFilters)


},[ allProducts , UserFilters.category ,UserFilters.talla , UserFilters.orderPrice, UserFilters.color, UserFilters.preciomin , UserFilters.preciomax ,UserFilters.search  ])
  

useEffect( ( ) => {  

  if(filteredProducts) dispatch(setItems( filteredProducts.length))
},[dispatch,filteredProducts])


useEffect(()=> {

  setPagInf (  (itemsforpage*currentPage)  )
  setPagSup (  (itemsforpage*(currentPage+1))  )

},[currentPage])



useEffect(()=> {

setCurrentPage(0)
  },[UserFilters.orderPrice])


if (isLoading || isFetching ) return <LoadingModal />;

if (error) return <ErrorConection />;




const handleft = () => {
 
  if( currentPage > 0 ) setCurrentPage( prev => prev - 1 )
     window.scrollTo(0, 0)
}

const handright = () => {

  console.log("boton +")

  if( currentPage +1 < totalpaginas ) setCurrentPage( prev => prev +1) 
   window.scrollTo(0, 0)
}

const handleClick = (i:number) => {

  setCurrentPage(i)
  window.scrollTo(0, 0)


}




return (
    <div className="flex flex-col items-center justify-center">
      

      <ImageSlider imageUrls={images}/> 

      <h1 className="font-bold text-3xl mt-10 mb-16 "> Shopping with US </h1>

     
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
            imageUrl={ product.product_images[0] ? product.product_images[0].imageurl : "https://ik.imagekit.io/wakm0y68u/LaCroix/default-Image.png"}
            talla={product.Tallas}
            precio={Number(product.precio)}
            id={(product.id)}
            
          />
        ))}
      </section>
      : <div className="flex flex-col items-center justify-center my-8"> 
         
        </div>
        }


      <div className="flex flex-wrap gap-2 mt-10 text-gray-500">
        {currentPage+1 > 1 && <button className={`text-black/70 bg-white/60 px-[4px] rounded-2xl shadow  `} onClick={()=> setCurrentPage(0)}> <BiArrowToLeft /> </button> } 
        <button className={`bg-white/60  px-[4px] rounded-2xl shadow mr-4 hover:cursor-pointer ${currentPage+1 ===1 && `hidden` }  ` } disabled={currentPage===0}  onClick={handleft}> <IoIosArrowBack /> </button>
       
        {Array.from({ length: totalpaginas }, (_, index) => <button key={index} className={`hover:cursor-pointer ${ index+1 === currentPage+1 ? `${bgClass} underline text-black` : "bg-white" } ${(index+1 + 2 < currentPage+1 || index+1 - 2 > currentPage+1) && `hidden`} p-[6px] rounded-2xl shadow  `} onClick={()=> handleClick(index)}> {index + 1} </button>)} 
       
        {(totalpaginas> 3 && currentPage +1 < totalpaginas) && <button className={`text-black `}> ... </button> } 
        <button className={`bg-white/60  px-[4px] rounded-2xl shadow ml-4 hover:cursor-pointer ${currentPage+1 ===totalpaginas && `hidden` } `} disabled={currentPage+1===totalpaginas} onClick={handright}> <IoIosArrowForward /> </button>
         {currentPage +1 < totalpaginas  && <button className={`text-black/60 bg-white/60 px-[4px] rounded-2xl shadow  `} onClick={()=> setCurrentPage(totalpaginas-1)}> <BiArrowToRight /> </button> } 
      </div>

    </div>
  );
}
