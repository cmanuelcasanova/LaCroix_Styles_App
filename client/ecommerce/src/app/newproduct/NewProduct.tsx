"use client";

import { MdOutlineAddAPhoto } from "react-icons/md";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useAddItemMutation, useUpLoadphotoMutation , useGetSeccionQuery, useUpdateProductMutation } from "../services/api/productsApi";
import { useProfileQuery } from "../services/api/usersApi";
import { useRouter , useSearchParams } from "next/navigation";
import Select from "react-select";
import { COLOR_PALETTE , TALLAS , categoriesWomen , categoriesMen , categoriesKids } from "../components/params"
import LoadingModal from "../components/Loadingpage";
import AlertModal from "../components/alertModal";
import { themeBgMap } from "@/app/themeStyles"
import { useSelector } from "react-redux";
import { selectTheme } from "@/app/features/theme/themeSelector";
import { CustomOption } from "../components/customOption"
import { useGetItemQuery } from "@/app/services/api/productsApi";
import { skipToken } from "@reduxjs/toolkit/query";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { logout as logout_Auth} from "@/app/features/auth/authSlice";
import ThumbImages from "@/app/components/thumbImage"
import { MultiValue } from "react-select";
import { GoStarFill } from "react-icons/go";
import { UploadImagesBD  } from "@/app/services/api/queryTypes"
import { resumePluginState } from "next/dist/build/build-context";
import { join } from "path";
 




type FormData = {
  titulo: string;
  imagepath: string;
  seccionId: string;
  talla: string;
  precio: number;
};

type OptionType = {
  value: number;
  label: string;
};

type OptionTypeG = {
  value: string;
  label: string;
};

type ImageStatus = 'NEW' | 'EXISTING' | 'DELETED' | 'TEMP';

interface ImagewithPriority  {

  order: number;
  filedata: File | null;
  Url: string;
  status: ImageStatus


}



