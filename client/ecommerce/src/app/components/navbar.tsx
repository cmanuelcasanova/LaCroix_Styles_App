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
import { MdNoteAdd } from "react-icons/md";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [showCategories, setShowCategories] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
    const itemsC = useSelector(selectItemsc);
  
   

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
    <nav className="py-3 px-4 mx-2 flex items-center w-screen justify-between fixed top-0 z-50 text-white font-bold ">
      {/* Logo */}
      
      <Link href={"/"}>
        <Image src={Logo} height={50} alt="Logo" />
      </Link>
      {/* Categorías flotantes en desktop */}
      <div
        className="hidden rounded-2xl md:inline-block ml-4 relative"
        ref={menuRef}
      >
        <button
          onClick={() => setShowCategories(!showCategories)}
          className="px-4 py-2 bg-[#ff298b] text-white rounded hover:bg-pink-100 transition"
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
        <label className="bg-[#fe3190] flex items-center font-normal pr-2 gap-1 rounded-r-sm">
          <input
            type="text"
            placeholder="Buscar productos..."
            className="bg-white border-white rounded-l-sm text-gray-700 w-100 px-4 py-1 focus:outline-none"
          />
          <FaSearch />
        </label>
      </div>

      {/* Auth + Carrito en desktop */}
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

        <Link
          href="/newproduct"
          className="flex items-center gap-2 hover:underline"
        >
          <MdNoteAdd />
          
        </Link>

        
      </div>

        
      <Link href="/shopping" className="relative ml-auto sm:ml-4 mr-4 sm:mr-10 ">
        <FaCartShopping size={25}/>
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
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
        <div className="absolute inset-x-0 top-full bg-white px-4 py-3 rounded shadow text-gray-800 md:hidden z-40">
          {/* Buscador móvil */}
          <div className="mb-4 border-[#ff298b] border-2">
            <label className="bg-pink-100 flex items-center pr-2 gap-1 rounded">
              <input
                type="text"
                placeholder="Buscar..."
                className="bg-white text-gray-700 px-3 py-1 rounded-l  focus:outline-none w-full"
              />
              <FaSearch />
            </label>
          </div>

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
          </div>
        </div>
      )}

     
    </nav>
  );
}
