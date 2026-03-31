"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../../public/LogoLAcroixStyles.png";
import { FaSearch } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { CiLogin } from "react-icons/ci";
import { RxInput } from "react-icons/rx";
import { CiMenuKebab } from "react-icons/ci";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useSelector } from "react-redux";
import { selectItemsc } from "@/app/features/Car/CarSelector";
import { selectTheme } from "@/app/features/theme/themeSelector";
import { selectRole , selectUsername } from "../features/auth/authSelectors";
import { Themetype } from "../features/theme/themeTypes";
import { setTheme } from "@/app/features/theme/themeSlice";
import { MdNoteAdd } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { GoSignOut } from "react-icons/go";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { themeBgMap, themeBgOpa } from "@/app/themeStyles";
import { useRouter } from "next/navigation";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { TbAdjustmentsHorizontal } from "react-icons/tb";
import { selectHasFilters } from "@/app/features/selectedFilter/selectedFilterSelector"
import FilterBar from "./Filters";
import { addSelectFilters, clearSelectFilters } from "@/app/features/selectedFilter/selectedFilterSlice" 
import { IoMdCloseCircle } from "react-icons/io";
import { selectedFiltersG } from "@/app/features/selectedFilter/selectedFilterSelector"
import { RiStarFill } from "react-icons/ri";
import { Reset_Page } from "@/app/features/CurrentPage/CurrentPageSlice"





export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuFiltros, setMenuFiltros] = useState(false);
  const itemsC = useSelector(selectItemsc);
  const theme = useSelector(selectTheme);
  const Username = useSelector(selectUsername);
  const UserRole = useSelector(selectRole);
  const dispatch = useDispatch<AppDispatch>();
  const bgClass = themeBgMap[theme];
  const bgClassOpa = themeBgOpa[theme];
  const router = useRouter();
  const HadFilters = useSelector( selectHasFilters )  ;
  const [viewsearch, setViewSearch] = useState<boolean>(false) 
  const [textsearch , setTextSearch] = useState<string>("")
  const UserFilters = useSelector(selectedFiltersG);
  const inputRef = useRef<HTMLInputElement>(null); 
 


  useEffect(() => {
    document.body.classList.remove("bg-[#ff8ec9]","bg-[#c37ff0]","bg-[#4e8bc0]","bg-[#fe871e]","bg-woman", "bg-men", "bg-boy", "bg-all");

    switch (theme) {
      case Themetype.WOMAN:
        document.body.classList.add("bg-woman");
        break;
      case Themetype.MEN:
        document.body.classList.add("bg-men");
        break;
      case Themetype.KIDS:
        document.body.classList.add("bg-boy");
        break;
      case Themetype.ALL:
      default:
        document.body.classList.add("bg-all");
        break;
    }
  }, [theme]);

  const cartCount = itemsC.length;

useEffect(() => {
 
  if (viewsearch && inputRef.current) {
    inputRef.current.focus();
  }
}, [viewsearch]);


