"use client";

import { MdOutlineAddAPhoto } from "react-icons/md";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useAddItemMutation, useUpLoadphotoMutation , useGetSeccionQuery, useUpdateProductMutation, useDeletePhotoMutation, useUpdatePhotoMutation } from "../services/api/productsApi";
import { useLazyGetBrandInfoQuery } from "@/app/services/api/fileApi"
import { useProfileQuery } from "../services/api/usersApi";
import { useRouter , useSearchParams } from "next/navigation";
import Select from "react-select";
import { COLOR_PALETTE , TALLAS , categoriesWomen , categoriesMen , categoriesKids } from "../components/params"
import LoadingModal from "../components/Loadingpage";
import CargandoModal from "../components/modalCargando";
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
import { FaCheckCircle } from "react-icons/fa";


 




type FormData = {
  titulo: string;
  imagepath: string;
  seccionId: string;
  talla: string;
  precio: number;
  marcas: string
};

type OptionType = {
  value: number;
  label: string;
};

type OptionTypeG = {
  value: string;
  label: string;
};

type ImageStatus = 'NEW' | 'EXISTING' | 'DELETED' | 'UPDATE';

interface ImagewithPriority  {
  id: number | null;
  order: number;
  filedata: File | null;
  Url: string;
  status: ImageStatus


}