export default function NewProduct() {
  const { register, handleSubmit, reset , setValue} = useForm<FormData>();
  const router = useRouter();
  const [seccion, setSeccion] = useState<OptionType | null>(null);
  const [categoria, setCategoria] = useState<OptionTypeG | null>(null);
  const [talla, setTalla] = useState< OptionTypeG[] | null>([]);
  const [foto, setFoto] = useState<string | null>(null);
  const [modal, setModal] = useState<boolean>(false);
  const [Uploading, setUploading] = useState<boolean>(false);
  const [tipo,setTipo] = useState<boolean>(false)
  const [actualizar,setActualizar] = useState<boolean>(false)
  const [imagenUrl, setImagenUrl] = useState<string>("");
  const [addItem] = useAddItemMutation();
  const [UpdateProduct] = useUpdateProductMutation ();
  const [upLoadphoto] = useUpLoadphotoMutation();
  const { data: profile, isLoading, error } = useProfileQuery();
  const [color, setColor] = useState< OptionTypeG | null>(null);
  const { data: sec } = useGetSeccionQuery();
  const theme = useSelector(selectTheme);
  const bgClass = themeBgMap[theme]
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");
  const id_item =  searchParams.get("id");
  const dispatch = useDispatch<AppDispatch>();
  const [fotoFile, setFotofile] = useState<File | null>(null)
  const [ArrayFiles, setArrayFiles] = useState<File[]>([])
  const [ArrayImages, setArrayImages] = useState< ImagewithPriority[]>([])
  
  
  
  

  const isEditMode = mode === "edit";
  const {data: item, isLoading: isLoadingProfile } = useGetItemQuery(id_item ? { id: id_item } : skipToken)
    
useEffect(() => { 
  if(isEditMode && item?.category && !isLoadingProfile) {
    
    setValue('titulo',item?.title)
    setValue('precio', item?.precio)
    setFoto(item?.product_images[0].imageurl)
    setImagenUrl(item?.product_images[0].imageurl)

    const ImagesUp = item.product_images.map ( i => {

      return ( {filedata: null,  Url: i.imageurl, order: i.order,  status: 'EXISTING' as ImageStatus }   )
         
    }  )

    setArrayImages(ImagesUp)
    
    const tallasup = item?.Tallas.map(i => ( {value: i.name , label: i.name }) )
    setTalla( tallasup)

    setColor ({label: item?.color, value: COLOR_PALETTE.find((c)=> item?.color === c.label )?.label ?? item?.color})
    setActualizar(true)
    if(item.category!==undefined) {
    switch (item?.seccionId) { 
      case 1:
        setSeccion(  {value: item?.seccionId , label: "WOMAN" })
        setCategoria ( {label: categoriesWomen.find((c)=> item?.category === c.value )?.label ?? item?.category, value:item?.category})
        break
        case 2:
           setSeccion(  {value: item?.seccionId , label: "MEN" })
         setCategoria ( {label: categoriesMen.find((c)=> item?.category === c.value )?.label ?? item?.category, value:item?.category})
        break
        case 3:
           setSeccion(  {value: item?.seccionId , label: "KID" })
 setCategoria ( {label: categoriesKids.find((c)=> item?.category === c.value )?.label ?? item?.category, value:item?.category})
        default:
        return
    
    }
  }

  
  }
  }, [item, isEditMode,setValue, isLoadingProfile]);


  useEffect(() => {
    if (error && "status" in error && error.status === 401) {
      router.push("/login");
    }
  }, [error, router]);


  useEffect(() => {

    if(ArrayImages.length > 0){
      setFoto(ArrayImages[0].Url);
      setFotofile(ArrayImages[0].filedata)
    }

  }, [ArrayImages]);




  if (isLoading) return <LoadingModal />;
  if (!profile ) {dispatch( logout_Auth()) ; return null };
  if (profile.role!== "ADMIN") router.push("/login");



  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  
    if(e.target.files) {
      
      const totalArrayImages = ArrayImages.length
      
      const arraytarget:File[] = Array.from(e.target.files)
      const NewArrayImages:ImagewithPriority[] = arraytarget.map ( (item, index) => {

          const offfset = index + totalArrayImages
          return ( { filedata: item , Url: URL.createObjectURL(item), order: offfset , status: 'NEW' as ImageStatus }  )


      }  )


      setArrayFiles( prev => [...prev, ...arraytarget])
      setArrayImages  ( prev => [...prev, ...NewArrayImages])
    
    
    }





  };


  const onSubmit = handleSubmit(async (data) => {
    
    
    setUploading(true)
    if (!seccion) {
      alert("Por favor selecciona una seccion");
      return;
    }
    if (!categoria) {
      alert("Por favor selecciona una categoria");
      return;
    }

   if (!talla) {
      alert("Por favor selecciona una talla");
      return;
    }

    
   if (!color) {
      alert("Por favor selecciona un color");
      return;
    }
    if (!foto) {
      alert("Debe seleccionar una foto");
      return;
    }


    try {
      if (!actualizar) {

      { /*  Subiendo Foto al Servidor ImageFile.Io*/}



    const FilesImagesArray = ArrayImages.filter(f => f.status === 'NEW' ).map( i => { 
          
            return { fileImagen: i.filedata, order: i.order}
      })

    const result = await upLoadphoto(FilesImagesArray).unwrap(); 

    

    


      {/*  Creando nuevo producto en Backend   */ }

      await addItem({
        title: data.titulo,
        imagesUrl: result,
        seccionId: seccion.value,
        category: categoria.value,
        talla: talla.map(t => t.value),
        precio: data.precio,
        color: color.label,
        userId: profile.userId
      }).unwrap();

    }else{

  
     await UpdateProduct({
        id:item?.id,
        title: data.titulo,
        imageUrl: imagenUrl,
        seccionId: seccion.value,
        category: categoria.value,
        talla: [],
        precio: data.precio,
        color: color.label,
        userId: profile.userId
      }).unwrap();





    }




      reset ()
      setFoto(null)
      setSeccion(null)
      setCategoria(null)
      setColor(null)
      setTalla(null)
      setModal(true)
      setTipo(true)
      setImagenUrl("")
      
     
    } catch  {
      setModal(true)
      setTipo(false)
    }

    setUploading(false)
  });

const options: OptionType[] = sec?.map(secc => ({
  value: secc.id,
  label: secc.name,
})) ?? [];



const handleChange = (option: OptionType | null) => {
    setSeccion(option);
  };

const handleChangeG = (selectedOption:  OptionTypeG | null, actionMeta: { name?: string }) => {
  switch (actionMeta.name) {

    case 'categoria':
      setCategoria(selectedOption);
      break;
    case 'color':
      setColor(selectedOption);
      break;
    default:
      console.warn('Campo no reconocido:', actionMeta.name);
  }
};


