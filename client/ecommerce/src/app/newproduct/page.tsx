"use client";

import { MdOutlineAddAPhoto } from "react-icons/md";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Image from "next/image";
import ImageKit from "imagekit-javascript";


type FormData = {
  titulo: string;
  image: string;
  categoria: string;
  talla: string;
  precio: number;
};

export default function NewProduct() {
  const { register, handleSubmit } = useForm<FormData>();
  

  const [foto, setFoto] = useState<string>("");
  const [file, setFile] = useState<File>();



  const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
});

  
const uploadToImageKit = async (file: File) => {
  const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY;

  if (!publicKey) {
    throw new Error("Falta la clave pública de ImageKit");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("fileName", file.name);
  formData.append("folder", "/portfolio/images");

  const res = await fetch(`https://upload.imagekit.io/api/v1/files/upload?publicKey=${publicKey}`, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();

  if (!res.ok) {
    console.error("Error en la subida:", data);
    return;
  }

  console.log("Imagen subida:", data.url);
};






  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setFoto(previewUrl);
      setFile(file)
      console.log(file)
      uploadToImageKit(file)

     
    }
  };


    const onSubmit = handleSubmit((data) => {
    console.log(data);
     
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
              className="text-white h-10  border-[#202b38] border-1 rounded-md p-2
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
              className="text-white h-10  border-[#202b38] border-1 rounded-md p-2
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
            Talla
            <input
              className="text-white h-10  border-[#202b38] border-1 rounded-md p-2
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
              className="text-white h-10  border-[#202b38] border-1 rounded-md p-2
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
