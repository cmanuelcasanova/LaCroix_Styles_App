"use client";

import { MdOutlineAddAPhoto } from "react-icons/md";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useAddItemMutation, useUpLoadphotoMutation , useGetCategoryQuery } from "../services/api/productsApi.ts";
import { useProfileQuery } from "../services/api/usersApi";
import { useRouter } from "next/navigation";
import Select from "react-select";
import LoadingModal from "../components/Loadingpage";


type FormData = {
  titulo: string;
  imagepath: string;
  categoryId: string;
  talla: string;
  precio: number;
};

type OptionType = {
  value: number;
  label: string;
};



export default function NewProduct() {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const router = useRouter();
  const [categoria, setCategoria] = useState<OptionType | null>(null);
  const [foto, setFoto] = useState<string | null>(null);
  const [imagenUrl, setImagenUrl] = useState<string>("");
  const [addItem] = useAddItemMutation();
  const [upLoadphoto] = useUpLoadphotoMutation();
  const { data: profile, isLoading, error } = useProfileQuery();
  const { data: categories } = useGetCategoryQuery();




  useEffect(() => {
    if (error && "status" in error && error.status === 401) {
      router.push("/login");
    }
  }, [error, router]);

  if (isLoading) return <LoadingModal />;
  if (!profile) return null;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setFoto(previewUrl);
      try {
        const resurl = await upLoadphoto({ image: file }).unwrap();
        setImagenUrl(resurl.url);
      } catch (err) {
        console.error("Error al agregar producto:", err);
      }
    }

  };

  const onSubmit = handleSubmit(async (data) => {
    
    
    
    if (!categoria) {
      alert("Por favor selecciona una categoría");
      return;
    }
    if (!foto) {
      alert("Debe seleccionar una foto");
      return;
    }

    try {

      await addItem({
        title: data.titulo,
        imageUrl: imagenUrl,
        categoryId: categoria.value,
        talla: data.talla,
        precio: data.precio,
        userId: profile.userId
      });
      reset ()
      setFoto(null)
      setCategoria(null)
     
    } catch (err) {
      console.log("Error al agregar producto:" ,err);
    }
  });

const options: OptionType[] = categories?.map(cat => ({
  value: cat.id,
  label: cat.name,
})) ?? [];




  const handleChange = (option: OptionType | null) => {
    setCategoria(option);
  };

  

  return (
    <div className="flex flex-col items-center">
      <div className="w-[700px] h-[900px] flex flex-col items-center rounded-2xl mt-20 bg-white px-8">
        <h1 className="text-2xl font-bold my-10">Agregar</h1>

        <div className="w-[300px] h-[400px] flex flex-col items-center justify-center rounded-2xl bg-gray-300 ">
          <label className="flex flex-col justify-center items-center">
            <span>
              {foto ? (
                <Image
                  src={foto}
                  alt={"Foto precargada"}
                  width={300}
                  height={400}
                  className="object-contain w-full h-full sm:h-max"
                />
              ) : (
                <div>
                  <MdOutlineAddAPhoto size={120} />
                  <span>Cargar Foto...</span>
                </div>
              )}
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

          <label className="" htmlFor="categoria">
            categoria
          </label>
          <Select
            className="w-full  border-[#202b38] border-1 mb-4 rounded-md
                focus:outline-none focus:ring-2
             focus:ring-[#15508b] focus:shadow-[0_0_0_4px_#4a76e9]
                hover:border-[#677483] transition-colors duration-200"
            inputId="categoria"
            value={categoria}
            onChange={handleChange}
            options={options}
            placeholder="Selecciona una categoría"
            required
            //{...register("categoria")}
          />

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
