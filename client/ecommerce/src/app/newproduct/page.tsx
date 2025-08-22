"use client";

import { MdOutlineAddAPhoto } from "react-icons/md";
import { useForm } from "react-hook-form";
import { useState , useEffect } from "react";
import Image from "next/image";
import { useAddItemMutation } from '../services/api/productsApi.ts'
import { useProfileQuery } from '../services/api/usersApi';

import { useRouter } from "next/navigation";


type FormData = {
  titulo: string;
  image: string;
  categoria: string;
  talla: string;
  precio: number;
};

export default function NewProduct() {
  const { register, handleSubmit } = useForm<FormData>();
   const router = useRouter();
  
  const [foto, setFoto] = useState<string>("");
  const [file, setFile] = useState<File>();
  const [addItem] = useAddItemMutation();
  const { data: profile, isLoading, error } = useProfileQuery();

  useEffect(() => {
    if (error && 'status' in error && error.status === 401) {
      router.replace('/login'); 
    }
  }, [error, router]);

  if (isLoading) return <p>Cargando perfil...</p>;
  if (!profile) return null;




















  



  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setFoto(previewUrl);
      setFile(file)
      //console.log(file)
      

     
    }
  };


  const onSubmit = handleSubmit((data) => {
    console.log(data);
     try {

     addItem({title: data.titulo, imageUrl: data.image,categoria:data.categoria, talla: data.talla, precio: data.precio })
         } catch (err) {
      console.error('Error al agregar producto:', err);
    }

  });

  return (
    <div className="flex flex-col items-center">
      <div className="w-[700px] h-[800px] flex flex-col items-center rounded-2xl mt-20 bg-white px-8">
        <h1 className="text-2xl font-bold my-10">Agregar</h1>

        <div className="w-[300px] h-[400px] flex flex-col items-center justify-center rounded-2xl bg-gray-300 ">
          <label className="flex flex-col justify-center items-center">
            <span>
              { foto ?
              <Image
                src={foto}
                alt={"Foto precargada"}
                width={300} 
                height={400}
                className="object-contain w-full h-full sm:h-max"
              />
              :
              <div><MdOutlineAddAPhoto size={120} /> 
              <span>Cargar Foto...</span>
              </div> }
            </span>
            
            <input
              type="file"
              accept="image/png, image/gif, image/jpeg"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>

        <form onSubmit={onSubmit} className="w-[300px] mt-10">
          <label className="flex flex-col mb-4">
            Titulo
            <input
              className="h-10  border-[#202b38] border-1 rounded-md p-2
                focus:outline-none focus:ring-2
             focus:ring-[#15508b] focus:shadow-[0_0_0_4px_#4a76e9]
                hover:border-[#677483] transition-colors duration-200"
              type="text"
              placeholder="input Titulo"
              required
              {...register("titulo")}
            />
          </label>

          <label className="flex flex-col mb-4">
            categoria
            <input
              className="h-10  border-[#202b38] border-1 rounded-md p-2
                focus:outline-none focus:ring-2
             focus:ring-[#15508b] focus:shadow-[0_0_0_4px_#4a76e9]
                hover:border-[#677483] transition-colors duration-200"
              type="text"
              placeholder="input categoria"
              required
              {...register("categoria")}
            />
          </label>

          <label className="flex flex-col mb-4">
            Foto
            <input
              className="h-10  border-[#202b38] border-1 rounded-md p-2
                focus:outline-none focus:ring-2
             focus:ring-[#15508b] focus:shadow-[0_0_0_4px_#4a76e9]
                hover:border-[#677483] transition-colors duration-200"
              type="text"
              placeholder="input categoria"
              required
              {...register("image")}
            />
          </label>

          <label className="flex flex-col mb-4">
            Talla
            <input
              className="h-10  border-[#202b38] border-1 rounded-md p-2
                focus:outline-none focus:ring-2
             focus:ring-[#15508b] focus:shadow-[0_0_0_4px_#4a76e9]
                hover:border-[#677483] transition-colors duration-200"
              type="text"
              placeholder="input Talla"
              required
              {...register("talla")}
            />
          </label>

          <label className="flex flex-col mb-4">
            Precio
            <input
              className="h-10  border-[#202b38] border-1 rounded-md p-2
                focus:outline-none focus:ring-2
             focus:ring-[#15508b] focus:shadow-[0_0_0_4px_#4a76e9]
                hover:border-[#677483] transition-colors duration-200"
              type="text"
              placeholder="input Precio"
              required
              {...register("precio")}
            />
          </label>

          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="bg-[#ff288c] w-[180px] rounded-md mb-4 mt-4 h-10 mx-auto text-black font-semibold active:scale-95
                 transition-colors duration-300 ease-in-out hover:bg-[#677483] cursor-pointer"
            >
              Registrar Producto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
