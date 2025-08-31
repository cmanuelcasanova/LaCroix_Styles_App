"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../../public/LogoLAcroixStyles.png";
import { FaSearch } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { CiLogin } from "react-icons/ci";
import { RxInput } from "react-icons/rx";
import { GiClothes, GiShorts, GiWatch } from "react-icons/gi";
import { CiMenuKebab } from "react-icons/ci";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useSelector } from "react-redux";
import { selectItemsc } from "@/app/features/Car/CarSelector";
import { selectTheme } from "@/app/features/theme/themeSelector";
import { selectUsername } from "../features/auth/authSelectors"
import { Themetype } from "../features/theme/themeTypes"
import { setTheme }  from "@/app/features/theme/themeSlice"
import { MdNoteAdd } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { GoSignOut } from "react-icons/go";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { themeBgMap} from "@/app/themeStyles"




export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [showCategories, setShowCategories] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const itemsC = useSelector(selectItemsc);
  const theme = useSelector(selectTheme);
  
  const UserS = useSelector(selectUsername);
  const dispatch = useDispatch<AppDispatch>();
  const bgClass = themeBgMap[theme]
  
  


 

  useEffect(() => {
    document.body.classList.remove("bg-woman", "bg-men", "bg-boy", "bg-all");

    switch (theme) {
      case Themetype.WOMAN:
        document.body.classList.add("bg-woman");
        break;
      case Themetype.MEN:
        document.body.classList.add("bg-men");
        break;
      case Themetype.BOY:
        document.body.classList.add("bg-boy");
        break;
      case Themetype.ALL:
      default:
        document.body.classList.add("bg-all");
        break;
    }
  }, [theme]);




  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowCategories(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const cartCount = itemsC.length;
  const categories = [
    {
      name: "Ropa",
      icon: <GiClothes />,
      subcategories: ["Dama", "Caballero", "Niños"],
    },
    {
      name: "Zapatos",
      icon: <GiShorts />,
      subcategories: ["Dama", "Caballero", "Niños"],
    },
    {
      name: "Accesorios",
      icon: <GiWatch />,
      subcategories: ["Dama", "Caballero"],
    },
  ];

  const toggleCategory = (name: string) => {
    setOpenCategory(openCategory === name ? null : name);
  };



 
  return (
    <nav className={`px-4 flex items-center w-screen justify-between fixed top-0 z-50 text-white font-bold bg-${bgClass}/30`}>
      
     
      <Link href={"/"} onClick={()=> setMenuOpen(false)} className="active:scale-95 transition-transform duration-150 ease-in-out">
        <Image src={Logo} height={40} alt="Logo" priority />
      </Link>
      {/* Categorías flotantes en desktop */}
      <div
        className="hidden rounded-2xl md:inline-block ml-4 relative"
        ref={menuRef}
      >
        <div className="flex flex-wrap justify-between items-center w-[250px] ">
       
       <button className=" hover:underline"  onClick={() => dispatch(setTheme(Themetype.WOMAN))}
 >
        WOMAN
        </button>
        
        <button className=" hover:underline" onClick={ () => dispatch(setTheme(Themetype.MEN))} >
          MEN
        </button>
       
        <button className=" hover:underline" onClick={ () => dispatch(setTheme(Themetype.BOY))} >
          KID
        </button>

        <button className=" hover:underline" onClick={ () => dispatch(setTheme(Themetype.ALL))} >
          ALL
        </button>


         </div>
        <button
          onClick={() => setShowCategories(!showCategories)}
          className="px-4 py-2 hidden bg-[#ff298b] text-white rounded hover:bg-pink-100 transition"
        >
          CATEGORIAS {showCategories ? "▲" : "▼"}
        </button>

        {showCategories && (
          <div className="absolute left-0 mt-2 w-64 bg-gradient-to-b from-[#ff8ec9] via-white via-70% to-[#fed3e7] shadow-lg rounded z-50 p-2 transition-all duration-300 ease-in-out transform translate-y-2
">
            {categories.map((cat) => (
              <div key={cat.name} className="flex flex-col">
                <button
                  onClick={() => toggleCategory(cat.name)}
                  className="flex items-center justify-between px-4 py-2 hover:bg-gray-200 text-gray-800"
                >
                  <span className="flex items-center gap-2">
                    {cat.icon} {cat.name}
                  </span>
                  {cat.subcategories && (
                    <span>{openCategory === cat.name ? "▲" : "▼"}</span>
                  )}
                </button>

                {openCategory === cat.name && cat.subcategories && (
                  <div className="ml-6 mt-1 flex flex-col gap-1">
                    {cat.subcategories.map((sub) => (
                      <Link
                        key={sub}
                        //href={`/categoria/${sub.toLowerCase()}`}
                        href={"/"}
                        className="px-2 py-1 text-sm text-gray-700 hover:underline"
                        onClick={() => {
                          setOpenCategory(null);
                          setShowCategories(false);
                        }}
                      >
                        {sub}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>



      {/* Buscador centrado solo en desktop */}
      <div className="hidden md:block self-center items-center">
        <label className={`bg-${bgClass} flex items-center font-normal pr-2 gap-1 rounded-r-sm`}>
          <input
            type="text"
            placeholder="Buscar productos..."
            className="bg-white border-white rounded-l-sm text-gray-700 w-[250px] px-4 py-1 focus:outline-none"
          />
          <FaSearch />
        </label>
      </div>

      {/* Auth + Carrito en desktop */}
      
      {!UserS && 
      <div className="hidden md:flex items-center gap-4  text-white mr-6">
        <Link href="/login" className="flex items-center gap-2 hover:underline">
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

          }

        { UserS &&  <div className="flex flex-wrap gap-2">
      
      <Link
          href="/profile"
          className="flex items-center gap-2 ml-4 sm:ml-0 hover:underline"
        >
          <FaUserCircle size={25}/>
          {UserS}
          
      </Link>

       <Link
          href="/newproduct"
          className="sm:flex sm:items-center gap-2 hidden  hover:underline"
        >
          <MdNoteAdd size={25}/>
          {"Agregar"}
          
        </Link>

        <Link
          href="/logout"
          className="sm:flex sm:items-center gap-2 hidden hover:underline"
        >
          <GoSignOut size={25}/>
          {"Salir"}
          
        </Link>
        
        </div>

        }

      

        
      <Link href="/shopping" className="relative ml-auto sm:ml-4 mr-4 sm:mr-10 " onClick={()=>setMenuOpen(false)}>
        <FaCartShopping size={25} className="active:scale-95 transition-transform duration-150 ease-in-out"/>
        {cartCount > 0 && (
          <span className={`absolute -top-2 -right-2 bg-${bgClass} text-white text-xs rounded-full px-1`}>
            {cartCount}
          </span>
        )}
      </Link>

      {/* Hamburguesa móvil */}


       
      <button
        className="md:hidden text-white"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? (
          <IoIosCloseCircleOutline size={30} />
        ) : (
          <CiMenuKebab size={30} />
        )}
      </button>

      {/* Menú móvil en bloque */}
      {menuOpen && (
        <div className={`absolute inset-x-0 top-full bg-${bgClass} px-4 py-3 rounded shadow text-gray-800 md:hidden z-40`}>
          
        <div className="flex flex-wrap items-center justify-between gap-4 my-4 ">
       
       <button className=" hover:underline"  onClick={() => {
       setMenuOpen(false) 
       dispatch(setTheme(Themetype.WOMAN))
       }
      }
 >
        WOMAN
        </button>
        
        <button className=" hover:underline" onClick={ () => {
           setMenuOpen(false)
          dispatch(setTheme(Themetype.MEN))}} >
          MEN
        </button>
       
        <button className=" hover:underline" onClick={ () => {
           setMenuOpen(false)
           dispatch(setTheme(Themetype.BOY))} }>
          KID
        </button>

        <button className=" hover:underline" onClick={ () => {
           setMenuOpen(false)
           dispatch(setTheme(Themetype.ALL))} }>
          ALL
        </button>


         </div>
          
          
          
          {/* Buscador móvil */}
          <div className={`mb-4 border-${bgClass} border-2`}>
            <label className="bg-pink-100 flex items-center pr-2 gap-1 rounded">
              <input
                type="text"
                placeholder="Buscar..."
                className="bg-white text-gray-700 px-3 py-1 rounded-l  focus:outline-none w-full"
              />
              <FaSearch />
            </label>
          </div>

          <Link
              href="/newproduct"
              className="flex flex-wrap items-center my-4 gap-2 hover:underline"
            >
              <MdNoteAdd size={25}/>
              {"Agregar"}
              
            </Link>

          {/* Categorías */}
          <span className="text-lg font-semibold mb-2">CATEGORIAS</span>
          {categories.map((cat) => (
            <div key={cat.name} className="flex flex-col mb-2 mt-2">
              <button
                onClick={() => toggleCategory(cat.name)}
                className="flex items-center justify-between px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
              >
                <span className="flex items-center gap-2">
                  {cat.icon} {cat.name}
                </span>
                {cat.subcategories && (
                  <span>{openCategory === cat.name ? "▲" : "▼"}</span>
                )}
              </button>

              {openCategory === cat.name && cat.subcategories && (
                <div className="ml-6 mt-1 flex flex-col gap-1">
                  {cat.subcategories.map((sub) => (
                    <Link
                      key={sub}
                      href={"/"}
                      className="px-2 py-1 text-sm hover:underline"
                      onClick={() => {
                        setOpenCategory(null);
                        setMenuOpen(false);
                      }}
                    >
                      {sub}
                    </Link>
                  ))}
                </div>
              )}

              {!cat.subcategories && (
                <Link
                  href={`/categoria/${cat.name.toLowerCase()}`}
                  className="px-4 py-2 text-sm hover:underline"
                  onClick={() => setMenuOpen(false)}
                >
                  {cat.name}
                </Link>
              )}
            </div>
          ))}

          <div className="md:flex items-center gap-4 ml-auto  text-black mr-6">
            <Link
              href="/login"
              className="flex items-center mt-4 gap-2 hover:underline"
              onClick={() => setMenuOpen(false)}
            >
              <CiLogin />
              LOGIN
              
            </Link>
            <Link
              href="/registro"
              className="flex items-center gap-2 mt-4 hover:underline"
              onClick={() => setMenuOpen(false)}
            >
              <RxInput />
              REGISTRO
              
            </Link>

            <Link
              href="/logout"
              className="flex flex-wrap items-center my-4 gap-2 hover:underline"
            >
              <GoSignOut size={25}/>
              {"Salir"}
          
            </Link>
          </div>
        </div>
      )}

     
    </nav>
  );
}