const handleChangeTallas = (
  selectedOptions: MultiValue<OptionTypeG>
) => {
  setTalla([...selectedOptions]);
};



const getCategoryOptions = (seccionValue: number | undefined) => {
  switch (seccionValue) {
    case 1:
      return categoriesWomen;
    case 2:
      return categoriesMen;
    case 3:
      return categoriesKids;
    case undefined:
      return undefined;
    default:
      return [];
  }
};

const filtrarArrayFile = (valor :string | undefined) => {

  let isMain=false
  let order_erase:number
  if(valor) {
    const newArray = ArrayImages.filter ( i => {
      
      if(i.filedata?.name !== valor) {
        return i
      }else{ 
        
        order_erase=i.order
        if(i.order===0) isMain=true
        return false
      } 
    }
    )

    if(isMain) {
      const newArray2 = newArray.map ( i => {
        i.order = i.order-1
        return i
      })
      setArrayImages(newArray2)
    }else{

      const newArray2 = newArray.map ( i => {
        if(i.order > order_erase) {i.order = i.order-1}
        return i
      })

      setArrayImages(newArray2)
    }

    if(newArray.length===0) setFoto(null)
 }
}






const setMainItem = (indice:number) => {


    const newArraySafe = ArrayImages.map(item => {

        if (item.order === 0) {
            return { ...item, order: indice }; 
        }

        else if (item.order === indice) {
            return { ...item, order: 0 }; // 
        }
        else {
            return item; 
        }
    });

    newArraySafe.sort((a, b) => a.order - b.order);
    setArrayImages(newArraySafe);

}

const setMoveItem = (indice:number, away:string) => {


      if (away==='L') {
        const newArraySafe = ArrayImages.map(item => {

            if (item.order === indice-1) {
                return { ...item, order: indice }; 
            }

            else if (item.order === indice) {
                return { ...item, order: indice-1 }; // 
            }
            else {
                return item; 
            }
        });

        newArraySafe.sort((a, b) => a.order - b.order);
        setArrayImages(newArraySafe);
    
    }else{

        const newArraySafe = ArrayImages.map(item => {

          if (item.order === indice ) {
              if(indice+1 !== ArrayImages.length) {return { ...item, order: indice+1 }}else{return {...item}}; 
          }

          else if (item.order === indice+1) {
              return { ...item, order: indice }; // 
          }
          else {
              return item; 
          }
      });

      newArraySafe.sort((a, b) => a.order - b.order);
      setArrayImages(newArraySafe);


    


  }
}





  

