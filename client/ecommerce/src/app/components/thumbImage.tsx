"use client";
import { IoMdCloseCircle } from "react-icons/io";
import Image from "next/image";
import { GoStarFill } from "react-icons/go";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { MdFiberNew } from "react-icons/md";
interface thumbImageProps {

    image: string
    index: number
    deleteItem: () => void;
    status: string
    setLeft: () => void;
    setMain: () => void;
    setRight: () => void;


}


export default function ThumbImages( {image, index, deleteItem, setMain, setLeft,setRight, status}: thumbImageProps ){



  return (

    <div className={`flex flex-col relative items-center justify-between h-30 w-30 m-2 rounded-2xl bg-white `}>
        
        
        {status==='NEW' ? 
          <div className="flex flex-wrap justify-between items-center z-10 w-full">
            < MdFiberNew size={30} className="text-[#ff95cb] bg-white rounded-2xl" /> <IoMdCloseCircle size={25} 
          className="ml-auto text-[#ff95cb] z-10 bg-white rounded-full" 
          onClick={() => deleteItem()}
          />
          </div> 
          
          : 
          
          <IoMdCloseCircle size={25} 
          className="ml-auto text-[#ff95cb] z-10 bg-white rounded-full " 
          onClick={() => deleteItem()}    />}   

        <Image
            src={image}
            alt={"Foto precargada"}
            width={20}
            height={20}
            className="object-cover absolute h-full w-full sm:h-max rounded-2xl "
        />
                      
        <div className="flex flex-wrap w-full justify-between items-center  z-10">
             {index!==0 && <IoIosArrowBack size={25} onClick={()=>setLeft()} className="bg-white rounded-full" />}
            
             {index===0 ? <GoStarFill size={25} className="text-yellow-300 bg-white rounded-full mx-auto"/> : <GoStarFill size={25} className="text-gray-400 z-10 bg-white rounded-full" onClick={()=>setMain()}/> }  

             {index!==0 && <IoIosArrowForward size={25} onClick={()=>setRight()} className="bg-white rounded-full"  /> }
        </div>
     </div>
  )


}