export default function NewProduct() {
  const { register, handleSubmit, reset , setValue, watch} = useForm<FormData>();
  const router = useRouter();
  const [seccion, setSeccion] = useState<OptionType | null>(null);
  const [categoria, setCategoria] = useState<OptionTypeG | null>(null);
  const [talla, setTalla] = useState< OptionType[] | null>([]);
  const [foto, setFoto] = useState<string | null>(null);
  const [modal, setModal] = useState<boolean>(false);
  const [modalCargando, setModalCargando] = useState<boolean>(false);
  const [tipo,setTipo] = useState<boolean>(false)
  const [actualizar,setActualizar] = useState<boolean>(false)
  const [addItem, { isLoading: loading_Create }] = useAddItemMutation();
  const [UpdateProduct] = useUpdateProductMutation ();
  const [upLoadphoto] = useUpLoadphotoMutation();
  const { data: profile, isLoading, error } = useProfileQuery();
  const [color, setColor] = useState< OptionTypeG | null>(null);
  const { data: sec } = useGetSeccionQuery();
  const theme = useSelector(selectTheme);
  const bgClass = themeBgMap[theme]
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");
  const [marca, setMarca]=useState<{name:string,domain:string | null}>();  
  const [divMarcas, setDivMarcas] = useState<boolean>(false)
  const [searchBrand, setSearchBrand] = useState<string>("")
  const id_item =  searchParams.get("id");
  const dispatch = useDispatch<AppDispatch>();
  const [fotoscargadas, setFotosCargadas] = useState<boolean>(false)
  const [ArrayImages, setArrayImages] = useState< ImagewithPriority[]>([])
  const [deletePhoto] = useDeletePhotoMutation();
  const [updatePhoto] = useUpdatePhotoMutation();
  const isEditMode = mode === "edit";
  const {data: item, isLoading: isLoadingProfile } = useGetItemQuery(id_item ? { id: id_item } : skipToken)
  const [play_LazyGetBrand, { data: brand  }] = useLazyGetBrandInfoQuery();
    
useEffect(() => { 
  if(isEditMode && item?.category && !isLoadingProfile) {
    
    setValue('titulo',item?.title)
    setValue('precio', item?.precio)
    setFoto(item?.product_images[0] ? item?.product_images[0].imageurl : "https://ik.imagekit.io/wakm0y68u/LaCroix/default-Image.png")
    setFotosCargadas(true)

                            
    
    if(item.marca){
       setMarca( {name: item.marca , domain: item.domain})
       setValue("marcas",item.marca)
       setDivMarcas(false)

    }

    const ImagesUp = item.product_images.map ( i => {

      return ( {filedata: null, id:i.id, Url: i.imageurl, order: i.order,  status: 'EXISTING' as ImageStatus }   )
         
    }  )

    setArrayImages(ImagesUp)
    
    const tallasup = item?.Tallas.map(i => ( {value: i.id , label: i.name }) )
    setTalla( tallasup.sort ((a,b)=> a.value - b.value ) )

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



  const text = watch("marcas")
  useEffect(() => {



    setSearchBrand( text  )
    

    

    if(!marca || marca.name !==text ){setDivMarcas(true)
  }else{setDivMarcas(false)}

    

  },[text,marca])

  
  useEffect(() => {

    
    try {
      if(searchBrand) {const result = play_LazyGetBrand( { query: searchBrand}).unwrap }

    }catch(error_brand){ console.log(error_brand)}


  },[searchBrand, play_LazyGetBrand])



  useEffect(() => {

    
    if(fotoscargadas) {      
      setFoto(ArrayImages[0] ? ArrayImages[0].Url : "https://ik.imagekit.io/wakm0y68u/LaCroix/default-Image.png");

    }else{
      setFoto(null);

    }

  }, [fotoscargadas, ArrayImages]);

 useEffect(() => {

  if(ArrayImages.length>0){
  const newArray = ArrayImages.filter( f => f.status !== 'DELETED' )
    if(newArray.length!==0) {      
      setFotosCargadas(true)
    }else{setFotosCargadas(false)}
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
          return ( { id:null, filedata: item , Url: URL.createObjectURL(item), order: offfset , status: 'NEW' as ImageStatus }  )


      }  )



      setArrayImages  ( prev => [...prev, ...NewArrayImages])
      e.target.value = '';

    
    
    }





  };


  const onSubmit = handleSubmit(async (data) => {
    
    

     

    
    if (!seccion) {
      alert("Por favor selecciona una seccion");
      return;
    }

    if (!categoria) {
      alert("Por favor selecciona una categoria");
      return;
    }

     if (!text) {
      alert("Por favor selecciona una marca");
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

     setModalCargando(true); 

    try {
      if (!actualizar) {

      { /*  Subiendo Foto al Servidor ImageFile.Io*/}



    const FilesImagesArray = ArrayImages.filter(f => f.status === 'NEW' ).map( i => { 
          
            return { fileImagen: i.filedata, order: i.order}
      })

    const result = await upLoadphoto(FilesImagesArray).unwrap(); 

    
      {/*  Creando nuevo producto en Backend   */ }

      addItem({
        title: data.titulo,
        marca: marca===undefined ? {name: text, domain: null} : marca ,
        imagesUrl: result,
        seccionId: seccion.value,
        category: categoria.value,
        talla: talla.map(t => t.value),
        precio: data.precio,
        color: color.label,
        userId: profile.userId
      }).unwrap();

    }else{

    
    const FilesImagesArray = ArrayImages.filter(f => f.status === 'NEW' ).map( i => { 
          
            return { fileImagen: i.filedata, order: i.order}
        })

     const result = await upLoadphoto(FilesImagesArray).unwrap(); 

     
     ArrayImages.filter(f => f.status === 'UPDATE' ).map( async i => { 
          
            console.log("UPDATE")
            if( i.id && item?.id) {
              await updatePhoto( {id: i.id , order: i.order , productId: item.id } )
            }
      })

    
     ArrayImages.filter( f => f.status === 'DELETED' ).map( async i => { 
        try {
          if(i.id) await deletePhoto({ name: i.Url.split("/").pop() , id:i.id}).unwrap();
        } catch (err) {console.log(err)}
    })



  
     await UpdateProduct({
        id:item?.id,
        title: data.titulo,
         marca: marca,
        imagesUrl: result,
        seccionId: seccion.value,
        category: categoria.value,
        talla: talla.map(t => t.value),
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
       setModalCargando(false); 

      
     
    } catch  {
      setModal(true)
      setTipo(false)
    }

   
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
  selectedOptions: MultiValue<OptionType>

) => {

   const arrayTallasCopy = (selectedOptions as OptionType[]).sort((a, b) => a.value - b.value);

  setTalla([...arrayTallasCopy]);

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




const filtrarArrayFile = (order_find :number | undefined, status: string) => {

  
  
  
  let isMain=false
  let order_erase:number

 
    const newArray = ArrayImages.filter ( i => {
      
      if(i.order !== order_find) {
        
        return i
      }else{ 

        
        switch (status) {
          case 'EXISTING':
            order_erase=i.order;
            if(i.order===0) isMain=true;
            i.order=100
            i.status='DELETED'
            return true;
            
                  
            case 'NEW':
             order_erase=i.order
             if(i.order===0) isMain=true
             return false
            
            
            case 'DELETED':
            return i
            
        
            default:
            break;
        }
      }
    }
    )

   

    if(isMain) {
      const newArray2 = newArray.map ( i => {
        i.order = i.order-1
        if(i.status==='EXISTING') i.status = 'UPDATE'
        return i
      })
      newArray2.sort((a, b) => a.order - b.order);
      setArrayImages(newArray2)
    }else{

      const newArray2 = newArray.map ( i => {
        if(i.order > order_erase) {
          i.order = i.order-1
           if(i.status==='EXISTING') i.status = 'UPDATE'
        }
        return i
      })
      newArray2.sort((a, b) => a.order - b.order);
      setArrayImages(newArray2)
    }
    
    const newArray3 = newArray.filter( f => f.status !== 'DELETED' )
    if(newArray3.length===0) setFotosCargadas(false)
 
}






const setMainItem = (indice:number) => {


    const newArraySafe = ArrayImages.map(item => {

        if (item.order === 0) {
            const statusverificate = item.status==='EXISTING' ? 'UPDATE' : item.status
            return { ...item, order: indice, status: statusverificate}; 
        }

        else if (item.order === indice) {
            const statusverificate = item.status==='EXISTING' ? 'UPDATE' : item.status
            return { ...item, order: 0,status: statusverificate }; // 
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
                const statusverificate = item.status==='EXISTING' ? 'UPDATE' : item.status
                return { ...item, order: indice, status: statusverificate  }; 
            }

            else if (item.order === indice) {
                const statusverificate = item.status==='EXISTING' ? 'UPDATE' : item.status
                return { ...item, order: indice-1 , status: statusverificate }; // 
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
              if(indice+1 !== ArrayImages.length) {
                const statusverificate = item.status==='EXISTING' ? 'UPDATE' : item.status
                return { ...item, order: indice+1, status: statusverificate }
              }else{
                return {...item}
              }; 
          }

          else if (item.order === indice+1) {
              const statusverificate = item.status==='EXISTING' ? 'UPDATE' : item.status
              return { ...item, order: indice, status: statusverificate }; // 
          }
          else {
              return item; 
          }
      });

      newArraySafe.sort((a, b) => a.order - b.order);
      setArrayImages(newArraySafe);


    


  }
}







  return (


    <div className="flex flex-col items-center p-4 ">

      {modal && <AlertModal onClose={() => setModal(false)} tipo={tipo}  />}
      { modalCargando && <CargandoModal />}
      <div  className={`w-[700px] h-[1000px] flex flex-col overflow-auto items-center rounded-2xl mt-20  px-8 ${actualizar ? 'bg-green-200' : 'bg-white' }`}>
        <h1 className="text-2xl font-bold my-10">Agregar</h1>

        
        <div className="w-[300px] h-[400px] flex flex-col items-center rounded-2xl bg-gray-300 ">
          
          
          <label className="flex flex-col h-[500px] justify-center items-center">
            <span className="h-[400px] flex flex-col items-center justify-center">
              {foto ? ( <>
                <Image
                  src={foto}
                  alt={"Foto precargada"}
                  width={300}
                  height={400}
                  className="object-contain h-[350px] sm:h-[400px] p-2 rounded-2xl"
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
        
      
      
        { fotoscargadas && 
          <div className="w-[300px] h-[400px] my-2 py-2 flex flex-wrap items-center justify-around rounded-2xl bg-gray-300 ">
                
             {

                 
                  ArrayImages.filter (f => f.status!=='DELETED')
                  .sort((a, b) => a.order - b.order)
                  .map ( (i) =>  

                  <ThumbImages 
                    key={i.id} 
                    image={i.Url} 
                    index={i.order}  
                    deleteItem={ ()=>filtrarArrayFile(i.order, i.status) }
                    status = { i.status }
                    setLeft={() => setMoveItem(i.order,'L')}
                    setMain={ () => setMainItem(i.order) } 
                    setRight={()=> setMoveItem(i.order,'R')}
                    
                  
                  
                    />  )  
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

           <label className="flex flex-col mb-4">
            Marca
            <input
              className="h-10 bg-white border-[#202b38] border-1 rounded-md p-2
                focus:outline-none focus:ring-2
             focus:ring-[#15508b] focus:shadow-[0_0_0_4px_#4a76e9]
                hover:border-[#677483] transition-colors duration-200"
              type="text"
              placeholder="ingresa Marca"
              {...register("marcas")}
            />
       

            {divMarcas && <div className="flex flex-col z-10">

             { brand && 
             
             brand.map( element => {

                return  <div
                           
                            key={element.brandId} 
                            className=" overflow-auto w-[700px] h-14 px-2 flex flex-wrap items-center justify-start gap-2 hover:bg-gray-400" 
                            onClick={()=>{
                              
                              setSearchBrand(element.name);
                              setDivMarcas(false)
                              setValue("marcas",element.name)
                              setMarca( {name:element.name , domain: element.domain})
                              
                            
                            }}
                            >
                           
                            {element.icon &&
                            <picture>
                             
                              <source srcSet={element.icon} type="image/webp" />
                              
      
                              <img 
                                src={element.icon} 
                                alt="ico_marca" 
                                loading="lazy"
                                width={30}
                                height={30}
                              />
                            </picture>
                            }
                            <span > {element.name} </span>  
                        </div>
                
              })
            
            

            }
            



            </div>
}

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
            menuPortalTarget={document.body}
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
            menuPortalTarget={document.body}
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
            menuPortalTarget={document.body}


            
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
         
            
         
         
          </div>
        </form>

       

        <button
              onClick={() => {
                if(item){
                 router.push(`/itemview/${item.id}`)
                }else{router.push("/")}
              
              }}
              className={`bg-gray-300 text-black w-[180px] rounded-md mb-4 p-2 h-15 mx-auto font-semibold active:scale-95
                 transition-colors duration-300 ease-in-out hover:bg-[#677483] cursor-pointer`}
            >
               Cancelar 
            </button>
         
      </div>
    </div>
  );
}