console.log(ArrayImages)

  return (


    <div className="flex flex-col items-center p-4 ">

      {modal && <AlertModal onClose={() => setModal(false)} tipo={tipo}  />}
      {Uploading && <LoadingModal />}
      <div className={`w-[700px] h-[1000px] flex flex-col overflow-auto items-center rounded-2xl mt-20  px-8 ${actualizar ? 'bg-green-200' : 'bg-white' }`}>
        <h1 className="text-2xl font-bold my-10">Agregar</h1>

        
        <div className="w-[300px] h-[400px] flex flex-col items-center justify-center rounded-2xl bg-gray-300 ">
          
          
          <label className="flex flex-col h-[500px] justify-center items-center">
            <span>
              {foto ? ( <>
                <Image
                  src={foto}
                  alt={"Foto precargada"}
                  width={300}
                  height={400}
                  className="object-cover h-full sm:h-max p-2 rounded-2xl"
                />

                 <div className="flex flex-wrap items-center justify-center gap-2 w-full "> <GoStarFill size={25} className="text-yellow-300 bg-white rounded-full "/> <h1>Foto Principal</h1></div></>
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
              multiple
            />
          </label>
        </div>




        {/*  Card Miniaturas Imagenes  */}
            
        { ArrayImages.length > 0 && 
          <div className="w-[300px] h-[400px] mt-6 pb-6 flex flex-wrap items-center justify-around rounded-2xl bg-gray-300 ">
                
                { ArrayImages.length > 0 && 
                  ArrayImages.map ( (i,ind) =>  
                  <ThumbImages 
                    key={ind} 
                    image={i.Url} 
                    index={i.order}  
                    deleteItem={ ()=>filtrarArrayFile(i.filedata?.name) }
                    status = { i.status }
                    setLeft={() => setMoveItem(i.order,'L')}
                    setMain={ () => setMainItem(i.order) } 
                    setRight={()=> setMoveItem(i.order,'R')}
                    
                     
                    
                    /> )
                }
          </div>
        }
           



   


        <form onSubmit={onSubmit} className="w-[300px] mt-10">
          <label className="flex flex-col mb-4">
            Titulo
            <input
              className="h-10 bg-white border-[#202b38] border-1 rounded-md p-2
                focus:outline-none focus:ring-2
             focus:ring-[#15508b] focus:shadow-[0_0_0_4px_#4a76e9]
                hover:border-[#677483] transition-colors duration-200"
              type="text"
              placeholder="input Titulo"
              required
              {...register("titulo")}
            />
          </label>

          <label className="" htmlFor="seccion">
            Seccion
          </label>
          <Select
            className="w-full  border-[#202b38] border-1 mb-4 rounded-md
                focus:outline-none focus:ring-2
             focus:ring-[#15508b] focus:shadow-[0_0_0_4px_#4a76e9]
                hover:border-[#677483] transition-colors duration-200"
            inputId="seccion"
            name="seccion"
            value={seccion}
            onChange={handleChange}
            options={options}
            placeholder="Selecciona una Seccion"
            required
            
          />

           <label className="" htmlFor="categoria">
            Categoria
          </label>
          <Select
            className="w-full  border-[#202b38] border-1 mb-4 rounded-md
                focus:outline-none focus:ring-2
             focus:ring-[#15508b] focus:shadow-[0_0_0_4px_#4a76e9]
                hover:border-[#677483] transition-colors duration-200"
            inputId="categoria"
            name="categoria"
            value={categoria}
            onChange={handleChangeG}
            options={ getCategoryOptions(seccion?.value)}
            placeholder="Selecciona una Categoria"
            required
            
          />


          <label className="" htmlFor="talla">
            Talla
          </label>
          <Select
            className="w-full  border-[#202b38] border-1 mb-4 rounded-md
                focus:outline-none focus:ring-2
             focus:ring-[#15508b] focus:shadow-[0_0_0_4px_#4a76e9]
                hover:border-[#677483] transition-colors duration-200"
            inputId="talla"
            name="talla"
            value={talla}
            onChange={handleChangeTallas}
            options={TALLAS}
            isMulti
            placeholder="Selecciona una Talla"
            required
            
          />



          <label className="" htmlFor="color">
            Color
          </label>
          <Select
            className="w-full border-[#202b38] border-1 mb-4 rounded-md
                focus:outline-none focus:ring-2
             focus:ring-[#15508b] focus:shadow-[0_0_0_4px_#4a76e9]
                hover:border-[#677483] transition-colors duration-200"
            inputId="color"
            name="color"
            value={color}
            onChange={handleChangeG}
            options={COLOR_PALETTE}
            placeholder="Selecciona un Color"
            required
            components={{ Option: CustomOption }}


            
          />
         

          <label className="flex flex-col mb-4">
            Precio
            <input
              className="h-10 bg-white border-[#202b38] border-1 rounded-md p-2
                focus:outline-none focus:ring-2
             focus:ring-[#15508b] focus:shadow-[0_0_0_4px_#4a76e9]
                hover:border-[#677483] transition-colors duration-200"
              type="text"
              placeholder="input Precio"
              required
              {...register("precio")}
            />
          </label>

          <div className="flex justify-center gap-2 mt-4 text-white">
            <button
              type="submit"
              className={`bg-${bgClass} w-[180px] rounded-md mb-4 mt-4 h-10 mx-auto  font-semibold active:scale-95
                 transition-colors duration-300 ease-in-out hover:bg-[#677483] cursor-pointer`}
            >
              { actualizar ? 'Actualizar' : 'Registrar Producto' }
            </button>
         
            <button
              onClick={() => router.push("/")}
              className={`bg-gray-300 text-black w-[180px] rounded-md mb-4 mt-4 h-10 mx-auto font-semibold active:scale-95
                 transition-colors duration-300 ease-in-out hover:bg-[#677483] cursor-pointer`}
            >
               Cancelar 
            </button>
         
         
         
          </div>
        </form>
      </div>
    </div>
  );
}