useEffect(() => {
 
  setTextSearch(UserFilters.search)
  
  
}, [UserFilters.search]);






  return (
    <nav
      className={`px-4 py-1 flex items-center w-screen justify-between fixed top-0 z-50 text-white font-bold ${bgClassOpa}`}
    >
      <Link
        href={"/"}
        onClick={() => {setMenuOpen(false),window.scrollTo(0, 0)} }
        className="active:scale-95 transition-transform duration-150 ease-in-out"
      >
        <Image src={Logo} height={40} alt="Logo" priority />
      </Link>
      {/* Categorías flotantes en desktop */}

      <div className="sm:flex flex-wrap justify-between hidden items-center w-[250px] ">
        <button
          className={` hover:underline rounded-2xl ${theme==='WOMAN' && `underline font-extrabold`}   `}
          onClick={() => {
            router.push("/");
            dispatch(setTheme(Themetype.WOMAN));
            dispatch( clearSelectFilters());
            dispatch( Reset_Page() );
            window.scrollTo(0,0)
          }}
        >
          WOMAN
        </button>

        <button
           className={` hover:underline rounded-2xl ${theme==='MEN' && `underline font-extrabold`}   `}
          onClick={() => {
            router.push("/");
            dispatch(setTheme(Themetype.MEN));
            dispatch( clearSelectFilters());
            dispatch( Reset_Page() );
            window.scrollTo(0,0)
          }}
        >
          MEN
        </button>

        <button
           className={` hover:underline rounded-2xl ${theme==='KIDS' && `underline font-extrabold`}   `}
          onClick={() => {
            router.push("/");
            dispatch(setTheme(Themetype.KIDS));
            dispatch( clearSelectFilters());
            dispatch( Reset_Page() );
            window.scrollTo(0,0)
          }}
        >
          KIDS
        </button>

        <button
           className={` hover:underline rounded-2xl ${theme==='ALL' && `underline font-extrabold`}   `}
          onClick={() => {
            router.push("/");
            dispatch(setTheme(Themetype.ALL));
            dispatch( clearSelectFilters());
            dispatch( Reset_Page() );
            window.scrollTo(0,0)
          }}
        >
          ALL
        </button>
      </div>

      {/* Buscador centrado solo en desktop */}
      <div className="hidden md:block self-center items-center rounded-r-sm">
        <label
          className={`bg-${bgClass} flex items-center font-normal rounded-r-sm`}
        >
          <input
            type="text"
            placeholder="Buscar productos..."
            className="bg-white border-white rounded-l-sm text-gray-700 w-[250px] px-4 py-1 focus:outline-none"
            value={textsearch}
            onChange={(e)=> setTextSearch(e.target.value)}
         />
          
           { UserFilters.search &&   
              <button 
                className="bg-gray-300 w-8 h-8 flex flex-col justify-center items-center"
                onClick={()=> dispatch(addSelectFilters({search: ""}), setTextSearch(""),setViewSearch(false))}
              >  <IoMdCloseCircle size={15} /> </button>
              }
              
              <button 
              className="bg-[#fe9ccf] w-8 h-8 flex flex-col justify-center items-center rounded-r-sm"
              onClick={()=> {dispatch(addSelectFilters({search: textsearch})  ); setViewSearch(false) }}
              >  <FaSearch size={15} /> 
              </button>



        </label>
      </div>




          {/* Filtros Icono Barras  */}

              <div>
          <button
            className={`text-white ml-4 mt-[3px] relative shadows-black `}
            onClick={() => {setMenuFiltros(!menuFiltros); setMenuOpen(false);}}
          >
            <TbAdjustmentsHorizontal size={35} />

            {HadFilters && <RiStarFill className="text-red-600 absolute top-0 right-0"/>}
          </button>
         
          </div>




          {/* Menú móvil en bloque */}
          {menuFiltros && (
            <div
              className={`fixed top-0 right-0 h-full w-full sm:w-100 bg-${bgClass} px-4 py-3 overflow-scroll shadow-lg z-40 transform transition-transform duration-300 ease-in-out 
      
`}
            >
              <div className="flex flex-wrap items-center justify-between m-4 w-full pr-4 border-b-2 pb-2 mb-10">

              {<TbAdjustmentsHorizontal className="mr-2"size={30} />}
              <h1 className="text-2xl mr-auto">   Filtros de busqueda  </h1>
              < IoMdCloseCircleOutline size={30}  onClick={() => setMenuFiltros(!menuFiltros)}/> 

                

              </div>

              <FilterBar onClose={()=> setMenuFiltros(false)}/>


             
              
            </div>
          )}
          {/* FIN  MENU FILTRO */}





      {/* Auth + Carrito en desktop */}

      {UserRole!=="ADMIN" && (
        <div className="hidden md:flex items-center gap-4  text-white mr-6">
          <Link
            href="/login"
            className="flex items-center gap-2 hover:underline"
          >
            <CiLogin />
            LOGIN
          </Link>
          <Link
            href="/registro"
            className="flex items-center gap-2 hover:underline"
          >
            <RxInput />
            REGISTRO
          </Link>
        </div>
      )}






        
        <div className="flex flex-wrap gap-4">
           {Username && (
          <Link
            href="/profile"
            className="flex items-center gap-2 ml-4 sm:ml-0 hover:underline"
          >
            <FaUserCircle size={25} />
            
          </Link>)}
          {UserRole==="ADMIN"  && (<>
          <Link
              href={{
              pathname: "/newproduct",
              query: { mode: "create" }
            }}
            className="sm:flex sm:items-center gap-2 hidden  hover:underline"
          >
            <MdNoteAdd size={25} />
            {"Agregar"}
          </Link>

          <Link
            href="/logout"
            className="sm:flex sm:items-center gap-2 hidden hover:underline"
          >
            <GoSignOut size={25} />
            {"Salir"}
          </Link> </>)}
        </div>
      




          {/* Busqueda Nueva Icono Lupa  */}

          <button 
            className="sm:hidden ml-auto relative"
            onClick={
              ()=> {setViewSearch(prev => !prev);
         
    
            }}>
            <FaSearch size={22} />
          </button>
          
          { viewsearch && 
          
            <div className="flex flex-nowrap border-1 border-black inset-x-0 items-center justify-center absolute w-full top-full">
              
              <input 
                type="text"
                className="bg-white  inset-x-0  h-10 text-black p-2 w-full"
                placeholder="Buscar..."
                value={textsearch}
                ref={inputRef}
                onChange={(e)=> setTextSearch(e.target.value)}
              >
              </input>

              { UserFilters.search &&   <button 
                className="bg-gray-300 w-10 h-10 flex flex-col justify-center items-center"
                onClick={()=> dispatch(addSelectFilters({search: ""}), setTextSearch(""),setViewSearch(false))}
              >  <IoMdCloseCircle size={22} /> </button>
              }
              <button 
              className="bg-[#fe9ccf] w-10 h-10 flex flex-col justify-center items-center"
              onClick={()=> {dispatch(addSelectFilters({search: textsearch})  ); setViewSearch(false)}}
              >  <FaSearch size={22} /> </button>
            </div>
          }

          

            {/* Carrito Icono */}

      <Link
        href="/shopping"
        className="relative ml-4 sm:ml-4 mr-4 sm:mr-10 "
        onClick={() => setMenuOpen(false)}
      >
        <FaCartShopping
          size={25}
          className="active:scale-95 transition-transform duration-150 ease-in-out"
        />
        {cartCount > 0 && (
          <span
            className={`absolute -top-2 -right-2 bg-${bgClass} text-white text-xs rounded-full pt-1 border-2 border-white px-1`}
          >
            {cartCount}
          </span>
        )}
      </Link>

      {/* Hamburguesa móvil */}

      <button
        className="md:hidden text-white"
        onClick={() => {setMenuOpen(!menuOpen);setMenuFiltros(false)}}
      >
        {menuOpen ? (
          <IoIosCloseCircleOutline size={30} />
        ) : (
          <CiMenuKebab size={30} />
        )}
      </button>

       <div
          className={`absolute inset-x-0 top-full ${bgClassOpa} px-4 rounded text-white text-l md:hidden `}
        >
          <div className="flex flex-wrap items-center justify-between gap-4 my-[6px] ">

            <button
              className={` hover:underline rounded-2xl ${theme==='ALL' && `underline font-extrabold`}   `}
              onClick={() => {
                setMenuOpen(false);
                router.push("/");
                dispatch(setTheme(Themetype.ALL));
                dispatch( clearSelectFilters());
                dispatch( Reset_Page() );
                window.scrollTo(0,0)
              }}
            >
              ALL
            </button>

             <button
             className={` hover:underline rounded-2xl ${theme==='WOMAN' && `underline font-extrabold`}   `}
              onClick={() => {
                setMenuOpen(false);
                router.push("/");
                dispatch(setTheme(Themetype.WOMAN));
                dispatch( clearSelectFilters()); 
                dispatch( Reset_Page() );
                window.scrollTo(0,0)
              }}
            >
              WOMAN
            </button>

            <button
              className={` hover:underline rounded-2xl ${theme==='MEN' && `underline font-extrabold`}   `}
              onClick={() => {
                setMenuOpen(false);
                router.push("/");
                dispatch(setTheme(Themetype.MEN));
                dispatch( clearSelectFilters());
                dispatch( Reset_Page() );
                window.scrollTo(0,0)
              }}
            >
              MEN
            </button>

            <button
              className={` hover:underline rounded-2xl ${theme==='KIDS' && `underline font-extrabold`}   `}
              onClick={() => {
                setMenuOpen(false);
                router.push("/");
                dispatch(setTheme(Themetype.KIDS));
                dispatch( clearSelectFilters());
                dispatch( Reset_Page() );
                window.scrollTo(0,0)
              }}
            >
              KIDS
            </button>

      


          </div>
      
      </div>

      {/* Menú móvil en bloque */}
      {menuOpen && (
        <div
          className={`absolute inset-x-0 top-full bg-${bgClass} px-4 py-3 rounded shadow text-gray-800 md:hidden z-40`}
        >
  


          {UserRole==="ADMIN"  && <Link
            href={{
              pathname: "/newproduct",
              query: { mode: "create" }
            }}

            className="flex flex-wrap items-center my-4 bg-white p-2 rounded gap-2 hover:underline"
            onClick={() => setMenuOpen(false)}
          >
            <MdNoteAdd size={25} />
            {"Agregar"}
          </Link>
          }         

          <div className="md:flex items-center gap-4 ml-auto  text-black ">
            <Link
              href="/login"
              className="flex items-center mt-4 gap-2  bg-white rounded shadow-2xl w-full p-2  hover:underline"
              onClick={() => setMenuOpen(false)}
            >
              <CiLogin />
              LOGIN
            </Link>
            <Link
              href="/registro"
              className="flex items-center gap-2 mt-4  bg-white rounded shadow-2xl w-full p-2  hover:underline"
              onClick={() => setMenuOpen(false)}
            >
              <RxInput />
              REGISTRO
            </Link>

            <Link
              href="/logout"
              onClick={() => setMenuOpen(false)}
              className="flex flex-wrap items-center my-4 gap-2 bg-white rounded shadow-2xl w-full p-2 hover:underline"
            >
              <GoSignOut size={25} />
              {"Salir"}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
